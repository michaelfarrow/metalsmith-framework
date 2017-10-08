module.exports = plugin

function plugin (options) {
  return function (files, metalsmith, done) {
    var metadata = metalsmith.metadata()
    metadata.bundle = function (path) {
      var manifest = process.env.NODE_ENV === 'production'
        ? require('../public/bundle/manifest.json')
        : null
      path = '/bundle/' + path
      return manifest && manifest[path] ? manifest[path] : path
    }
    return process.nextTick(done)
  }
}
