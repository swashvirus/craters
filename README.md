# craters.js ☄️
![npm bundle size](https://img.shields.io/bundlephobia/minzip/craters.js)
![es modules](https://img.shields.io/badge/es-modules-green)

![craters.js logo](craters.gif)
[craters.js documentation](https://swashvirus.github.io/documentation-craters.js/)

#### Short description
craters.js is a simple to use micro game engine both lightweight and portable so minimal that it's just 1.5kb in size! zipped and minified.
in it, it includes all basics you need to get a game up and running in a few lines of code 
leaving enough room for the game logic. suitable for [js13kgames](https://js13kgames.com) competition

#### features ✨
[Read changelog](CHANGELOG.md)
- ES modules
	reduces bundle size
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

clone repository
```bash 
git clone https://github.com/swashvirus/craters.js.git
# import app/craters/craters.js
```
npm install

```bash
npm install craters.js
```

##### writing the demo game yourself
```javascript
'use strict';
import { Game } from 'craters.js'

class mygame extends Game {
    intitiate() {
        super.intitiate();
    }

    render() {
        super.render(this)
        this.context.font = '2em Arial'
        this.context.fillText('It\'s working.️', 65, (this.constants.height / 2), (this.constants.width))
    }
}

window.game = new mygame('#container', window.innerWidth, window.innerHeight, 60, true)
```
Submit Issues and Contributions