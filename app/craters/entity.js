(function(window){ "use strict";

var entity = class entity {
	constructor () {
		this.entities = []
		// Setup the defaults if no parameters are given
		// Type represents the collision detector's handling
		this.type = this.type || 'dynamic'
		
		// Collision represents the type of collision
		// another object will receive upon colliding
		this.collision = this.collision || 'elastic';
		
		this.state = {
		
			size:  {x: 16, y:16},
			pos:   {x: 0, y:0},
			vel:   {x: 0, y: 0},
			accel: {x: 0, y: 0},
			radius: 8,
			mass: 4
		}
	}
	
	update (){
		// comment
		for(var entity = 0; entity < this.entities.length; entity ++) {
			this.entities[entity].update();
		}
	}
	
	render (){
		// comment
		for(var entity = 0; entity < this.entities.length; entity ++) {
			this.entities[entity].render();
		}
	}
}

module.exports = entity

})(window);