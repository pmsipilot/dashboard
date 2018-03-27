'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var app = (0, _express2['default'])();

app.use('/dist', _express2['default']['static']('./dist'));
app.use('/assets', _express2['default']['static']('./assets'));

app.get('/', function (req, res) {
    _fs2['default'].readFile('./app/html/index.html', 'utf8', function (err, text) {
        if (err) {
            res.send(err);
        }
        res.send(text);
    });
});

app.get('/api/elems/get', function (req, res) {
    _fs2['default'].readFile('./app/json/elems.json', 'utf8', function (err, text) {
        if (err) {
            res.send(err);
        }
        res.send(text);
    });
});

app.get('/api/users/get', function (req, res) {
    _fs2['default'].readFile('./app/json/users.json', 'utf8', function (err, text) {
        if (err) {
            res.send(err);
        }
        res.send(text);
    });
});

app.post('/api/elems/set', function (req, res) {
    res.send('ok');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
//# sourceMappingURL=server.js.map
