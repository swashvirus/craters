import * as Maths from './maths/common.js'

// Game
class Game {
    constructor() {
        this.entities = []
        this.state = {
            size: new Maths.Vector(1024, 512),
            gravity: new Maths.Vector(0, 0),
            friction: new Maths.Vector(0, 0)
        }
    }

    addObject(obj) {
        // used for adding entities
        return this.entities.push(obj)
    }

    removeObject(index) {
        // used to remove entities
        return this.entities.splice(index, 1)
    }

    update(elapsed, fps) {
        // Loop through all bodies and update one at a time
        this.entities.forEach((body) => {
            body.state.loop = this.state.loop;

            switch (body.type) {
                case 'dynamic':
                    // gravity applies here
                    body.state.vel.x += body.state.accel.x + (body.state.gravity.x + this.state.gravity.x)
                    body.state.vel.y += body.state.accel.y + (body.state.gravity.y + this.state.gravity.y)
                    body.state.pos.x += (body.state.vel.x * (1 / ((body.state.loop.delta + body.state.loop.nframe) / 2)))
                    body.state.pos.y += (body.state.vel.y * (1 / ((body.state.loop.delta + body.state.loop.nframe) / 2)))

                    var fx = body.state.friction.x
                    var nx = body.state.vel.x + fx
                    var x = body.state.vel.x - fx
                    var fy = body.state.friction.y
                    var ny = body.state.vel.y + fy
                    var y = body.state.vel.y - fy

                    body.state.vel.x = (
                        (nx < 0) ? nx :
                        (x > 0) ? x : 0
                    )

                    body.state.vel.y = (
                        (ny < 0) ? ny :
                        (y > 0) ? y : 0
                    )
                    break;

                case 'static':
                    // there's no force of gravity applied onto static bodies
                    body.state.vel.x += body.state.accel.x
                    body.state.vel.y += body.state.accel.y
                    body.state.pos.x += body.state.vel.x
                    body.state.pos.y += body.state.vel.y

                    break
                default:
                    // throw new Error('type not valid')
            }

            body.update()
        })
    }

    render() {
        // Loop through all bodies and update one at a time
        this.entities.forEach((body) => {
            body.render()
        })
    }
}

// Entity
class Entity extends Game {
    constructor() {
        super()
        this.state.size = new Maths.Vector(20, 20)
        this.state.pos = new Maths.Vector(0, 0)
        this.state.vel = new Maths.Vector(0, 0)
        this.state.accel = new Maths.Vector(0, 0)
        this.state.radius = 20
        this.state.angle = 0
        this.type = 'dynamic'
    }
}

// Sprite
class Sprite extends Entity {
    constructor(scope, args) {
        super()

        this.scope = scope
        this.state.pos = args.pos || new Maths.Vector(0, 0)
        this.state.crop = new Maths.Vector(0, 0)
        this.state.size = args.size || new Maths.Vector(0, 0)

        this.state.frames = args.frames || []
        this.state.angle = args.angle || 0
        this.state.image = args.image || new Image()
        this.state.delay = args.delay || 5
        this.state.tick = args.tick || 0
        this.state.orientation = args.orientation || 'horizontal'
    }

    update() {
        super.update()

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

    render() {
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

export {
    Entity,
    Game,
    Sprite
}