import 'dotenv/config';
import { createServer, IncomingMessage, ServerResponse } from 'http';
import { router } from './router';

function start(): void {
  const httpServer = createServer(handleRequest);
  const port = process.env.PORT || '4000';
  httpServer.listen(port, () => console.info('Server is started on port', port));
}

async function handleRequest(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const { method, url } = req;
  const body = await parseBody(req);
  const { statusCode, message } = router.handle({ method, url, body });

  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
  });

  res.end(message);
}

function parseBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let chunks = [];
    req
      .on('error', (err) => {
        reject(err);
      })
      .on('data', (chunk) => {
        chunks.push(chunk);
      })
      .on('end', () => {
        resolve(Buffer.concat(chunks).toString());
      });
  });
}

start();
