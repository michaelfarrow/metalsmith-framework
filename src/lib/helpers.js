var moment = require('moment')

module.exports = {
  date: {
    format: function (dateStr, format) {
      format = format || 'MMMM Do YYYY, h:mm:ssa'
      var m = moment(dateStr)
      return m.format(format)
    }
  },
  bundle: function (path) {
    var manifest = process.env.NODE_ENV === 'production'
      ? require('../public/bundle/manifest.json')
      : null
    path = '/bundle/' + path
    return manifest && manifest[path] ? manifest[path] : path
  }
}
