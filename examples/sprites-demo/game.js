'use strict'
import {
    Game,
    Loop,
    Canvas,
    Entity,
    Sprite,
    Loader
} from 'craters.js'

class mygame extends Game {
    constructor(container, width, height) {
        super()

        this.score = '0000'
        this.state.size = {
            x: width,
            y: height
        }
        this.viewport = new Canvas(this.state.size.x, this.state.size.y, container)
        this.context = this.viewport.getContext('2d')
        this.context.font = '2em Arial'
        this.context.fillStyle = '#fff'
        this.loop = new Loop(this, 60)

        for (var i = 0; i < 15; i++) {
            this.entities.push(new boltbug(this, {
                pos: {
                    x: (Math.random() * this.state.size.x),
                    y: (Math.random() * this.state.size.y)
                }
            }))
        }

        this.entities.push(new ladybug(this))
    }

    render() {
        this.viewport.clear()
        super.render()
        this.context.fillText('score: ' + this.score, (16), (50))
    }
}

class ladybug extends Sprite {
    constructor(scope) {
        super(scope, {
            frames: [0, 1, 2]
        })
        this.scope = scope
        this.state.image = media.fetch('./media/bug.png')
        this.state.size = {
            x: 196,
            y: 218
        }
        this.state.pos = {
            x: (scope.state.size.x / 2) - (this.state.size.x / 2),
            y: (scope.state.size.y - this.state.size.y)
        }

        this.state.angle = (Math.random() * 360)
    }
}

class boltbug extends Sprite {
    constructor(scope, args) {
        super(scope, {
            frames: [0, 1, 2]
        })
        this.scope = scope
        this.state.image = media.fetch('./media/bolt.png')
        this.state.size = {
            x: 214,
            y: 282
        }
        this.state.pos = args.pos
        this.state.angle = (Math.random() * 360)
    }
}

// what this does is , it loads all resources
// and later , it starts the game if all files were loaded

var media = new Loader()
media.load([
    './media/bug.png',
    './media/bolt.png'
], function() {
    window.game = new mygame('#container', window.innerWidth, window.innerHeight, 60, true)
})