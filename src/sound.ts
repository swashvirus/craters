class Sound {
  private audioContext: AudioContext;
  private source: AudioBufferSourceNode;
  private gainNode: GainNode;
  constructor(audioContext: AudioContext, decodeAudioData: AudioBuffer) {
    const source = audioContext.createBufferSource();
    source.buffer = decodeAudioData;
    const gainNode = audioContext.createGain();
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    this.source = source;
    this.gainNode = gainNode;
  }
  public play(): void {
    this.source.start();
  }
  public pause(): void {}
  public resume(): void {}
  public getVolume(): number {
    return this.gainNode.gain.value
  }
  public setVolume(value) {
    this.gainNode.gain.value = value
  }
  public stop(): void {
    this.source.stop();
  }
}
export default class SoundManager {
  audioContext: AudioContext;
  constructor() {
    this.audioContext = new AudioContext();
    this.unlockAudioContext()
  }
  unlockAudioContext() {
    if (this.audioContext.state !== "suspended") return;
    const unlockAudioContext = () => {
      document.removeEventListener("touchstart", unlockAudioContext, false);
      document.removeEventListener("mousedown", unlockAudioContext, false);
      document.removeEventListener("keydown", unlockAudioContext, false);
      this.audioContext.resume();
    }
    document.addEventListener("touchstart", unlockAudioContext, false);
    document.addEventListener("mousedown", unlockAudioContext, false);
    document.addEventListener("keydown", unlockAudioContext, false);
  }
  load(resource: string) {
    const request: Request = new Request(resource)
    return fetch(request).then(function (response: Response) {
      return response.arrayBuffer();
    }).then((buffer: ArrayBuffer) => {
      return new Promise((resolve) => {
        this.audioContext.decodeAudioData(buffer, (decodeAudioData: AudioBuffer) => {
          resolve(new Sound(this.audioContext, decodeAudioData))
        })
      })
    });
  }
}