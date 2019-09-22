#### v0.0.0.1
* miniature physics engine acceleration velocity gravity
* container has a loop update render cycle of it's own
#### v0.0.0.2
* sprite
* loader
* sound
#### v0.0.0.3
* sprite is an entity
	use case multi purpose use where image drawing is required i.e hub icons
	`tip` pass a reference to entity pos and angle to keep entity synchronized with the sprite
	the first argument is the scope,
* loader has a callback
	use case starting the game after resource loading process is done
* ES modules
	reduces bundle size by including only what you need
#### v0.0.0.4
* constructor
	all constructors start with a capital letter i.e Game , Entity 
* name changes
	game method has a its constants object renamed to state
	and entities removed from state object , its now accessed by game.entities instead of game.state.entities
	more simplification and code comments coming soon.
* sprite tip;
	it can be used to create an entity quick and fast
	i.e ladybug extends sprite