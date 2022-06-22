import chai from "chai";
import Input from "../src/input";
var should = chai.should();
describe("Input", function() {
  var input: Input;
  before("prepare input instance", function() {
    input = new Input();
  });
  after("destroy input instance", function() {
    // delete input;
  });
  describe("bind()", async () => {
    it("should bind", async (): Promise < void > => {
      input.bind(Input.KEY.BACKSPACE, "BACKSPACE");
      input.bind(Input.KEY.ENTER, void 0);
    });
  });
  describe("bindKeys()", async () => {
    it("should bindKeys", async (): Promise < void > => {
      input.bindKeys();
    });
  });
  describe("isPressed()", async () => {
    it("should assert isPressed", async (): Promise < void > => {
      input.isPressed("BACKSPACE");
      input.isPressed("ENTER");
    });
  });
  describe("keydown()", async () => {
    it("should dispatch", async (): Promise < void > => {
      var event: any = document.createEvent("Event");
      ["8", "13", "11"].forEach((key) => {
        event.key = key;
        event.initEvent("keydown");
        document.dispatchEvent(event);
      })
    });
  });
  describe("isPressed()", async () => {
    it("should assert isPressed", async (): Promise < void > => {
      input.isPressed("BACKSPACE");
      input.isPressed("BACKSPACE");
    });
  });
  describe("keyup()", async () => {
    it("should dispatch", async (): Promise < void > => {
      ["8", "13", "11"].forEach((key) => {
        var event: any = document.createEvent("Event");
        event.key = key;
        event.initEvent("keyup");
        document.dispatchEvent(event);
      })
    });
  });
  describe("unbindKeys()", async () => {
    it("should unbindKeys", async (): Promise < void > => {
      input.unbindKeys();
    });
  });
});