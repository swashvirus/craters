import Canvas2DRenderer from "./canvas-2d-renderer";
import RenderLoop from "./render-loop";
import Tile from "./tile";
export default class Sprite {
  renderer;
  image: HTMLImageElement;
  sWidth: number;
  sHeight: number;
  frames: number[][] = [];
  duration: number;
  dWidth: number;
  dHeight: number;
  grid: {
    tile: Tile | null,
    width: number,
    height: number,
    position: {
      x: number,
      y: number
    } | null,
    positions: {
      x: number,
      y: number
    } [] | null
  } [][];
  index: number[] = [];
  constructor(renderer: any, image: HTMLImageElement, sWidth: number, sHeight: number, frames: number[][], duration: number, dWidth: number, dHeight: number) {
    this.frames = [];
    this.index = [];
    this.renderer = renderer;
    this.image = image;
    this.sWidth = sWidth;
    this.sHeight = sHeight;
    this.frames = frames;
    this.duration = duration;
    this.dWidth = dWidth;
    this.dHeight = dHeight;
    const spritesheet = new Tile(renderer, image, sWidth, sHeight, dWidth, dHeight);
    this.grid = new Array(image.height / sHeight)
      .fill(0)
      .map(function() {
        return new Array(image.width / sWidth)
          .fill(0)
          .map(function() {
            return {
              tile: null,
              width: sWidth,
              height: sHeight,
              position: null,
              positions: null
            };
          });
      })
      .map(function(rows, row: number) {
        return rows.map(function(columns, column) {
          columns.position = {
            x: column * columns.width,
            y: row * columns.height
          };
          columns.positions = [{
            x: 0,
            y: 0
          }, {
            x: columns.width,
            y: 0
          }, {
            x: columns.width,
            y: columns.height
          }, {
            x: 0,
            y: columns.height
          }];
          columns.tile = spritesheet
          return columns;
        });
      });
  }
  draw(dX: number, dY: number, renderLoop: RenderLoop, frameIndex ? : number[]) {
    if (frameIndex) {
      this.index = frameIndex;
    } else {
      this.index = this.frames[(Math.floor((renderLoop.elapsed / 1000) / this.duration) % this.frames.length)];
    }
    const column = this.grid[this.index[0]][this.index[1]]
    const {
      x: sX,
      y: sY
    } = column.position
    column.tile.draw(sX, sY, dX, dY);
  }
};