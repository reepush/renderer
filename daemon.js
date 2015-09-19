var http     = require('http'),
    url      = require('url')
    renderer = require('./lib/renderer'),
    fs       = require('fs')

var data = JSON.parse(fs.readFileSync('data.json', 'utf-8'))

http.createServer(function(req, res) {
    req.url = decodeURIComponent(req.url)
    var query = url.parse(req.url, true).query

    try {
        query.data = JSON.parse(query.data)
    } catch(error) {
        query.data = data
    }

    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end(renderer.render(query.file, query.data))
}).listen(3333, function() {
    console.log('Daemon is listening on 3333 port...')
})
