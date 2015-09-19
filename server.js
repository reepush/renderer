var express = require('express'),
    fs      = require('fs'),
    http    = require('http'),
    app     = express(),
    data    = require('./data.json')

var config = {
  renderer: {
    host: 'localhost',
    port: 3333
  }
}

app.get('/', function(req, res) {
  config.renderer.path = '/?' + encodeuricomponent(
    'data=' + json.stringify(data) +
    '&file=' + req.query.file
  )

  http.request(config.renderer, function(response) {
    var data = ''

    response.on('data', function(chunk) {
      data += chunk
    })

    response.on('end', function() {
      res.send(data)
    })
  }).end()
})

app.listen(3000, function() {
  console.log('Server is listening on 3000 port...')
})
