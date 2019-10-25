import {
    Game,
    Loop,
    Canvas,
    Entity,
    Maths
} from '../../index.js'

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

        Box2D.SCALE = 1;
        this.state.gravity.y = 80;
        var gravity = new Box2D.Common.Math.b2Vec2(0, this.state.gravity.y);
        this.world = new Box2D.Dynamics.b2World(gravity, true);

        // ground
        var bodyDef = new Box2D.Dynamics.b2BodyDef();
        bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
		
		// fixture
        var fixDef = new Box2D.Dynamics.b2FixtureDef;
        fixDef.density = 1.0;
        fixDef.friction = 0.5;
        fixDef.restitution = 0.2;
		
		// shape
        fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
        fixDef.shape.SetAsBox(this.state.size.x, 10);
        bodyDef.position = new Box2D.Common.Math.b2Vec2(0, this.state.size.y);
        
        // add ground
        this.world.CreateBody(bodyDef).CreateFixture(fixDef);
		
        // add marbles
        for (var i = 0; i < 25; i++) {
            let id = this.addObject(new marble(this)) - 1
            this.entities[id].id = id;
        }
    }

    update(elapsed, fps) {
        this.world.Step(1 / fps, 10, 10);
        this.world.ClearForces();

        super.update()
    }

    render() {
        this.viewport.clear()
        super.render()
    }
}

// body
class marble extends Entity {
    constructor(scope) {
        super();
        this.scope = scope
        this.state.pos = new Maths.Vector((this.scope.state.size.x / 2) + ((Math.random() - 0.5) * 50), (this.scope.state.size.x / 2) + ((Math.random() - 0.5) * 50))

        this.type = "static";
        var bodyDef = new Box2D.Dynamics.b2BodyDef();

        bodyDef.position = new Box2D.Common.Math.b2Vec2(
            (this.state.pos.x + this.state.size.x / 2) * Box2D.SCALE,
            (this.state.pos.y + this.state.size.y / 2) * Box2D.SCALE
        );

        bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
        this.body = this.scope.world.CreateBody(bodyDef);

        var fixture = new Box2D.Dynamics.b2FixtureDef;
        fixture.shape = new Box2D.Collision.Shapes.b2CircleShape(
            this.state.radius
        );

        fixture.density = 1.0;
        fixture.friction = 10.5;
        fixture.restitution = 0.3;

        this.body.CreateFixture(fixture);
        this.body.ApplyImpulse(new Box2D.Common.Math.b2Vec2(((Math.random() - 0.5) * 100), ((Math.random() - 0.7) * 100)), this.body.GetPosition());
    }

    render() {
        this.state.pos = this.body.GetPosition();
        this.scope.context.beginPath();
        this.scope.context.arc((this.state.pos.x), (this.state.pos.y), (this.state.radius), 0, Math.PI * 2);
        this.scope.context.lineWidth = 1;

        this.scope.context.strokeStyle = '#000';
        this.scope.context.fillStyle = 'green';

        this.scope.context.fill();
        this.scope.context.stroke();
    }
}

let game = new mygame('#container', 1024, 512)