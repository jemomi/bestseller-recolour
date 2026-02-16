import http from 'node:http';
import { debuglog } from 'node:util';
import app from './app';

const debug = debuglog('server');

const port = normalizePort(process.env.PORT ?? '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val: string) {
  const p = parseInt(val, 10);
  if (Number.isNaN(p)) return val; // named pipe
  if (p >= 0) return p;
  return 3000;
}

function onError(error: NodeJS.ErrnoException) {
  if (error.syscall !== 'listen') throw error;

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
}

function onListening() {
  debug('Listening on port %d', port);
}
