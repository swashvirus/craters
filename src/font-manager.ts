import Canvas2DRenderer from "./canvas-2d-renderer";
import WebGLRenderer from "./webgl-renderer";
import Tile from "./tile"
class Font {
  fontMap;
  canvas2DRenderer;
  constructor(fontMap: Map < number, {
    x: number,
    y: number,
    width: number,
    height: number,
    font: Tile
  } > ) {
    this.fontMap = fontMap;
  }
  draw(text: string, destX: number, destY: number): void {
    var textWidth = 0;
    Array.from(text).forEach((_character) => {
      var charactercode = _character.charCodeAt(0);
      if (this.fontMap.has(charactercode)) {
        var character = this.fontMap.get(charactercode)
        var width = character.width;
        character.font.draw(character.x, character.y, destX + textWidth, destY);
        textWidth += width;
      }
    });
  }
}
export default class FontManager {
  canvas2DRenderer: Canvas2DRenderer
  fontName: string;
  fill: boolean;
  stroke: boolean;
  fillStyle: string;
  strokeStyle: string;
  constructor(
    canvas2DRenderer: Canvas2DRenderer,
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
    var canvas2DRenderer = new Canvas2DRenderer(0, 0)
    var context = canvas2DRenderer.context
    context.font = this.fontName;
    var fontMap: Map < number, {
      x: number,
      y: number,
      width: number,
      height: number,
      font: Tile
    } > = new Map();
    var height = parseInt(context.font, 10) * 1.2;
    var measurements = Array.from(letters)
    .map(function (letter) {
      return {
        letter: letter,
        measurement: context.measureText(letter)
      };
    });
    var width = measurements.map(function (measurement) {
      return measurement.measurement.width;
    }).reduce(function (previous, next) { return previous + next; });
    canvas2DRenderer.resize(width, height, 1);
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
        font: new Tile(this.canvas2DRenderer, canvas2DRenderer.canvasElement, measurement.width, height, measurement.width, height),
        width: measurement.width,
        height: height,
        x: x,
        y: y
      });
    });
    return new Font(fontMap)
  }
}