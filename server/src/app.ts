import express from 'express';
import ticketsRouter from './routes/tickets.routes';

const app = express();

app.disable('x-powered-by');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// minor availability endpoint
app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/api/tickets', ticketsRouter);

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

export default app;
