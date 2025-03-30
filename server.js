// const http = require('http');
const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
    let filePath = '';
    let contentType = 'text/html; charset=utf-8';

    if (req.url === '/' || req.url === '/index') {
        filePath = path.join(__dirname, 'index.html');
    } else if (req.url === '/compensacion_motores') {
        filePath = path.join(__dirname, 'compensacion_motores.html');
    } else if (req.url === '/compensacion_general') {
        filePath = path.join(__dirname, 'compensacion_general.html');
    } else if (req.url === '/motores_trifasicos') {
        filePath = path.join(__dirname, 'motores_trifasicos.html');
    } else if (req.url === '/style.css') {
        filePath = path.join(__dirname, '/public/style.css');
        contentType = 'text/css; charset=utf-8'
    } else {
        filePath = path.join(__dirname, '404.html');
        res.writeHead(404, { 'Content-Type': contentType });
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Internal Server Error');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
};

// const PORT = 3000;
// server.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}/`);
// });
