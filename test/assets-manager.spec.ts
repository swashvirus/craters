import AssetsManager from "../src/assets-manager";
import chai from "chai";
var should = chai.should();
var assetsManager;
describe("AssetsManager", function () {
  before("prepare assetsManager instance", function () {
    assetsManager = new AssetsManager();
  });
  after("destroy assetsManager instance", function () {
    // delete assetsManager;
  });
  describe("loadText()", async () => {
    it("Should request text file and resolve", async (): Promise < string > => {
      return assetsManager.loadText("./base/test/assets-manager/assets/test.txt")
      .then(function (text) {
        text.should.equal("test")
      });
    });
  });
  describe("loadJson()", async () => {
    it("Should request json file and resolve", async (): Promise < any > => {
      return assetsManager.loadJson("./base/test/assets-manager/assets/test.json")
      .then(function (json) {
        json.test.should.equal(true)
      });
    });
  });
  describe("loadImage()", async () => {
    it("Should request an image and resolve", async (): Promise < HTMLImageElement > => {
      return assetsManager.loadImage("./base/test/assets-manager/assets/test.png");
    });
  });
  describe("loadFont()", async () => {
    it("Should request a font and resolve", async (): Promise < FontFace > => {
      return assetsManager.loadFont("Test", "url(\"./base/test/assets-manager/assets/test.ttf\") format(\"truetype\")");
    });
  });
  describe("loadBinary()", async () => {
    it("Should request a blob and resolve", async (): Promise < Blob > => {
      return assetsManager.loadBinary("./base/test/assets-manager/assets/test");
    });
  });
});