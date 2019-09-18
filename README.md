# Craters.js ☄️
![](craters.gif)

[craters.js documentation](https://swashvirus.github.io/documentation-craters.js/)

#### Short description
craters.js is a simple to use micro game engine both lightweight and portable so minimal that it's just 1.5kb in size! zipped and minified.
in it, it includes all basics you need to get a game up and running in a few lines of code 
leaving enough room for the game logic. suitable for [js13kgames](https://js13kgames.com) competition

#### features ✨

- Sound.js
	sound system loads sounds methods
	
- Sprite.js
	a sprite system

- Loader.js
	file loading utility

- Entity.js
	Entity base class

- Game.js
	Game base class

#### structure
game is a method which creates an instance of a game world
the game and entities both have methods update and render
the games instance can have entities and entities can also have their own entities as long as they inherit the craters.entity class

#### let's make a game 🚀
note the example game is included in the dist folder alternatively you can build it on your own 

```bash sudo git clone https://github.com/swashvirus/craters.js.git ```
```bash cd ./craters.js && webpack ```

##### writing the demo game yourself
```javascript
"use strict";
// load craters.js script tag works too
require('./craters/craters.js');

class mygame extends craters.game {
	
	intitiate () {
	
		super.intitiate();
		// now intitiate my game
	}
	
	render () {
	
		super.render(this);
		
		this.context.font = '2em Arial';
		this.context.fillText('It\'s working.️', 65, (this.constants.height / 2), (this.constants.width));
	}
}

window.game = new mygame('#container', window.innerWidth, window.innerHeight, 60, true);
```
Let's make craters a reality contribute even a missing colon