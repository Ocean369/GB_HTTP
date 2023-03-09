import { createServer } from 'http';
import path from 'path';
import { readdirSync } from 'fs';

const host = 'localhost';
const port = 8000;
const _dir = 'files';

function requestListener(req, res) {
    res.setHeader(
        'Content-Type',
        'text/html; charset=utf-8;'
    )

    if (req.method === 'GET') {
        if (req.url === '/get') {
            let listFiles = '';
            try {
                const files = readdirSync(path.resolve(_dir), 'utf8');
                res.writeHead(200);
                res.write(files.join());
                res.end();
            } catch (err) {
                res.writeHead(500);
                res.end('Internal server error');
            }
        } else if (req.url === '/redirect') {
            //301 - "Перемещён на постоянной основе".
            res.writeHead(301, { 'Location': '/redirected' });
            res.end('redirecting');
        } else if (req.url === '/redirected') {
            res.end(`Ресурс теперь постоянно доступен по адресу http://${host}:${port}/redirected`);
        }
        else {
            res.writeHead(405);
            res.end('HTTP method not allowed');
        }
    } else if (req.method === 'POST' && req.url === '/post') {
        res.writeHead(200);
        res.end('success!');
    } else if (req.method === 'DELETE' && req.url === '/delete') {
        res.writeHead(200);
        res.end('success!');
    } else {
        res.writeHead(405);
        res.end('HTTP method not allowed');
    }

};

const server = createServer(requestListener);

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});