(function(window){ "use strict";

var physics = class physics {

	constructor ( scope ) {
		
		return this.physics(scope);
		
	}
	
	static circlecollision(c1, c2)
	{
		var a = c1.pos.x - c2.pos.x;
		var b = c1.pos.y - c2.pos.y;
		var c = (a * a) + (b * b);
		var radii = c1.radius + c2.radius;
		return radii * radii >= c;
	}
	
	static solvecircle (c1, c2) {
		
		nVX1 = (c1.vel.x * (c1.mass - c2.mass) + (2 * c2.mass * c2.vel.x)) / (c1.mass + c2.mass);
		nVY1 = (c1.vel.y * (c1.mass - c2.mass) + (2 * c2.mass * c2.vel.y)) / (c1.mass + c2.mass);
		nVX2 = (c2.vel.x * (c2.mass - c1.mass) + (2 * c1.mass * c1.vel.x)) / (c1.mass + c2.mass);
		nVY2 = (c2.vel.y * (c2.mass - c1.mass) + (2 * c1.mass * c1.vel.y)) / (c1.mass + c2.mass);
		
		c1.x = c1.x + nVX1;
		c1.y = c1.y + nVY1;
		c2.x = c2.x + nVX2;
		c2.y = c2.y + nVY2;
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