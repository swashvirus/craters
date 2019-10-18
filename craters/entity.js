class Game {
    constructor(container, width, height, fps, debug) {
        this.entities = []
        this.state = {
            container: container,
            size: {
                x: 10,
                y: 10
            }
        }
    }

    addObject(obj) {
        // used for adding entities
        this.entities.push(obj)
    }

    removeObject(index) {
        // used to remove entities
        this.entities.splice(index, 1)
    }

    update() {
        // Loop through all bodies and update one at a time
        this.entities.forEach(function(body) {
            body.update()
            switch (body.type) {
                case 'dynamic':
                case 'kinematic':
                case 'default':

                    body.state.vel.x += body.state.accel.x
                    body.state.vel.y += body.state.accel.y
                    body.state.pos.x += body.state.vel.x
                    body.state.pos.y += body.state.vel.y

                    break
                default:
                    // throw new Error('type not valid')
            }
        })
    }

    render() {
        // Loop through all bodies and update one at a time
        this.entities.forEach(function(body) {
            body.render()
        })
    }

    clearContext(context, size) {
        context.clearRect(0, 0, size.x, size.y)
    }
}

class Entity extends Game {
    constructor() {
        super()
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
        this.type = 'kinematic'
    }
}

class Sprite extends Entity {
    constructor(scope, args) {
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