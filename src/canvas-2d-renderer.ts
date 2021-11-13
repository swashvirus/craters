export default class Canvas2DRenderer {
  public devicePixelRatio: number;
  public canvasElement: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;
  public width: number;
  public height: number;
  constructor(width: number, height: number, options ? : any, devicePixelRatio = window.devicePixelRatio) {
    this.width = width;
    this.height = height;
    this.canvasElement = document.createElement("canvas", options);
    this.context = this.canvasElement.getContext("2d") !;
    this.devicePixelRatio = devicePixelRatio;
    this.canvasElement.style.width = width + "px";
    this.canvasElement.style.height = height + "px";
    this.canvasElement.width = Math.round(width * devicePixelRatio);
    this.canvasElement.height = Math.round(height * devicePixelRatio);
    this.context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  }
  public createImage(image: any): any {
    return image;
  }
  public drawImage(
    image: any,
    sx: number = 0,
    sy: number = 0,
    sWidth: number = image.width,
    sHeight: number = image.height,
    dx: number = 0,
    dy: number = 0,
    dWidth: number = image.width,
    dHeight: number = image.height
  ): void {
    this.context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) !;
  }
  public clear(v ? : string, w: number = 0, x: number = 0, y: number = this.width, z: number = this.height): void {
    if (v) {
      this.context.save();
      this.context.fillStyle = v;
      this.context.fillRect(w, x, y, z);
      this.context.restore();
    } else {
      this.context.clearRect(w, x, y, z);
    }
  }
  public resize(width: number = this.width, height: number = this.height, devicePixelRatio: number = this.devicePixelRatio): void {
    this.width = width;
    this.height = height;
    this.devicePixelRatio = devicePixelRatio;
    this.canvasElement.style.width = width + "px";
    this.canvasElement.style.height = height + "px";
    this.canvasElement.width = Math.round(width * devicePixelRatio);
    this.canvasElement.height = Math.round(height * devicePixelRatio);
    this.context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  }
};