// ## Polygon
// Represents a *convex* polygon with any number of points (specified in counter-clockwise order)
import {Vector} from '../Geometry/Geometry.js'
import AABB from '../Geometry/AABB.js'

export default class Polygon {
	constructor(pos, points) {
		this['type'] = 'polygon'
		this['pos'] = pos || new Vector();
		this['angle'] = 0;
		this['offset'] = new Vector();
		this.setPoints(points || []);
	}
	setPoints(points) {
		// Only re-allocate if this is a new polygon or the number of points has changed.
		var lengthChanged = !this['points'] || this['points'].length !== points.length;
		if (lengthChanged) {
			var i;
			var calcPoints = this['calcPoints'] = [];
			var edges = this['edges'] = [];
			var normals = this['normals'] = [];
			// Allocate the vector arrays for the calculated properties
			for (i = 0; i < points.length; i++) {
			// Remove consecutive duplicate points
			var p1 = points[i];
			var p2 = i < points.length - 1 ? points[i + 1] : points[0];
			if (p1 !== p2 && p1.x === p2.x && p1.y === p2.y) {
			points.splice(i, 1);
			i -= 1;
			continue;
			}
			calcPoints.push(new Vector());
			edges.push(new Vector());
			normals.push(new Vector());
			}
		}
		this['points'] = points;
		this._recalc();
		return this;
	};
	setAngle(angle) {
		this['angle'] = angle;
		this._recalc();
		return this;
	};
	setOffset(offset) {
		this['offset'] = offset;
		this._recalc();
		return this;
	};
	
	rotate(angle) {
		var points = this['points'];
		var len = points.length;
		for (var i = 0; i < len; i++) {
			points[i].rotate(angle);
		}
		this._recalc();
		return this;
	};
	translate(x, y) {
		var points = this['points'];
		var len = points.length;
		for (var i = 0; i < len; i++) {
			points[i]["x"] += x;
			points[i]["y"] += y;
		}
		this._recalc();
		return this;
	};
	
	_recalc() {
		var calcPoints = this['calcPoints'];
		var edges = this['edges'];
		var normals = this['normals'];
		// Copy the original points array and apply the offset/angle
		var points = this['points'];
		var offset = this['offset'];
		var angle = this['angle'];
		var len = points.length;
		var i;
		for (i = 0; i < len; i++) {
			var calcPoint = calcPoints[i].copy(points[i]);
			calcPoint["x"] += offset["x"];
			calcPoint["y"] += offset["y"];
			if (angle !== 0) {
				calcPoint.rotate(angle);
			}
		}
		// Calculate the edges/normals
		for (i = 0; i < len; i++) {
			var p1 = calcPoints[i];
			var p2 = i < len - 1 ? calcPoints[i + 1] : calcPoints[0];
			var e = edges[i].copy(p2).sub(p1);
			normals[i].copy(e).perp().normalize();
		}
		return this;
	};
	
	getAABB() {
		var points = this["calcPoints"];
		var len = points.length;
		var xMin = points[0]["x"];
		var yMin = points[0]["y"];
		var xMax = points[0]["x"];
		var yMax = points[0]["y"];
		for (var i = 1; i < len; i++) {
			var point = points[i];
			if (point["x"] < xMin) {
				xMin = point["x"];
			}
			else if (point["x"] > xMax) {
				xMax = point["x"];
			}
			if (point["y"] < yMin) {
				yMin = point["y"];
			}
			else if (point["y"] > yMax) {
				yMax = point["y"];
			}
		}
		return new AABB(this['pos'].clone().add(new Vector(xMin, yMin)), xMax - xMin, yMax - yMin).toPolygon();
	};
	
	getCentroid() {
		var points = this["calcPoints"];
		var len = points.length;
		var cx = 0;
		var cy = 0;
		var ar = 0;
		for (var i = 0; i < len; i++) {
			var p1 = points[i];
			var p2 = i === len - 1 ? points[0] : points[i+1]; // Loop around if last point
			var a = p1["x"] * p2["y"] - p2["x"] * p1["y"];
			cx += (p1["x"] + p2["x"]) * a;
			cy += (p1["y"] + p2["y"]) * a;
			ar += a;
		}
		ar = ar * 3; // we want 1 / 6 the area and we currently have 2*area
		cx = cx / ar;
		cy = cy / ar;
		return new Vector(cx, cy);
	}
}