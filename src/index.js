var express = require('express')
var morgan = require('morgan')

morgan.token('remote-addr', function (req, res) {
  return req.headers['x-forwarded-for'] || req.ip
})

var app = express()
var development = process.env.NODE_ENV === 'development'

app.use(morgan(development ? 'dev' : ':remote-addr [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms', {
  skip: function (req, res) {
    return res.statusCode < 400 && !!req.url.match(/^\/bundle\//)
  }
}))
app.use(express.static('built'))

app.listen(process.env.PORT || 80)
