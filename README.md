# craters.js ☄️
![npm bundle size](https://img.shields.io/bundlephobia/minzip/craters.js)
![es modules](https://img.shields.io/badge/es-modules-green)

![craters.js logo](craters.gif)
[craters.js documentation](https://swashvirus.github.io/documentation-craters.js/)

#### Short description
A Compact html5 Game Engine that helps you build fast, modern HTML5 Games
* [Buggame sprite sample game](https://swashvirus.github.io/craters.js/examples/sprites-demo/index.html)
* [Panda Breakout sample game](https://swashvirus.github.io/craters.js/examples/breakout-game/index.html)

#### features ✨
- Changelog outlines more features
	* [Read changelog](CHANGELOG.md)
- ES modules
	* reduces bundle size you only import what you need
- Sound
	* a sound system used for loading and playing sound effects
	
- Sprite
	* a sprite system it draws and animates images and sprites

- Loader
	* a file loading utility used for pre-loading image files and caching them so that they can be used by i.e the sprite system

- Entity
	* a base class for deriving your game entities from it cones with update and render methods as well as the state object with predefined variables namely velocity, acceleration, position and size

- Game
	* a base class for deriving your games from it has a state object just like the entity it also has methods update and render.

#### structure
game is a method used to create an instance of game world
the game and entities both have methods update and render

#### let's make a game 🚀
note the example game is included in the dist folder alternatively you can build it on your own 

clone repository
```bash 
git clone https://github.com/swashvirus/craters.js.git
# import app/craters/craters.js
```
npm install

```bash
npm install craters.js
```
```bash
Craters is the global Object used in the iife build
```
##### writing the demo game yourself
```javascript
'use strict';
import { Game, Canvas, Loop } from './craters/craters.js'

class mygame extends Game {
	constructor (container, width, height){
		super ();
		
		this.state.size = {x: width, y: height}
		this.viewport = new Canvas(this.state.size.x, this.state.size.y, container);
		this.context = this.viewport.getContext('2d')
		this.loop = new Loop(this, 60)
	}
	
    render () {
        super.render()
        this.clearContext(this.context, this.state.size)
        
        this.context.font = '2em Arial'
        this.context.fillText('It\'s working.️', 65, (this.state.size.y / 2), (this.state.size.x))
    }
}

window.game = new mygame('#container', window.innerWidth, window.innerHeight, 60, true)
```
Submit Issues and Contributions