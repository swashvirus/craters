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
		
			size:  {x: 20, y: 20},
			pos:   {x: 0, y: 0},
			vel:   {x: 0, y: 0},
			accel: {x: 0, y: 0},
			radius: 10,
			mass: 10
		}
	}
	
	update (){
		// update the sub entities if there's any
		// by firing off the update function one by one
		for(var entity = 0; entity < this.entities.length; entity ++) {
			this.entities[entity].update();
		}
	}
	
	render (){
		// render the sub entities if there's any
		for(var entity = 0; entity < this.entities.length; entity ++) {
			this.entities[entity].render();
		}
	}
}

module.exports = entity

})(window);