import {
    Game,
    Loop,
    Canvas,
    Entity,
    Maths
} from '../../index.js'
import * as SAT from 'sat-js'

// Game
class mygame extends Game {
    constructor(container, width, height) {
        super();

        this.state.size = {
            x: width,
            y: height
        }

        this.loop = new Loop(this, 60)
        this.viewport = new Canvas(this.state.size.x, this.state.size.y, container);
        this.context = this.viewport.context;
        this.viewport.style.background = "#eee";
        this.viewport.resize(this, {
            x: window.innerWidth,
            y: window.innerHeight
        })

        // add some marbles
        for (var i = 0; i < 25; i++) {
            let id = this.addObject(new marble(this)) - 1
            this.entities[id].id = id;
        }
    }

    render() {
        this.viewport.clear()
        super.render()
    }
}

// Marble
class marble extends Entity {
    constructor(scope) {
        super()

        this.scope = scope;
        this.type = 'dynamic';

        this.shape = new SAT.Circle(new SAT.Vector((this.scope.state.size.x / 2), (this.scope.state.size.x / 2)), (Math.random() * 50) + 10);
        this.state.pos = this.shape.pos

        this.state.gravity.y = 1;
        this.state.friction = {
            x: 0.0125,
            y: 0.0125
        }

        this.state.vel.x = ((Math.random() - 0.5));
        this.state.vel.y = ((Math.random() - 0.5));
    }

    update() {
        super.update();

        // X-axis collision
        if ((this.state.pos.x + this.shape.r > this.scope.state.size.x) || (this.state.pos.x < 0)) {
            this.state.vel.x *= 0
        }
        // Y-axis collision
        if ((this.state.pos.y + this.shape.r > this.scope.state.size.y) || (this.state.pos.y < 0)) {
            this.state.vel.y *= 0
        }

        for (var i = 0; i < this.scope.entities.length; i++) {
            if (this.scope.entities[i].id == this.id) continue;
            var response = new SAT.Response();
            var collided = SAT.testCircleCircle(this.shape, this.scope.entities[i].shape, response);
            if (collided) {

                response.overlapV.scale(0.5);
                this.state.pos.sub(response.overlapV);
                this.scope.entities[i].state.pos.add(response.overlapV);

                this.state.vel.subtract(response.overlapN)
                this.scope.entities[i].state.vel.add(response.overlapN)
            }
        }

        this.state.pos.y = Maths.boundary((this.state.pos.y), (this.shape.r), (this.scope.state.size.y - (this.shape.r)))
    }

    render() {

        this.scope.context.beginPath();
        this.scope.context.arc((this.state.pos.x), (this.state.pos.y), (this.shape.r), 0, Math.PI * 2);
        this.scope.context.lineWidth = 1;

        this.scope.context.strokeStyle = '#000';
        this.scope.context.fillStyle = 'green';

        this.scope.context.fill();
        this.scope.context.stroke();
    }
}

let game = new mygame('#container', 1024, 512)