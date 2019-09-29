import { Game, Entity, Sprite, Loader } from './../../app/craters/craters.js'

'use strict'
class Buggame extends Game {
  constructor () {
    super.constructor('#container', window.innerWidth, window.innerHeight, 60, false)

    this.score = '0000'
    this.state.color = 'rgba(255,255,255,1)'
    this.state.bgcolor = 'rgba(0,0,0,0.001)'
    this.state.font = '1.5em Arial'

    for (var i = 0; i < 5; i++) {
      this.entities.push(new boltbug(this, { pos: { x: (Math.random() * this.state.width), y: (Math.random() * this.state.height) } }))
    }

    this.entities.push(new ladybug(this, 'f18'))
  }

  render () {
    super.render(this)
    this.context.fillText('score: ' + this.score, (16), (50))
  }
}

class ladybug extends Entity {
  constructor (scope, name) {
    super()

    this.state.size = { x: 196, y: 218 }
    this.state.pos = { x: (scope.state.width / 2) - (this.state.size.x / 2), y: (scope.state.height - this.state.size.y) }

    scope.entities.push(new Sprite(scope, { pos: this.state.pos, size: this.state.size, frames: [0, 1, 2], image: media.fetch('./src/media/bug.png') }))
  }
}

class boltbug extends Entity {
  constructor (scope, args) {
    super()

    this.state.pos = args.pos
    this.state.angle = (Math.random() * 360)

    scope.entities.push(new Sprite(scope, { size: { x: 214, y: 282 }, pos: this.state.pos, frames: [0, 1, 2], image: media.fetch('./src/media/bolt.png'), angle: this.state.angle }))
  }
}

// what this does is , it loads all resources
// and later , it starts the game if all files were loaded

var media = new Loader()
media.load([
  './src/media/bug.png',
  './src/media/bolt.png'
], function () { window.game = new Buggame() })