/** Craters.js Demo Game
 *  This module contains the main game including entities
 *  everything was initiated in the craters.js 
 */
var game = require('./lib/modules/game.craters.js');
var cg = new game('#container', window.innerWidth, window.innerHeight, 60, true);

cg.state.entities = cg.state.entities || {}

var w = cg.constants.width,
	h = cg.constants.hieght;
// comment
var comet = function(name){
	// comment
	this.name = name;
	this.type = 'lunar';
	this.state = {
		position: {x:0, y:0}
	}
	// comment
	this.update = function (){
		// update the comet's shaking moves ,
		this.state.position.x += (Math.random() - 0.5);
		this.state.position.y += (Math.random() - 0.5);
		// 'DOS' console.log(this.name + ' ' + this.type + ' state:' + JSON.stringify(this.state));
	}
	// comment
	this.render = function (){
		// draw the entities ,
		cg.context.save();
		cg.context.font = '64px Impact';
		cg.context.fillText('☄️', (10 + this.state.position.x) , ((w / 2) + this.state.position.x), (w));
		// comment
		cg.context.font = '32px Impact';
		cg.context.fillText('It\'s working.️', 65, (w / 2), (w));
		cg.context.restore();
	}
}

// init an instance of a comet
cg.state.entities.comet = new comet('f18');