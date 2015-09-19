'use strict';

/**
 * Dependencies
 */
var path     = require('path');
var fs       = require('fs');
var jade     = require('jade');
var mustache = require('mustache');

var renderers = {
    '.jade': {
        renderer: {
            render: function(template, data) {
                data.pretty = true
                // FIXME jade.renderFile
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

// FIXME: ASYNC.
module.exports.render = function(file, data) {
    var extension = path.extname(file);
    var renderer = renderers[extension].renderer;
    var template = fs.readFileSync(file, 'utf-8');
    console.log(file);
    return renderer.render(template, data)
}
