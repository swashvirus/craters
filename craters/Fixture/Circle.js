// ## Circle
// Represents a circular fixture
import {Vector} from '../Geometry/Geometry.js'
import AABB from '../Geometry/AABB.js'

export default class Circle {
	constructor(pos, r) {
		this['type'] = 'circle'
		this['pos'] = pos || new Vector();
		this['r'] = r || 0;
		this['offset'] = new Vector();
	}
	
	// Compute the axis-aligned bounding AABB (AABB) of this Circle.
	//
	// Note: Returns a _new_ `Polygon` each time you call this.
	/**
	* @return {Polygon} The AABB
	*/
	getAABB() {
		var r = this['r'];
		var corner = this['pos'].clone().add(this['offset']).sub(new Vector(r, r));
		return new AABB(corner, r*2, r*2).toPolygon();
	};
	getCentroid() {
		let aabb = this.getAABB();
		let x = aabb.edges[3].x;
		let y = aabb.edges[2].y;
		let cx = (aabb.edges[0].x - x) / 2;
		let cy = (aabb.edges[1].y - y) / 2;
		return new Vector(cx, cy);
	}
	// Set the current offset to apply to the radius.
	/**
	* @param {Vector} offset The new offset vector.
	* @return {Circle} This for chaining.
	*/
	setOffset(offset) {
		this['offset'] = offset;
		return this;
	}
}