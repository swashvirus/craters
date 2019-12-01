// experimental
// workinprogress++
import Box2D from './Box2d.js'
import {Game, Entity, Fixtures, Vector} from '../../craters/craters'

const b2Vec2 = Box2D.Common.Math.b2Vec2,
    b2BodyDef = Box2D.Dynamics.b2BodyDef,
    b2Body = Box2D.Dynamics.b2Body,
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
    b2Fixture = Box2D.Dynamics.b2Fixture,
    b2World = Box2D.Dynamics.b2World,
    b2MassData = Box2D.Collision.Shapes.b2MassData,
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
    b2DebugDraw = Box2D.Dynamics.b2DebugDraw;


class Box2dGame extends Game {
    constructor(params) {
        super(params);
        let gravity = new b2Vec2(
            this.state.gravity.x,
            this.state.gravity.y
        );
        // create box2d world
        this.world = new b2World(gravity);
    }
    // Todo figure out fixture
    addObject(obj) {
        this.world.CreateBody(obj.body)

        super.addObject(obj)
    }

    update(elapsed, fps) {
        this.world.Step((1 / fps), 10, 10);
        this.world.ClearForces();
        super.update ()
    }
}

class Box2dEntity extends Entity {
    constructor(params) {
        super(params);
        var bodyDef = new Box2D.Dynamics.b2BodyDef();
        bodyDef.position = new Box2D.Common.Math.b2Vec2(
            (this.state.position.x) + 70 / 2,
            (this.state.position.y) + 70 / 2
        );
        switch (body.type) {
            case 'dynamic':
                bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
                break;
            case 'static':
                bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
                break;
        }
        this.body = bodyDef;

        var fixture = new Box2D.Dynamics.b2FixtureDef;
        switch (body.fixture.type) {
            case 'polygon':
                fixture.shape = new b2PolygonShape;
                let points = [];
                for (let i = 0; i < this.fixture.points.length; i++) {
                    var vec = new Box2D.Common.Math.b2Vec2(this.fixture.points[i].x, this.fixture.points[i].y);
                    points[i] = vec;
                }
                fixture.shape.SetAsArray(points, points.length);
                break;

            case 'circle':
                var fixture = new Box2D.Dynamics.b2FixtureDef;
                fixture.shape = new Box2D.Collision.Shapes.b2CircleShape(
                    this.fixture.r
                );
                break;
        }

        fixture.density = 1.0;
        fixture.friction = 1.5;
        fixture.restitution = 0.3;
        this.body.fixture = fixture;

        update() {
            this.state.position = this.body.GetPosition();
            super.update()
        }
    }
}