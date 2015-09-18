var express = require('express'),
    fs      = require('fs'),
    http    = require('http'),
    app     = express()

var config = {
  renderer: {
    host: 'localhost',
    port: 3333
  }
}

var data = JSON.parse(fs.readFileSync('data.json', 'utf-8'))

app.get('/', function(req, res) {
  config.renderer.path = '/?' + encodeURIComponent(
    'data=' + JSON.stringify(data) +
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
