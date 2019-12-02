import {Game, Entity, Fixtures, Vector} from '../../craters/craters'
import {loadImage} from '../../craters/Modules/Assets/Image.js'
// Game
class mygame extends Game {
    constructor(container, width, height) {
		super({
	        fps: 60,
	        debug: false,
	        container: '#container',
	        size: new Vector(500, 500),
	        resources: {image:['./tilemap.png'], data: ['./map.json']}
        });
        
        this.viewport.style.background = "#eee";
        this.viewport.resize(this, {
            x: window.innerWidth,
            y: window.innerHeight
        });
		let tilemap = {
		    "type": "map2d",
		    "tilesets": [{
		        "name": "platformer.png",
		        "image": "platformer.png",
		        "fixture": "Polygon",
		        "imagewidth": 980,
		        "imageheight": 910,
		        "tilewidth": 70,
		        "tileheight": 70,
		        "tileradius": 35
		    }],
		    "layers": [{
		        "id": "event_layer",
		        "width": 11.428571428571429,
		        "height": 8.685714285714285,
		        "data": []
		    }, {
		        "name": "background",
		        "width": 11.428571428571429,
		        "height": 8.685714285714285,
		        "data": []
		    }, {
		        "name": "world",
		        "width": 11.428571428571429,
		        "height": 8.685714285714285,
		        "data": [
		            [133, 3, 4, 0],
		            [119, 4, 4, 0],
		            [105, 5, 4, 0],
		            [21, 1, 5, 0],
		            [35, 1, 6, 0],
		            [35, 1, 7, 0],
		            [119, 0, 8, 0],
		            [119, 1, 8, 0],
		            [119, 2, 8, 0],
		            [119, 3, 8, 0],
		            [119, 4, 8, 0],
		            [119, 5, 8, 0],
		            [119, 6, 8, 0],
		            [119, 7, 8, 0],
		            [119, 8, 8, 0],
		            [119, 9, 8, 0],
		            [119, 10, 8, 0]
		        ]
		    }],
		    "canvas": {
		        "width": 800,
		        "height": 608
		    },
		    "events": "[]"
		}
        this.tilemap.load(tilemap, 'bridge')
        this.tilemap.set('bridge')
		for (var i = 0; i < 10; i++) {
		    let id = this.addObject(new marble(this)) - 1
		    this.entities[id].id = id;
		}
		this.state.gravity = new Vector(0, 0.01);
    }

    render() {
        super.render()
    }
}

class marble extends Entity {
    constructor(scope) {
        super({
        debug: false,
        texture: {
        style: {
        fillStyle: "green",
        strokeStyle: "white"
        },
        frames: [2],
        tileheight: '70',
        tilewidth: '70',
        image: sprite.fetch('./platformer.png')
        },
        velocity: new Vector(((Math.random() - 0.5) * 500), ((Math.random() - 0.5) * 500))
        });
        
        this.scope = scope;
        this.state.position.x = ((Math.random()) * this.scope.state.size.x)
        this.state.position.y = ((Math.random()) * (this.scope.state.size.y / 3))
        this.fixture = new Fixtures.Polygon(this.state.position, [{x:0, y:0}, {x:0, y:70}, {x:70, y:70}, {x:70, y:0}]);
    }
    update() {
	    // X-axis collision
	    if ((this.state.position.x + this.fixture.r > this.scope.state.size.x)) {
	    if (this.state.velocity.x < 0) return
		    this.state.velocity.x *= -1
	    }
	    // Y-axis collision
	    if ((this.state.position.y + this.fixture.r > this.scope.state.size.y)) {
	    if (this.state.velocity.y < 0) return
		    this.state.velocity.y *= -1
	    }
	    
	    if ((this.state.position.x - this.fixture.r < 0)) {
	    if (this.state.velocity.x > 0) return
		    this.state.velocity.x *= -1
	    }
	    // Y-axis collision
	    if ((this.state.position.y - this.fixture.r < 0)) {
	    if (this.state.velocity.y > 0) return
		    this.state.velocity.y *= -1
	    }
    }
}

let sprite = new loadImage()
let image = sprite.load('./platformer.png', () => {
	let game = new mygame('#container', 1024, 512)
});