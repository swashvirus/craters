export default class RenderLoop {
  index: number;
  delta: number;
  elapsed: number;
  frameRate: number;
  frameRatio: number;
  current: number;
  previous: number;
  execute: any;
  constructor(execute: any, frameRate: number = 60) {
    this.index = 0;
    this.delta = 0;
    this.elapsed = 0;
    this.frameRate = frameRate;
    this.frameRatio = 1000 / frameRate;
    this.current = 0;
    this.previous = window.performance.now();
    this.execute = execute;
    this.start()
  }
  public start(): void {
    const start = () => {
      this.index = requestAnimationFrame(start);
      this.current = window.performance.now();
      this.delta = this.current - this.previous;
      this.elapsed += this.delta;
      if (this.current < this.previous + this.frameRatio)
        return;
      this.previous = this.current;
      this.execute(this);
    }
    start()
  }
  public stop(): void {
    cancelAnimationFrame(this.index);
  }
};