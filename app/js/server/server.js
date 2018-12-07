const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, '..', '..', 'html')));
app.use('/dist', express.static(path.join(__dirname, '..', '..', '..', 'dist')));
app.use('/assets', express.static(path.join(__dirname, '..', '..', '..', 'assets')));

const elemsFilePath = path.join(__dirname, '..', '..', 'json',  'elems.json');

app.get('/api/elems', function (req, res) {
    fs.readFile(elemsFilePath, 'utf8', function(err, text) {
        if (err) {
            res.status(500).send(err)
        }
        res.send(text);
    });
});

app.post('/api/elems', function (req, res) {
    const data = req.body.data === undefined ? '{}' : req.body.data;
    fs.writeFile(elemsFilePath, data, (err) => {
        if (err) res.status(500).send(err);

        res.status(204).send();
    });
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
