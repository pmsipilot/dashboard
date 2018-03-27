import express from 'express';
import fs from 'fs';

const app = express();

app.use('/dist', express.static('./dist'));
app.use('/assets', express.static('./assets'));

app.get('/', function (req, res) {
    fs.readFile('./app/html/index.html', 'utf8', function(err, text) {
        if (err) {
            res.send(err)
        }
        res.send(text);
    });
});

app.get('/api/elems/get', function (req, res) {
    fs.readFile('./app/json/elems.json', 'utf8', function(err, text) {
        if (err) {
            res.send(err)
        }
        res.send(text);
    });
});

app.get('/api/users/get', function (req, res) {
    fs.readFile('./app/json/users.json', 'utf8', function(err, text) {
        if (err) {
            res.send(err)
        }
        res.send(text);
    });
});

app.post('/api/elems/set', function (req, res) {
    res.send('ok');
});

app.listen(3000, function () {
    console.log('Easerboard app listening on port 3000!');
});
