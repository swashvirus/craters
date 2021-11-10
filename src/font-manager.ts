import Canvas2DRenderer from "./canvas-2d-renderer";
import WebGLRenderer from "./webgl-renderer";
import Tile from "./tile"
class Font {
  fontMap;
  fontAtlas;
  canvas2DRenderer;
  constructor(fontMap: Map < number, {
    x: number,
    y: number,
    width: number,
    height: number,
  } > , fontAtlas) {
    this.fontMap = fontMap;
    this.fontAtlas = fontAtlas;
  }
  draw(text: string, destX: number, destY: number): void {
    var textWidth = 0;
    Array.from(text).forEach((_character) => {
      var charactercode = _character.charCodeAt(0);
      if (this.fontMap.has(charactercode)) {
        var character = this.fontMap.get(charactercode)
        var {
          width,
          height
        } = character;
        this.fontAtlas.draw(character.x, character.y, destX + textWidth, destY, width, height, width, height);
        textWidth += width;
      }
    });
  }
}
export default class FontManager {
  canvas2DRenderer: any;
  fontName: string;
  fill: boolean;
  stroke: boolean;
  fillStyle: string;
  strokeStyle: string;
  constructor(
    canvas2DRenderer: any,
    fontName: string,
    fillStyle: string = "#fafafa",
    strokeStyle: string = "#fafafa",
    fill: boolean = true,
    stroke: boolean = false,
  ) {
    this.canvas2DRenderer = canvas2DRenderer
    this.fontName = fontName
    this.fill = fill
    this.stroke = stroke
    this.fillStyle = fillStyle
    this.strokeStyle = strokeStyle
  }
  load(letters: string) {
    var canvas2DRenderer = new Canvas2DRenderer(0, 0, void 0, 1)
    var context = canvas2DRenderer.context
    context.font = this.fontName;
    var fontMap: Map < number, {
      x: number,
      y: number,
      width: number,
      height: number,
    } > = new Map();
    var height = parseInt(context.font, 10) * 1.2;
    var measurements = Array.from(letters)
      .filter(function(character, index, characters) {
        return characters.indexOf(character) == index;
      })
      .map(function(letter) {
        return {
          letter: letter,
          measurement: context.measureText(letter)
        };
      });
    var width = measurements.map(function(measurement) {
      return measurement.measurement.width;
    }).reduce(function(previous, next) {
      return previous + next;
    });
    canvas2DRenderer.resize(width, height);
    measurements.forEach((measure) => {
      var letter = measure.letter,
        measurement = measure.measurement;
      context.textBaseline = "top";
      context.font = this.fontName;
      context.fillStyle = this.fillStyle;
      var x = (width -= measurement.width),
        y = 0;
      context.fillText(letter, x, y);
      fontMap.set(letter.charCodeAt(0), {
        width: measurement.width,
        height: height,
        x: x,
        y: y
      });
    });
    var fontAtlas = new Tile(this.canvas2DRenderer, canvas2DRenderer.canvasElement, canvas2DRenderer.width, canvas2DRenderer.height, canvas2DRenderer.width, canvas2DRenderer.height)
    return new Font(fontMap, fontAtlas)
  }
}