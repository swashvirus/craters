// ## AABB
// Represents an axis-aligned AABB, with a width and height.
import {Vector} from '../Geometry/Geometry.js'
import Polygon from '../Fixture/Polygon.js'

export default class AABB {
	constructor(pos, w, h) {
		this['pos'] = pos || new Vector();
		this['w'] = w || 0;
		this['h'] = h || 0;
	}
	
	// Returns a polygon whose edges are the same as this AABB.
	toPolygon() {
		var pos = this['pos'];
		var w = this['w'];
		var h = this['h'];
		return new Polygon(new Vector(pos['x'], pos['y']), [
			new Vector(), new Vector(w, 0),
			new Vector(w,h), new Vector(0,h)
		]);
	}
}