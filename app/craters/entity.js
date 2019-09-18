(function(window) { "use strict";

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
			
				size:  {x: 100, y: 100},
				pos:   {x: 0, y: 0},
				vel:   {x: 0, y: 0},
				accel: {x: 0, y: 0},
				radius: 10,
				mass: 10,
				angle: 0
			}
			
			this.sprite = {
			
				frames: [],
				pos: {x:0, y:0},
				image: new Image(),
				orientation: orientation || 'horizontal',
				loop: true,
				delay: 5,
				delaytick:0
			}
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
		var that = this; 
		that.scope.context.save();
		that.scope.context.translate(this.state.pos.x + (this.state.size.x / 2), this.state.pos.y + (this.state.size.y / 2));
		that.scope.context.rotate((that.state.angle) * (Math.PI / 180));
		that.scope.context.translate(- (this.state.pos.x + (this.state.size.x / 2)), - (this.state.pos.y + (this.state.size.y / 2)));
		
		// render the sub entities if there's any
		for(var entity = 0; entity < this.entities.length; entity ++) {
			this.entities[entity].render();
		}
		
		function drawFrame(img, frameX, frameY, canvasX, canvasY) {
		  that.scope.context.drawImage(img,
		                (frameX * that.state.size.x), (frameY * that.state.size.y), that.state.size.x, that.state.size.y,
		                canvasX, canvasY, that.state.size.x, that.state.size.y );
		}
		
		if (this.sprite.delaytick <= 0) {
			
			if(this.orientation == 'vertical') {
				
				this.sprite.pos.y = this.sprite.frames.shift()
				this.sprite.frames.push(this.sprite.pos.y)
			
			} else {
			
				this.sprite.pos.x = this.sprite.frames.shift()
				this.sprite.frames.push(this.sprite.pos.x)
			}
			
			this.sprite.delaytick = this.sprite.delay;
		}
		
			this.sprite.delaytick--;
			drawFrame(this.sprite.image, this.sprite.pos.x, this.sprite.pos.y, this.state.pos.x, this.state.pos.y);
		
		that.scope.context.restore();
		
		}
	}
	
	module.exports = entity

})(window);