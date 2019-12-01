import {Game, Entity, Fixtures, Vector} from '../../craters/craters'
import {loadImage} from '../../craters/Modules/Assets/Image.js'
// Game
class mygame extends Game {
    constructor(container, width, height) {
		super({
	        debug: false,
	        fps: 60,
	        container: '#container',
	        size: new Vector(500, 500),
	        hash: new Vector(50, 50),
	        resources: {image: ['./bug.png'], data: ['./map.json']}
        });
        
        this.viewport.style.background = "#eee";
        this.viewport.resize(this, {
            x: window.innerWidth,
            y: window.innerHeight
        });
        
        // this.state.gravity = new Vector(0, 0.01)
        // add some marbles
        for (var i = 0; i < 10; i++) {
            let id = this.addObject(new marble(this)) - 1
            this.entities[id].id = id;
        }
    }

    render() {
        super.render()
    }
}

// Marble
class marble extends Entity {
    constructor(scope) {
        let params = {
	        debug: false,
	        texture: {
		        style: {
			        fillStyle: "green",
			        strokeStyle: "white"
		        },
		        /*frames: [0],
		        tileheight: '196',
		        tilewidth: '218',
		        image: sprite.fetch('./bug.png')*/
	        },
	        velocity: new Vector(((Math.random() - 0.5) * 300), ((Math.random() - 0.5) * 300))
        }
        super(params);
        
        this.scope = scope;
        this.state.position.x = ((Math.random()) * this.scope.state.size.x)
        this.state.position.y = ((Math.random()) * this.scope.state.size.y)
        this.fixture = (Math.random() < 0.5) ? new Fixtures.Circle(this.state.position, 50) : new Fixtures.Polygon(this.state.position, [{x:0, y:0}, {x:0, y:50}, {x:50, y:50}, {x:50, y:0}]);
        this.fixture.r = this.fixture.r || 0;
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
    render() {
		super.render();
		
    }
}

let sprite = new loadImage()
let image = sprite.load('./bug.png', () => {
	let game = new mygame('#container', 1024, 512)
});