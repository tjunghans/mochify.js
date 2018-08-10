'use strict';

var fs = require('fs');
var path = require('path');
var https = require('https');

module.exports = function (port, callback) {
  if (!Number.isInteger(port)) {
    process.nextTick(function () {
      callback(null, null, null);
    });
    return;
  }
  var server = https.createServer({
    key: fs.readFileSync(path.join(__dirname, '..', 'fixture', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '..', 'fixture', 'cert.pem')),
  }, function (req, res) {
    if (req.url === '/') {
      res.writeHead(200);
      res.end('<!DOCTYPE html>\n<html><body></body></html>');
    } else {
      var file = req.url.substring(1);
      fs.stat(file, function (err) {
        if (err) {
          res.writeHead(404);
          res.end();
          return;
        }
        res.writeHead(200);
        fs.createReadStream(file).pipe(res);
      });
    }
  });
  server.on('error', function (err) {
    callback(err, server, null);
  });
  server.listen(port, function (err) {
    callback(err, server, server.address().port);
  });
};
