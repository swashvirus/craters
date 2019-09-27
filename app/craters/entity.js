class Game {
  constructor (container, width, height, fps, debug) {
    this.entities = []
    this.state = {
      container: container,
      size: {
	      x: 10,
	      y: 10
      },
      
      bgcolor: 'rgba(0,0,0,0)',
      color: '#ff0',
      font: '1em Arial'
    }
  }

  update () {
    for (var entity = 0; entity < this.entities.length; entity++) {
      // Fire off each active entities `render` method
      this.entities[entity].update()
    }
  }
  
  render () {
	for (var entity = 0; entity < this.entities.length; entity++) {
    // Fire off each active entities `render` method
    this.entities[entity].render() }
  }
  
  clearContext (context, size) {
	  context.clearRect(0, 0, size.x, size.y)
  }
}

class Entity extends Game {
  constructor () {
    super();
    this.state = {
      size: {
        x: 10,
        y: 10
      },
      pos: {
        x: 0,
        y: 0
      },
      vel: {
        x: 0,
        y: 0
      },
      accel: {
        x: 0,
        y: 0
      },
      radius: 10,
      angle: 0
    }
  }

  update () {
    super.update ();
    
    this.state.vel.x += this.state.accel.x
    this.state.vel.y += this.state.accel.y
    this.state.pos.x += this.state.vel.x
    this.state.pos.y += this.state.vel.y
  }
}

class Sprite extends Entity {
  constructor (scope, args) {
    super()

    this.scope = scope
    this.state.pos = args.pos || {
        x: 0,
        y: 0
      }
      this.state.crop = {
        x: 0,
        y: 0
      }
      this.state.size = args.size || {
        x: 0,
        y: 0
      }
      
      this.state.frames = args.frames || []
      this.state.angle = args.angle || 0
      this.state.image = args.image || new Image()
      this.state.delay = args.delay || 5
      this.state.tick = args.tick || 0
      this.state.orientation = args.orientation || 'horizontal'
    }

  update () {
  super.update ();
  
    if (this.state.tick <= 0) {
      if (this.orientation === 'vertical') {
        this.state.crop.y = this.state.frames.shift()
        this.state.frames.push(this.state.crop.y)
      } else {
        this.state.crop.x = this.state.frames.shift()
        this.state.frames.push(this.state.crop.x)
      }

      this.state.tick = this.state.delay
    }

    this.state.tick--
  }

  render () {
    super.render()

    this.scope.context.save()
    this.scope.context.translate(this.state.crop.x + (this.state.size.x / 2), this.state.crop.y + (this.state.size.y / 2))
    this.scope.context.rotate((this.state.angle) * (Math.PI / 180))
    this.scope.context.translate(-(this.state.crop.x + (this.state.size.x / 2)), -(this.state.crop.y + (this.state.size.y / 2)))

    this.scope.context.drawImage(this.state.image,
      (this.state.crop.x * this.state.size.x), (this.state.crop.y * this.state.size.y), this.state.size.x, this.state.size.y,
      this.state.pos.x, this.state.pos.y, this.state.size.x, this.state.size.y)

    this.scope.context.restore()
  }
}

export { Entity, Game, Sprite }