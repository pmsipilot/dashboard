const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use('/', express.static(path.join(__dirname, '..', '..', 'html')));
app.use('/dist', express.static(path.join(__dirname, '..', '..', '..', 'dist')));
app.use('/assets', express.static(path.join(__dirname, '..', '..', '..', 'assets')));

app.get('/api/elems/get', function (req, res) {
    fs.readFile(path.join(__dirname, '..', '..', 'json',  'elems.json'), 'utf8', function(err, text) {
        if (err) {
            res.send(err)
        }
        res.send(text);
    });
});

app.post('/api/elems/set', function (req, res) {
    res.send('ok');
});

const server = app.listen(3000, function () {
    console.log('Easerboard app listening on port 3000!');
});

process.on('SIGINT', () => {
    process.exit(255);
});

process.on('SIGTERM', () => {
    server.close(() => {
        process.exit(0);
    })
});