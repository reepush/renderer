'use strict';

/**
 * Dependencies
 */
var express = require('express');
var http    = require('http');
var app     = express();
var data    = require('./data.json');


// Application setups
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/templates');
app.set('renderer', { host: 'localhost', port: 3333 });


/**
 * Define custom template engine for renderer daemon.
 */
app.engine('jade', function(file, data, cb) {
  var q = {};
  q.host = app.get('renderer').host;
  q.port = app.get('renderer').port;
  q.path = '/?' + encodeURIComponent(
    'data=' + JSON.stringify(data) +
    '&file=' + file
  );
  http.request(q, function(res) {
    var data = ''
    res
      .on('data', function(chunk) { data += chunk; })
      .on('end', function() { cb(null, data); })
    ;
  }).end()
});


app.get('/', function(req, res) {
  res.render('template.jade', data);
});

app.listen(app.get('port'), function() {
  console.log('Server is listening on ' + app.get('port') + ' port...');
})

