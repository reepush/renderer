'use strict';

/**
 * Dependencies
 */
var express = require('express');
var app = express();
var data = require('./data.json');


// Application setups
app.set('port', process.env.PORT || 3003);
app.set('views', __dirname + '/templates');
app.set('view engine', 'jade');


app.get('/', function(req, res) {
  res.render('template.jade', data);
})

app.listen(app.get('port'), function() {
  console.log('Server is listening on 3003 port…');
});
