import chai from "chai";
import Canvas2DRenderer from "../src/canvas-2d-renderer";
import TilemapManager from "../src/tilemap-manager";
const map2dTilemap = "./base/test/tile-manager/assets/tilemap.json";
var should = chai.should();
describe("TilemapManager", async () => {
  var canvas2DRenderer: Canvas2DRenderer;
  var tilemapManager: TilemapManager;
  beforeEach(function() {
    canvas2DRenderer = new Canvas2DRenderer(1000, 500);
    tilemapManager = new TilemapManager(canvas2DRenderer);
  })
  describe("load()", async () => {
    it("should load tilemap and draw", async (): Promise < void > => {
      return tilemapManager.load(map2dTilemap)
        .then(function(tilemap) {
          tilemap.draw()
        })
    })
  })
})