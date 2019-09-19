(function(window) { "use strict";

	class entity {
		constructor () {
			// Setup the defaults if no parameters are given
			// Type represents the collision detector's handling
			this.type = this.type || 'dynamic'
			
			// Collision represents the type of collision
			// another object will receive upon colliding
			this.collision = this.collision || 'elastic';
			
			this.state = {
			
				size:  {x: 100, y: 100},
				pos:   {x: 0, y: 0},
				vel:   {x: 0, y: 0},
				accel: {x: 0, y: 0},
				radius: 10,
				mass: 10,
				angle: 0
			}
			
			this.entities = [];
		}
		
		update () {
			
			// update the sub entities if there's any
			// by firing off the update function one by one
			for(var entity = 0; entity < this.entities.length; entity ++) {
				this.entities[entity].update();
			}
			
			switch (this.type) {
				
				case 'dynamic':
					this.state.vel.x += this.state.accel.x;
					this.state.vel.y += this.state.accel.y;
					this.state.pos.x  += this.state.vel.x;
					this.state.pos.y  += this.state.vel.y;
				break;
				case 'kinematic':
					this.state.vel.x += this.state.accel.x;
					this.state.vel.y += this.state.accel.y;
					this.state.pos.x  += this.state.vel.x;
					this.state.pos.y  += this.state.vel.y;
				break;
			}
		}
		
		render () {
		
			for(var entity = 0; entity < this.entities.length; entity ++) {
				this.entities[entity].render();
			}
		}
	}

	class sprite extends entity {
		constructor (scope, args) {
			super();
			
			this.scope = scope;
			this.state = {
				cord:    args.pos || {x:0, y:0},
				pos:    {x:0, y:0},
				size:   args.size || {x:0, y:0},
				frames: args.frames || [],
				angle:  args.angle || 0,
				image:  args.image || new Image(),
				loop:   args.loop || true,
				delay:  args.delay || 5,
				tick:   args.tick || 0,
				orientation: args.orientation || 'horizontal'
			}
		}
		
		update () {
		
			if (this.state.tick <= 0) {
					
					if(this.orientation == 'vertical') {
						
						this.state.pos.y = this.state.frames.shift()
						this.state.frames.push(this.state.pos.y)
					
					} else {
					
						this.state.pos.x = this.state.frames.shift()
						this.state.frames.push(this.state.pos.x)
					}
					
					this.state.tick = this.state.delay;
			}
				
				this.state.tick--;
		}
		
		render () {
		
			super.render(this);
			
			this.scope.context.save();
			this.scope.context.translate(this.state.pos.x + (this.state.size.x / 2), this.state.pos.y + (this.state.size.y / 2));
			this.scope.context.rotate((this.state.angle) * (Math.PI / 180));
			this.scope.context.translate(- (this.state.pos.x + (this.state.size.x / 2)), - (this.state.pos.y + (this.state.size.y / 2)));
			
			this.scope.context.drawImage(this.state.image,
			(this.state.pos.x * this.state.size.x), (this.state.pos.y * this.state.size.y), this.state.size.x, this.state.size.y,
			this.state.cord.x, this.state.cord.y, this.state.size.x, this.state.size.y);
			
			this.scope.context.restore();
		}
	}

	module.exports = { entity, sprite }

})(window);