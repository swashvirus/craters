import chai from "chai";
import Canvas2DRenderer from "../src/canvas-2d-renderer";
import AssetsManager from "../src/assets-manager";
import RenderLoop from "../src/render-loop";
import Sprite from "../src/sprite";
describe("Sprite", async () => {
  var canvas2DRenderer;
  var assetsManager;
  var renderLoop;
  beforeEach(function() {
    assetsManager = new AssetsManager();
    canvas2DRenderer = new Canvas2DRenderer(1920, 1200);
    renderLoop = new RenderLoop(function() {});
  })
  describe("Sprite()", async () => {
    it("Should load sprite and draw", async (): Promise < void > => {
      return assetsManager.loadImage("./base/test/sprite/assets/spritesheet.png")
        .then(function(spritesheet) {
          const frames = [
            [0, 0],
            [0, 1],
            [0, 2],
            [1, 0],
            [1, 1],
          ]
          const sprite = new Sprite(canvas2DRenderer, spritesheet, 214, 282, frames, 1 / 25, 107, 140)
          sprite.draw(100, 100, renderLoop)
          renderLoop.stop()
        })
    })
  })
})