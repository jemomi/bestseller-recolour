import { Router } from 'express';
import * as fs from 'node:fs/promises';
import path from 'node:path';

const router = Router();
const DATA_DIR = path.resolve(process.cwd(), 'mock-data', 'recolour-case');

type TicketStatus = 'Pending' | 'Sent' | 'In Progress' | 'Completed' | 'Rejected';

export type TicketSummary = {
  id: number;
  name: string;
  status: TicketStatus;
};

export type TicketDetail = TicketSummary & {
  files: string[];
  guideline: string | null;
};

async function dirExists(p: string) {
  try {
    const stat = await fs.stat(p);
    return stat.isDirectory();
  } catch {
    return false;
  }
}

function isImage(name: string) {
  return /\.(jpg|jpeg|png)$/i.test(name);
}

async function buildTicket(folderName: string): Promise<TicketDetail> {
  const id = Number(folderName.replace(/^Ticket\s+/i, ''));
  const folderPath = path.join(DATA_DIR, folderName);

  const dirEntries = await fs.readdir(folderPath, { withFileTypes: true });
  const files = dirEntries.filter(d => d.isFile()).map(d => d.name);

  const images = files.filter(isImage);
  const guideline = files.find(f => /\.rtf$/i.test(f)) ?? null;

  return {
    id,
    name: folderName,
    status: 'Pending',
    files: images,
    guideline,
  };
}

async function listTicketFolders(): Promise<string[]> {
  if (!(await dirExists(DATA_DIR))) return [];
  const dirEntries = await fs.readdir(DATA_DIR, { withFileTypes: true });
  return dirEntries
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .filter(name => /^Ticket\s+\d+$/i.test(name))
    .sort((a, b) => Number(a.replace(/\D/g, '')) - Number(b.replace(/\D/g, '')));
}

// GET /api/tickets
router.get('/', async (_req, res, next) => {
  try {
    const folders = await listTicketFolders();
    const details = await Promise.all(folders.map(buildTicket));
    const summaries: TicketSummary[] = details.map(({ id, name, status }) => ({ id, name, status }));
    res.json(summaries);
  } catch (err) {
    next(err);
  }
});

// GET /api/tickets/:id
router.get('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      return res.status(400).json({error: 'Invalid id'});
    }

    const folderName = `Ticket ${id}`;
    const folderPath = path.join(DATA_DIR, folderName);
    if (!(await dirExists(folderPath))) {
      return res.status(404).json({error: 'Ticket not found'});
    }

    res.json(await buildTicket(folderName));
  } catch (err) {
    next(err);
  }
});

export default router;
