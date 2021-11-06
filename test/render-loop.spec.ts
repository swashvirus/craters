import chai from "chai";
import RenderLoop from "../src/render-loop";
var should = chai.should();
var renderLoop;
describe("RenderLoop", function () {
  before("Create and initiate render loop instance", function () {
    renderLoop = new RenderLoop(function (renderLoop) {
      it("Should assert index value", async (done): Promise < void > => {
        renderLoop.index.should.equal.to(1)
        done()
      })
      it("Should assert delta value", async (done): Promise < void > => {
        renderLoop.delta.should.be.greater.than(0)
        done()
      })
      it("Should assert elapsed value", async (done): Promise < void > => {
        renderLoop.elapsed.should.be.greater.than.or.equal.to(renderLoop.delta)
        done()
      })
      it("Should assert framerate value", async (done): Promise < void > => {
        renderLoop.framerate.should.be.equal.to(60)
        done()
      })
      it("Should assert current value", async (done): Promise < void > => {
        renderLoop.current.should.be.greater.than(renderLoop.previous)
        done()
      })
      it("Should assert previous value", async (done): Promise < void > => {
        renderLoop.previous.should.be.greater.than(renderLoop.current)
        done()
      })
    }, 60)
  });
  after("Suspend and destroy render loop instance", function () {
    renderLoop.stop()
    // delete renderLoop
  });
  describe("wait", async () => {
    it("Should hang and resolve after 100ms", async (): Promise < void > => {
      return new Promise(function (resolve) {
        setTimeout(function () {
          resolve()
        }, 100)
      })
    })
  })
});