import chai from "chai";
import RenderLoop from "../src/render-loop";
var should = chai.should();
describe("RenderLoop", function() {
  var renderLoop: RenderLoop;
  before("Create and initiate render loop instance", function() {
    renderLoop = new RenderLoop(function(renderLoop: RenderLoop) {
      it("should assert index value", async (done): Promise < void > => {
        renderLoop.index.should.equal(1)
        done()
      })
      it("should assert delta value", async (done): Promise < void > => {
        renderLoop.delta.should.be.greaterThan(0)
        done()
      })
      it("should assert elapsed value", async (done): Promise < void > => {
        renderLoop.elapsed.should.be.greaterThan(renderLoop.delta)
        done()
      })
      it("should assert framerate value", async (done): Promise < void > => {
        renderLoop.frameRate.should.be.equal(60)
        done()
      })
      it("should assert current value", async (done): Promise < void > => {
        renderLoop.current.should.be.greaterThan(renderLoop.previous)
        done()
      })
      it("should assert previous value", async (done): Promise < void > => {
        renderLoop.previous.should.be.greaterThan(renderLoop.current)
        done()
      })
    }, 60)
  });
  after("Suspend and destroy render loop instance", function() {
    renderLoop.stop()
    // delete renderLoop
  });
  describe("wait", async () => {
    it("should hang and resolve after 100ms", async (): Promise < void > => {
      return new Promise(function(resolve) {
        setTimeout(function() {
          resolve()
        }, 100)
      })
    })
  })
});