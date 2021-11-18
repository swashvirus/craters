## ARCHATECTURE
Craters mainly consists of craters render-loop, canvas-2d-renderer as well as assets-manger. most modules are dependant on these three core modules.
### DESIGN
A tile is a most simple graphic a renderer can draw. All other types of elements such as sprites, tilemaps and font maps are directly derived from it; For instance a Sprite is a single tile drawn at a specified offset and size, a tilemap is a Sprite drawn at a specified offset and size, on multiple positions during each render cycle, fontmaps are nothing different and like tilemaps but with fontmaps each character is represented by its own offset.
### PHILOSOPHY
Craters is built to be modular and relatively simple to understand.
