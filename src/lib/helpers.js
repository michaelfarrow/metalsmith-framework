var moment = require('moment')

module.exports = {
  date: {
    format: function (dateStr, format) {
      format = format || 'MMMM Do YYYY, h:mm:ssa'
      var m = moment(dateStr)
      return m.format(format)
    }
  }
}
