import {
    Game,
    Loop,
    Canvas
} from '../../index.js'
import * as Box2D from 'box2d'
// game 
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

        var gravity = new Box2D.Common.Math.b2Vec2(0, this.state.gravity.y * Box2D.SCALE);
        this.world = new Box2D.Dynamics.b2World(gravity, true);
    }

    update(elapsed, fps) {
        this.world.Step();
        this.world.ClearForces();
    }

    render() {
        super.render()
        this.viewport.clear()

        this.context.fillStyle = "#fff";
        this.context.font = '2em Arial'
        this.context.fillText('Box2D.️', 65, (this.state.size.y / 2), (this.state.size.x))
    }
}
// body
class marble extends Entity {
    constructor(scope) {
        super();

        var bodyDef = new Box2D.Dynamics.b2BodyDef();
        bodyDef.position = new Box2D.Common.Math.b2Vec2(
            (this.state.pos.x + this.state.size.x / 2) * Box2D.SCALE,
            (this.state.pos.y + this.state.size.y / 2) * Box2D.SCALE
        );
        bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
        this.body = scope.world.CreateBody(bodyDef);

        var fixture = new Box2D.Dynamics.b2FixtureDef;
        fixture.shape = new Box2D.Collision.Shapes.b2PolygonShape();
        fixture.shape.SetAsBox(
            this.state.size.x / 2 * Box2D.SCALE,
            this.state.size.y / 2 * Box2D.SCALE
        );

        fixture.density = 1.0;
        fixture.friction = 100.5;
        // fixture.restitution = 0.3;

        this.body.CreateFixture(fixture);
    }

    update() {
        var p = this.body.GetPosition();
        this.state.pos = {
            x: (p.x / Box2D.SCALE - this.state.size.x / 2),
            y: (p.y / Box2D.SCALE - this.state.size.y / 2)
        };

        this.state.angle = this.body.GetAngle().round(2);
    }
}

let game = new mygame('#container', 1024, 512)