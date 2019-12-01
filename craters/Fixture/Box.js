// ## Box
// Represents an axis-aligned box, with a width and height.
import {Vector} from '../Geometry/Geometry.js'
import Polygon from './Polygon.js'

export default class Box {
	constructor(pos, w, h) {
		this['pos'] = pos || new Vector();
		this['w'] = w || 0;
		this['h'] = h || 0;
	}
	
	// Returns a polygon whose edges are the same as this box.
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