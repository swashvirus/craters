import {Maths} from './Geometry/Geometry.js'
import {Loop} from './System.js'
import {Canvas} from './System.js'
import Tilemap from './Modules/Tilemap/Tilemap.js'
import {Vector, QuadTree} from './Geometry/Geometry.js'
import Broadphase from './Collision/Broadphase.js'
import Narrowphase from './Collision/Narrowphase.js'
import Solver from './Collision/Solver.js'
import Circle from './Fixture/Circle.js';
import Polygon from './Fixture/Polygon.js';

export default class Game {
	constructor(params) {
		params.entities = params.entities || [];
		params.size = params.size || new Vector(1000, 500);
		params.gravity = params.gravity || new Vector();
		params.quad = params.quad || new Vector();
		params.resources = params.resources || {
			// resources object
		};
		params.resources.image = params.resources.image || [];
		params.resources.audio = params.resources.audio || [];
		params.resources.data = params.resources.data  || [];
		
		params.fps = params.fps || 60;
		params.debug = params.debug || false;
		
		this.entities = params.entities;
		this.debug = params.debug;
		this.state = {
			size: params.size,
			gravity: params.gravity
		}
	
		// create viewport
		this.viewport = new Canvas(this.state.size.x, this.state.size.y, params.container);
		this.context = this.viewport.context;
		// Create new grid
		this.quad = new QuadTree({x: params.quad.x, y: params.quad.y, width: params.size.x, height: params.size.y});
		this.solver = new Solver();
		this.tilemap = new Tilemap(params.tilemap, this.context, this.quad)
		
		// Loop main game
		this.loop = new Loop(this, params.fps)
		window['cg'] = this;
	}
	
	addObject(object) {
		// used for adding entities
		object.context = this.context;
		return this.entities.push(object)
	}
	
	removeObject(index) {
		// used to remove entities
		// this.quad.remove(this.entities[index])
		return this.entities.splice(index, 1)
	}
	
	update() {
		this.quad.clear()
		this.tilemap.update()
		// Loop through all bodies and update one at a time
		this.entities.forEach((body) => {
			// update grid quad
			let item = body;
			let bounds = item.fixture.getAABB();
			let edges = bounds.edges;
			let width = (edges[0].x - edges[2].x) / 2,
				height = (edges[1].y - edges[3].y) / 2;
			let position = item.state.position;
			let x = position.x,
				y = position.y;
			if(item.fixture.type == "circle")
			x = position.x - (width / 2),
			y = position.y - (height / 2);
			this.quad.insert({x , y , width, height, item})
			
			let broad = Broadphase.query(body, this.quad)
			let narrow = Narrowphase.query(body, broad)
			this.solver.resolve(body, narrow);
			// kinematics
			let gravity = this.state.gravity.clone().scale(body.gravityFactor.x, body.gravityFactor.y);
			let mass = body.state.mass;
			
			body.state.acceleration.add(gravity);
			body.state.velocity.add(body.state.acceleration);
			
			body.state.velocity.x = Math.min(body.state.velocity.x, body.state.maxVelocity.x);
			body.state.velocity.y = Math.min(body.state.velocity.y, body.state.maxVelocity.y);
			
			body.state.position.add(body.state.velocity.clone().scale(1 / this.state.loop.nframe))
			body.update();
		})
	}
	
	render() {
		// background clear
		this.viewport.clear()
		this.tilemap.render()
		
		if(this.debug) {
			let node = this.quad.root;
			let drawBound = (node) => {
				let bounds = node._bounds;
				let abs = Maths.abs;
				let context = this.context;
				
				context.save()
				context.strokeStyle = "green";
				context.lineWidth = "2";
				context.beginPath();
				context.rect(bounds.x, bounds.y, bounds.width, bounds.height);
				
				let children = node.getChildren();
				let childlength = children.length;
				let childNode;
				if(childlength) {
					for(let j = 0; j < childlength; j++) {
					childNode = children[j];
					context.beginPath();
					context.rect(childNode.x, childNode.y, childNode.width, childNode.height);
					}
				}
				
				let len = node.nodes.length;
				for(let i = 0; i < len; i++) {
					drawBound(node.nodes[i]);
				}
				context.stroke()
				context.restore();
			}
			// draw the QuadTree grid
			drawBound(node);
		}
		
		this.entities.forEach((body) => {
			// render body
			body.render();
			body.texture.update();
			body.texture.render();
		})
	}
}