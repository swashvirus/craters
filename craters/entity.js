import {Vector} from './Geometry/Geometry.js'
import Textures from './Texture/Textures.js'

export default class Entity {
    constructor(params) {
		// define shortcuts 
		let vec = Vector;
		let num = Number;
		let obj = Object;
		let str = String;
		let arr = Array;
		
		params.debug = params.debug || false;
		params.position = params.position || new vec()
		params.angle = params.angle || new num();
		params.maxVelocity = params.maxVelocity || new vec(200, 200)
		params.velocity = params.velocity || new vec()
		params.acceleration = params.acceleration || new vec()
		params.mass = params.mass || new num(1);
		params.force = params.force || new vec()
		params.texture = params.texture || new obj({
			// texture properties
		})
		params.texture.style = params.texture.style || new obj({
			// texture style properties
		})
		params.texture.style.fillStyle = params.texture.style.fillStyle || new str("#ddd")
		params.texture.style.lineWidth = params.texture.style.lineWidth || new num(2)
		params.texture.style.strokeStyle = params.texture.style.strokeStyle || new str("#333")
		
		this.debug = params.debug;
		this.state = {
			// an object storing
			// entity properties
		}
		this.state.position = params.position
		this.state.angle = params.angle
		
		params.collision = params.collision || new obj({
			// collision properties
		})
		// default collision properties
		params.collision.collides = params.collision.collides || true;
		params.collision.group = params.collision.group || new arr(['everyone']);
		params.collision.checkAgenist = params.collision.checkAgenist || new arr(['everyone']);
		params.gravityFactor = params.gravityFactor || new vec(1, 1)
		
		// collision properties
		this.collision = {
			collides: params.collision.collides,
			group: params.collision.group,
			checkAgenist: params.collision.checkAgenist
		}
		
		// body dynamics
		this.state.force = params.force
		this.gravityFactor = params.gravityFactor
		// mass
		this.state.mass = params.mass
        // body kinematics
        this.state.maxVelocity = params.maxVelocity
        this.state.velocity = params.velocity
        this.state.acceleration = params.acceleration
        
        // body type
        this.types = {
	        kinematic: 'kinematic',
	        dynamic: 'dynamic'
        }
        
        // set default body type
        this.type = params.type;
        
        // fixture
        this.fixture = {
	        // friction
	        // size
	        // density
	        // material
        }
        
        // body texture
        this.texture = new Textures.Sprite(this, params.texture);
    }
    
    // update own state
    update () {
    
    }
    
    // render own state
    render() {
	    let style = this.texture.style;
	    let context = this.context;
	    
	    // if(this.debug) {
	    // Todo save , centroid.
	    context.save()
	    context.beginPath();
	    context.strokeStyle = "red";
	    context.lineWidth = "1";
	    
	    let bounds = this.fixture.getAABB();
	    let edges = bounds.edges;
	    let width = (edges[0].x - edges[2].x) / 2,
		    height = (edges[1].y - edges[3].y) / 2;
	    let position = this.state.position;
	    let x = position.x,
		    y = position.y;
	    if(this.fixture.type == "circle")
	    x = position.x - (width / 2),
		y = position.y - (height / 2);
	    
	    context.rect(x , y , width, height)
	    context.stroke()
	    context.restore()
	    // }
	    context.fillStyle = style.fillStyle;
	    context.lineWidth =  style.lineWidth;
	    context.strokeStyle = style.strokeStyle;
	    context.lineJoin = 'miter';
    }
}