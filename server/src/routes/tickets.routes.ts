import { Router } from 'express';
import { getAllTicketSummaries, getTicketById } from '../services/tickets.service';

const router = Router();

// GET /api/tickets
router.get('/', async (_req, res, next) => {
  try {
    res.json(await getAllTicketSummaries());
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

    const ticket = await getTicketById(id);
    if (!ticket) {
      return res.status(404).json({error: 'Ticket not found'});
    }

    res.json(ticket);
  } catch (err) {
    next(err);
  }
});

export default router;
