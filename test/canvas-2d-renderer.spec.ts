import chai from "chai";
import AssetsManager from "../src/assets-manager";
import Canvas2DRenderer from "../src/canvas-2d-renderer";
var should = chai.should();
describe("Canvas2DRenderer", function() {
  var assetsManager: AssetsManager,
    canvas2DRenderer: Canvas2DRenderer;
  before("Prepare assetsManager instance", function() {
    assetsManager = new AssetsManager();
  });
  after("destroy assetsManager instance", function() {
    // delete assetsManager;
  });
  beforeEach("prepare canvas2DRenderer instance", function() {
    canvas2DRenderer = new Canvas2DRenderer(1920, 1200);
  });
  afterEach("destroy canvas2DRenderer instance", function() {
    // delete canvas2DRenderer
  });
  describe("createImage()", async () => {
    it("should create image", async (): Promise < void > => {
      return assetsManager.loadImage("./base/test/canvas-2d-renderer/assets/test.png")
        .then(function(image: HTMLImageElement) {
          canvas2DRenderer.createImage(image);
        })
    })
  })
  describe("drawImage()", async () => {
    it("should draw image", async (): Promise < void > => {
      return assetsManager.loadImage("./base/test/canvas-2d-renderer/assets/test.png")
        .then(function(image: HTMLImageElement) {
          const createdImage = canvas2DRenderer.createImage(image)
          canvas2DRenderer.drawImage(createdImage)
        })
    })
  })
  describe("resize()", async () => {
    const sizes = [];
    [void 0, 1920, 1200].forEach(function(width) {
      [void 0, 1920, 1200].forEach(function(height) {
        sizes.push({
          width,
          height
        })
      })
    })
    sizes.forEach(function(size) {
      it("should resize canvas", async (done): Promise < void > => {
        canvas2DRenderer.resize(size.width, size.height)
        done()
      })
    })
  })
  describe("clear()", async () => {
    const fills = [];
    [void 0, "rgba(25.5,25.5,25.5,1)"].forEach(function(color) {
      [void 0, 1920, 1200].forEach(function(width) {
        [void 0, 1920, 1200].forEach(function(height) {
          [void 0, 0].forEach(function(x) {
            [void 0, 0].forEach(function(y) {
              fills.push({
                color,
                width,
                height,
                x,
                y
              })
            })
          })
        })
      })
    })
    fills.forEach((fill) => {
      it("should clear canvas", async (done): Promise < void > => {
        canvas2DRenderer.clear(fill.color, fill.x, fill.y, fill.width, fill.height)
        done()
      })
    })
  })
});