// modified soundbox.js lib
class Sound {
  constructor () {
    this.sounds = {} // The loaded sounds and their instances
    this.instances = [] // Sounds that are currently playing
    this.defaultVolume = 1
  };

  load (name, path, callback) {
    this.sounds[name] = new Audio(path)
    if (typeof callback === 'function') {
      this.sounds[name].addEventListener('canplaythrough', callback)
    } else {
      return new Promise((resolve, reject) => {
        this.sounds[name].addEventListener('canplaythrough', resolve)
        this.sounds[name].addEventListener('error', reject)
      })
    }
  };

  remove (name) {
    if (typeof this.sounds !== 'undefined') {
      delete this.sounds[name]
    }
  };

  unlock (name, callback, volume, loop) {
    var that = this
    var events = ['touchstart', 'touchend', 'mousedown', 'keydown']
    var unlock = function unlock () {
      events.forEach(function (event) {
        document.body.removeEventListener(event, unlock)
      })
      that.play(name, callback, volume, loop)
    }

    events.forEach(function (event) {
      document.body.addEventListener(event, unlock, false)
    })
  };

  play (name, callback, volume, loop) {
    loop = loop || false

    if (typeof this.sounds[name] === 'undefined') {
      console.error("Can't find sound called '" + name + "'.")
      return false
    };

    var soundInstance = this.sounds[name].cloneNode(true)
    soundInstance.volume = typeof volume === 'number' ? volume : this.defaultVolume
    soundInstance.loop = loop
    soundInstance.play()
    this.instances.push(soundInstance)

    // Don't forget to remove the instance from the instances array
    soundInstance.addEventListener('ended', () => {
      var index = this.instances.indexOf(soundInstance)
      if (index !== -1) this.instances.splice(index, 1)
    })

    // Attach the callback / promise
    if (typeof callback === 'function') {
      soundInstance.addEventListener('ended', callback)
      return true
    };

    return new Promise((resolve, reject) => soundInstance.addEventListener('ended', resolve))
  };

  stopAll () {
    // Pause all currently playing sounds

    // Shallow clone the array to avoid issues with instances auto-removing themselves
    var instancesToStop = this.instances.slice()
    for (var instance of instancesToStop) {
      instance.pause()
      instance.dispatchEvent(new Event('ended'))
    }
  }
};

export { Sound }
