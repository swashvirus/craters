import Sprite from "./sprite";
class Tilemap {
  tilemap;
  constructor(tilemap) {
    this.tilemap = tilemap
  }
  public draw(): void {
    this.tilemap.layers.forEach((layer: any) => {
      layer.data.forEach((tile: [number, number, number, number, number]) => {
        // v: Source x 
        // w: Source y
        // x: Destination x
        // y: Destination y
        // z: Tileset index
        var [v, w, x, y, z] = tile;
        var {
          sprite,
          tilewidth: s,
          tileheight: u
        } = this.tilemap.tilesets[z];
        sprite.draw(x * s, y * u, null, [w, v]);
      });
    });
  }
}
export default class TilemapManager {
  canvas2DRenderer;
  constructor(canvas2Drenderer) {
    this.canvas2DRenderer = canvas2Drenderer;
  }
  public load(resource: string) {
    const request: Request = new Request(resource)
    return fetch(request)
    .then(function (response) {
      return response.json()
    })
    .then(async (tilemap) => {
      tilemap.tilesets = await Promise.all(tilemap.tilesets.map(async (tileset: any) => {
        return new Promise((resolve, reject) => {
          var image: HTMLImageElement = new Image();
          image.onload = () => {
            tileset.sprite = new Sprite(this.canvas2DRenderer, image, tileset.tilewidth, tileset.tileheight, [], 0, tileset.tilewidth, tileset.tileheight);
            resolve(tileset);
          }
          image.onerror = reject;
          image.src = tileset.image;
        })
      }))
      return new Tilemap(tilemap)
    })
  }
}