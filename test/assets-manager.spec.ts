import chai from "chai";
import AssetsManager from "../src/assets-manager";
var should = chai.should();
describe("AssetsManager", function() {
  var assetsManager: AssetsManager;
  before("prepare assetsManager instance", function() {
    assetsManager = new AssetsManager();
  });
  after("destroy assetsManager instance", function() {
    // delete assetsManager;
  });
  describe("loadText()", async () => {
    it("should request text file and resolve", async (): Promise < void > => {
      return assetsManager.loadText("./base/test/assets-manager/assets/test.txt")
        .then(function(text) {
          text.should.equal("test")
        });
    });
  });
  describe("loadJson()", async () => {
    it("should request json file and resolve", async (): Promise < any > => {
      return assetsManager.loadJson("./base/test/assets-manager/assets/test.json")
        .then(function(json) {
          json.test.should.equal(true)
        });
    });
  });
  describe("loadImage()", async () => {
    it("should request an image and resolve", async (): Promise < HTMLImageElement > => {
      return assetsManager.loadImage("./base/test/assets-manager/assets/test.png");
    });
  });
  describe("loadFont()", async () => {
    it("should request a font and resolve", async (): Promise < FontFace > => {
      return assetsManager.loadFont("Test", "url(\"./base/test/assets-manager/assets/test.ttf\") format(\"truetype\")");
    });
  });
  describe("loadBinary()", async () => {
    it("should request a blob and resolve", async (): Promise < Blob > => {
      return assetsManager.loadBinary("./base/test/assets-manager/assets/test");
    });
  });
});