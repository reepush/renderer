var path     = require('path'),
    fs       = require('fs'),
    jade     = require('jade'),
    mustache = require('mustache')

var renderers = {
    '.jade': {
        renderer: {
            render: function(template, data) {
                data.pretty = true
                return jade.render(template, data)
            }
        }
    },
    '.mustache': {
        renderer: {
            render: function(template, data) {
                return mustache.render(template, data)
            }
        }
    }
}

module.exports.render = function(file, data) {
    var extension = path.extname(file),
        renderer = renderers[extension].renderer,
        template = fs.readFileSync(file, 'utf-8')

    return renderer.render(template, data)
}
