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
    it("should bind", async (): Promise < Blob > => {
      input.bind(Input.KEY.BACKSPACE, "BACKSPACE");
      input.bind(Input.KEY.ENTER, void 0);
      return;
    });
  });
  describe("bindKeys()", async () => {
    it("should bindKeys", async (): Promise < Blob > => {
      input.bindKeys();
      return;
    });
  });
  describe("isPressed()", async () => {
    it("should assert isPressed", async (): Promise < Blob > => {
      input.isPressed("BACKSPACE");
      input.isPressed("ENTER");
      return;
    });
  });
  describe("keydown()", async () => {
    it("should dispatch", async (): Promise < Blob > => {
      var event: any = document.createEvent("Event");
      for(var key of ["8", "13", "11"]){
      event.key = key;
      event.initEvent("keydown");
      document.dispatchEvent(event);
      }
      return;
    });
  });
  describe("isPressed()", async () => {
    it("should assert isPressed", async (): Promise < Blob > => {
      input.isPressed("BACKSPACE");
      input.isPressed("BACKSPACE");
      return;
    });
  });
  describe("keyup()", async () => {
    it("should dispatch", async (): Promise < Blob > => {
      for(var key of ["8", "13", "11"]){
      var event: any = document.createEvent("Event");
      event.key = key;
      event.initEvent("keyup");
      document.dispatchEvent(event);
      }
      return;
    });
  });
  describe("unbindKeys()", async () => {
    it("should unbindKeys", async (): Promise < Blob > => {
      input.unbindKeys();
      return;
    });
  });
});
