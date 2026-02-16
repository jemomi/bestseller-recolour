import * as fs from 'node:fs/promises';
import path from 'node:path';
import { dirExists, isImage } from '../utils/fs';
import {MOCK_DATA} from '../config/paths';

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

async function listTicketFolders(): Promise<string[]> {
  if (!(await dirExists(MOCK_DATA))) return [];
  const dirEntries = await fs.readdir(MOCK_DATA, { withFileTypes: true });

  return dirEntries
    .filter(d => d.isDirectory())
    .map(d => d.name);
}

export async function getAllTicketSummaries(): Promise<TicketSummary[]> {
  const folders = await listTicketFolders();
  const details = await Promise.all(folders.map(buildTicket));
  return details.map(({ id, name, status }) => ({ id, name, status }));
}

export async function getTicketById(id: number): Promise<TicketDetail | null> {
  const folderName = `Ticket ${id}`;
  const folderPath = path.join(MOCK_DATA, folderName);

  if (!(await dirExists(folderPath))) return null;
  return buildTicket(folderName);
}

async function buildTicket(folderName: string): Promise<TicketDetail> {
  const id = Number(folderName.replace(/^Ticket\s+/i, ''));
  const folderPath = path.join(MOCK_DATA, folderName);

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
