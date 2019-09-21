class loader {
  constructor () {
    this.rescache = {}
  }

  load (res, cbk) {
    var that = this
    if (res instanceof Array) {
      res.forEach(function (url) {
        that.rescache[url] = false
        that.fetch(url, cbk)
      })
    } else {
      that.rescache[url] = false
      that.fetch(res, cbk)
    }
  }

  fetch (url, cbk) {
    var that = this
    if (that.rescache[url]) {
      return that.rescache[url]
    } else {
      var img = new Image()
      img.onload = function () {
        that.rescache[url] = img
        that.ready(cbk)
      }

      img.src = url
    }
  }

  ready (cbk) {
    var that = this
    if (typeof cbk === 'function') {
      var ready = true
      for (var item in that.rescache) {
        if (that.rescache.hasOwnProperty(item) && !that.rescache[item]) {
          ready = false
        }
      }

      if (ready) cbk()
    }
  }
}

export { loader }
