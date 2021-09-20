import Tile from './Tile.js'

// tilemap add (tilesheet)
export default class Tilemap {
	constructor(params, context, quad) {
		this.tilemaps = [];
		this.level = null;
		this.quad = quad;
		this.pool = [];
		this.context = context;
	}
	
	__load(tilemap) {
		let tilesets = [];
		this.pool = [];
		// parser
		tilemap.tilesets.forEach((params) => {
			// make a tile
			tilesets.push(params)
		});
		// populate
		tilemap.layers.forEach((layer) => {
			layer.data.forEach((tile) => {
			// make an instance of a tile
			// array [tileId, row, col, tileset]
			let params = tilesets[tile[3]];
			let img	= new Image()
			img.src = params.image;
			img.onload = () => {
				params.image = img;
					let tiles = new Tile(this.context, params, tile);
					this.quad.insert(tiles)
					this.pool.push(tiles)
				}
			});
		});
	}
	
	load(tilemap, name) {
		this.tilemaps[name] = tilemap;
	}
	
	set(name) {
		if(!this.tilemaps[name]) return;
		this.__load(this.tilemaps[name]);
	}
	
	update(params) {
		this.pool.forEach((tile) => {
			let item = tile;
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
			item.texture.update();
		})
	}
	
	render(params) {
		this.pool.forEach((tile) => {
			tile.texture.render();
		})
	}
};