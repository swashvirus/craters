class Entity {
  constructor () {
    // Setup the defaults if no parameters are given
    // Type represents the collision detector's handling
    this.type = this.type || 'dynamic'

    // Collision represents the type of collision
    // another object will receive upon colliding
    this.collision = this.collision || 'elastic'
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

    this.entities = [];
  }

  update () {
    // update the sub entities if there's any
    // by firing off the update function one by one
    for (var entity = 0; entity < this.entities.length; entity++) {
      this.entities[entity].update()
    }

    switch (this.type) {
      case 'dynamic':
        this.state.vel.x += this.state.accel.x
        this.state.vel.y += this.state.accel.y
        this.state.pos.x += this.state.vel.x
        this.state.pos.y += this.state.vel.y
        break
      case 'kinematic':
        this.state.vel.x += this.state.accel.x
        this.state.vel.y += this.state.accel.y
        this.state.pos.x += this.state.vel.x
        this.state.pos.y += this.state.vel.y
        break
    }
  }

  render () {
    for (var entity = 0; entity < this.entities.length; entity++) {
      this.entities[entity].render()
    }
  }
}

class Sprite extends Entity {
  constructor (scope, args) {
    super()

    this.scope = scope
    this.state = {
      pos: args.pos || {
        x: 0,
        y: 0
      },
      crop: {
        x: 0,
        y: 0
      },
      size: args.size || {
        x: 0,
        y: 0
      },
      frames: args.frames || [],
      angle: args.angle || 0,
      image: args.image || new Image(),
      delay: args.delay || 5,
      tick: args.tick || 0,
      orientation: args.orientation || 'horizontal'
    }
  }

  update () {
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
    super.render(this)

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

export { Entity, Sprite }