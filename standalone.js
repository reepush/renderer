var express  = require('express'),
    fs       = require('fs'),
    http     = require('http'),
    renderer = require('./lib/renderer')
    app      = express()

var data = JSON.parse(fs.readFileSync('data.json', 'utf-8'))

app.get('/', function(req, res) {
  res.send(renderer.render('templates/' + req.query.file, data))
})

app.listen(3001, function() {
  console.log('Standalone is listening on 3001 port...')
})
