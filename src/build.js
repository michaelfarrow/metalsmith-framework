var Metalsmith = require('metalsmith')
var markdown = require('metalsmith-markdown')
var layouts = require('metalsmith-layouts')
var permalinks = require('metalsmith-permalinks')
var get = require('lodash.get')

var env = process.env.NODE_ENV || 'development'

var ms = Metalsmith(__dirname)
  .metadata({
    title: 'My Static Site & Blog',
    description: "It's about saying »Hello« to the World.",
    generator: 'Metalsmith',
    url: 'http://www.metalsmith.io/',
    env: env,
    isProduction: env === 'production',
    isDevelopment: env !== 'production',
    h: function () {
      var helpers = require('./lib/helpers')
      var args = [].slice.call(arguments)
      if (!args.length) return helpers
      var helper = get(helpers, args.shift())
      if (typeof helper === 'function' && args.length)
        return helper.apply(null, args)
      return helper
    }
  })
  .source('../content')
  .destination('./built')
  .clean(true)
  .use(markdown())
  .use(permalinks())
  .use(layouts({
    engine: 'pug',
    directory: 'templates/views'
  }))

if (env !== 'production') {
  var watch = require('metalsmith-watch')
  ms.use(
    watch({
      paths: {
        '../content/**/*': true,
        'templates/**/*': '**/*.md',
        'lib/**/*': '**/*.md'
      },
      livereload: true
    })
  )
}

ms.build(function (err, files) {
  if (err) { throw err; }
})
