(function(window){ "use strict";
// basic physics world 
// gravity acceleration and velocity
// affecting entities in the world

var physics = class physics {

	constructor ( scope ) {
		
		return this.physics(scope);
		
	}
	
	physics (scope) {
	    return function physics( tFrame ) {
	        var state = scope.state || [],
	            entities = state.entities;
            
            this.KINEMATIC = 'kinematic';
            this.DYNAMIC = 'dynamic';
            
			var elapsed = tFrame / 1000 ;
		    var g = scope.constants.gravity;
			    g.x = g.x / 100;
			    g.y = g.y / 100;
		    var entities = scope.state.entities,
			    entity, collisions;
		    for (var i = 0, length = entities.length; i < length; i++) {
		        entity = entities[i];
		        switch (entity.type) {
		            case this.DYNAMIC:
		                entity.state.vel.x += entity.state.accel.x * elapsed + g.x;
		                entity.state.vel.y += entity.state.accel.y * elapsed + g.y;
		                entity.state.pos.x  += entity.state.vel.x * elapsed;
		                entity.state.pos.y  += entity.state.vel.y * elapsed;
		                break;
		            case this.KINEMATIC:
		                entity.state.vel.x += entity.state.accel.x * elapsed;
		                entity.state.vel.y += entity.state.accel.y * elapsed;
		                entity.state.pos.x  += entity.state.vel.x * elapsed;
		                entity.state.pos.y  += entity.state.vel.y * elapsed;
		                break;
		        }
		    }
	
	        return state;
	    }
	}
}

	module.exports = physics

})(window);