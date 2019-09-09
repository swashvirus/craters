# Craters.js ☄️
![](craters.gif)
[craters.js nodejs version️](https://github.com/swashvirus/node-craters.js)
#### Short escription
craters.js is a simple to use micro game engine both lightweight and portable so minimal that it's just 1.5kb in size zipped and minified 
in it. it includes all basics you need to get a game up and running in a few lines of code 
a main loop , update and render. at its core
everything is an entity with methods update and render called per frame rate
the main container is a method called container
containers have entities and their entities can also have entities as long as they inherit the craters.entity class
leaving enough room for the game logic. suitable for [js13kgames](https://js13kgames.com) competition or anyone trying to build a game using a skeleton framework as opposed to complex alternatives
#### Let's Blast Off 🚀
note the example game is included in the dist folder alternatively you can build it on your own 
`sudo git clone https://github.com/swashvirus/craters.js.git`
`cd ./craters.js && webpack`
#### writing the demo game yourself
```javascript
"use strict";
"use strict";
/** Craters.js Demo Game
 *  This module contains the main game including entities
 *  everything was initiated in the craters.js 
 */

// load craters. js --- script tag 
// works just good as well 
// only using craters.min.js ofcourse

class mygame extends craters.container {
	
	init () {
		super.init();
		// now init my game
		// deploy a new comet into the world
		this.state.entities.push( new comet(this, 'f18') );
	}
}

class comet extends craters.entity {
	// extend the entity class */
	constructor (scope, name) {
		super();
		this.scope = scope;
		this.type = 'kinematic';
		this.name = name;
		this.state.pos = {x: 10, y: (this.scope.constants.height / 2) - 25}
	}
	
	update (){
		// update the comet's shaking moves ,
		this.state.pos.x += (Math.random() - 0.5);
		this.state.pos.y += (Math.random() - 0.5);
		// 'DOS' console.log(this.name + ' ' + this.type + ' state:' + JSON.stringify(this.state));
	}
	// draws the entity on the canvas
	render (){
		// draw the entities ,
		this.scope.context.save();
		this.scope.context.font = '64px Impact';
		this.scope.context.fillText('☄️', (10 + this.state.pos.x) , (this.state.pos.y), (this.scope.constants.width));
		// comment
		this.scope.context.font = '32px Impact';
		this.scope.context.fillText('It\'s working.️', 65, (this.scope.constants.width / 2), (this.scope.constants.width));
		this.scope.context.restore();
	}
}

window.cg = new mygame('#container', window.innerWidth, window.innerHeight, 60, true);

```
#### TODO
- more physics collision detection
- window resize function built in
- fixing errors
- update render on main container