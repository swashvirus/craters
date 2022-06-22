import chai from "chai";
import SoundManager from "../src/sound";
var should = chai.should();
describe("SoundManager", function() {
  var sound: SoundManager;
  before("prepare sound instance", function() {
    sound = new SoundManager();
  });
  after("destroy sound instance", function() {
    // delete sound;
  });
  describe("()", async () => {
    it("should", async (): Promise < Blob > => {
      return;
    });
  });
});