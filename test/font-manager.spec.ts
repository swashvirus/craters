import chai from "chai";
import Canvas2DRenderer from "../src/canvas-2d-renderer"
import FontManager from "../src/font-manager";
var should = chai.should();
describe("FontManager", function() {
  var fontManager: FontManager, canvas2DRenderer: Canvas2DRenderer;
  var text: string = `MIT License

Copyright (c) 2019 JOHN SWANA

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;
  before("Create Canvas2DRenderer instance", function() {
    canvas2DRenderer = new Canvas2DRenderer(1000, 500);
  });
  after("Destroy Canvas2DRenderer instance", function() {
    // delete canvas2DRenderer
  });
  beforeEach("Create Font instance", function() {
    fontManager = new FontManager(canvas2DRenderer, "40px Aerial");
  });
  afterEach("Destroy Font instance", function() {
    // delete font
  });
  describe("load()", async () => {
    it("should load text and draw text", async (done): Promise < void > => {
      const text1 = text.substr(0, text.length / 2)
      var font = fontManager.load(text1)
      font.draw(text, 0, 0)
      done()
    })
  })
});