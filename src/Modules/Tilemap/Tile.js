import Textures from '../../Texture/Textures.js'
import Fixtures from '../../Fixture/Fixtures.js'
import {Vector} from '../../Geometry/Geometry.js'

export default class Tile {
	constructor(context, params, args) {
		let vec = Vector;
		let num = Number;
		let obj = Object;
		let str = String;
		let arr = Array;
		
		this.state = {
		// properties
		}
		this.collision = {
		collides: true
		}
		this.type = 'kinematic';
		this.context = context;
		params = params || new obj({
		// texture properties
		})
		params.style = params.style || new obj({
		// texture style properties
		})
		params.style.fillStyle = params.style.fillStyle || new str("#ddd")
		params.style.lineWidth = params.style.lineWidth || new num(2)
		params.style.strokeStyle = params.style.strokeStyle || new str("#333")
		params.frames = [Math.floor(args[0])]
		// params.image = null;
		// [tileId, row, col, tileset]
		this.state.position = new Vector(params.tilewidth * args[1], params.tileheight * args[2])
		// console.log(this.state)
		// Todo circles too
		this.fixture = new Fixtures.Polygon(this.state.position, [{x:0, y:0}, {x:0, y:params.tileheight}, {x:params.tilewidth, y:params.tileheight}, {x:params.tilewidth, y:0}]);
		this.texture = new Textures.Sprite(this, params);
	}
};