var lorem = require('lorem-ipsum'),
    _     = require('lodash'),
    data  = {}

var counts = {
  navigation: 200,
  menu: 200,
  text: 500
}

data.navigationItems = _.times(counts.navigation, function() {
  return 'nav' + _.random(counts.navigation)
})

data.menuItems = _.times(counts.menu, function() {
  return 'menu' + _.random(counts.menu)
})

data.textItems = _.times(counts.text, function() {
  return lorem({
    count: _.random(10, 20),
    units: 'words'
  })
})

console.log(JSON.stringify(data, null, 2))
