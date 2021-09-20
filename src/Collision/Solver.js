import {Vector} from '../Geometry/Geometry.js'
import Circle from '../Fixture/Circle.js';
import Polygon from '../Fixture/Polygon.js';
import SAT from '../Geometry/SAT.js'

export default class Solver {
	constructor() {
		this.response = new SAT.Response(); // Response reused for collisions
	}
	resolve(collidee, colliders) {
		colliders.forEach((collider) => {
			let collided;
			if (collider.fixture instanceof Circle) {
				if (collidee.fixture instanceof Circle) {
					collided = SAT.testCircleCircle(collider.fixture, collidee.fixture, this.response);
				} else {
					collided = SAT.testCirclePolygon(collider.fixture, collidee.fixture, this.response);
				}
			} else {
				if (collidee.fixture instanceof Circle) {
					collided = SAT.testPolygonCircle(collider.fixture, collidee.fixture, this.response);
				} else {
					collided = SAT.testPolygonPolygon(collider.fixture, collidee.fixture, this.response);
				}
			}
			if (collided) {
				// TODO look into this
				if (collider.type == 'kinematic') {
				  // Move the collidee object out of us
				  collidee.state.position.add(this.response.overlapV);
				  collidee.state.velocity.add(this.response.overlapV);
				} else if (collidee.type == 'kinematic') {
				  // Move us out of the collidee object
				  collider.state.position.sub(this.response.overlapV);
				  collider.state.velocity.sub(this.response.overlapV);
				} else {
				  // Move equally out of each collidee
				  this.response.overlapV.scale(0.5);
				  collider.state.position.sub(this.response.overlapV);
				  collidee.state.position.add(this.response.overlapV);
				  
				  collider.state.velocity.sub(this.response.overlapV);
				  collidee.state.velocity.add(this.response.overlapV);
				}
			}
			this.response.clear();
		})
	}
};