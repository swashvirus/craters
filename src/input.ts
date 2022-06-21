export default class Input {
  public static KEY: {
    [key: string]: string
  } = {
    BREAK: "3",
    BACKSPACE: "8",
    TAB: "9",
    CLEAR: "12",
    ENTER: "13",
    SHIFT: "16",
    CTRL: "17",
    ALT: "18",
    PAUSE: "19",
    CAPS_LOCK: "20",
    SPACEBAR: "32",
    PAGE_UP: "33",
    PAGE_DOWN: "34",
    LEFT_ARROW: "37",
    UP_ARROW: "38",
    RIGHT_ARROW: "39",
    DOWN_ARROW: "40",
    HELP: "47",
    ZERO: "48",
    ONE: "49",
    TWO: "50",
    THREE: "51",
    FOUR: "52",
    FIVE: "53",
    SIX: "54",
    SEVEN: "55",
    EIGHT: "56",
    NINE: "57",
    A: "65",
    B: "66",
    C: "67",
    D: "68",
    E: "69",
    F: "70",
    G: "71",
    H: "72",
    I: "73",
    J: "74",
    K: "75",
    L: "76",
    M: "77",
    N: "78",
    O: "79",
    P: "80",
    Q: "81",
    R: "82",
    S: "83",
    T: "84",
    U: "85",
    V: "86",
    W: "87",
    X: "88",
    Y: "89",
    Z: "90",
    NUMPAD_ZERO: "96",
    NUMPAD_ONE: "97",
    NUMPAD_TWO: "98",
    NUMPAD_THREE: "99",
    NUMPAD_FOUR: "100",
    NUMPAD_FIVE: "101",
    NUMPAD_SIX: "102",
    NUMPAD_SEVEN: "103",
    NUMPAD_EIGHT: "104",
    NUMPAD_NINE: "105",
    F1: "112",
    F2: "113",
    F3: "114",
    F4: "115",
    F5: "116",
    F6: "117",
    F7: "118",
    F8: "119",
    F9: "120",
    F10: "121",
    F11: "122",
    F12: "123",
    F13: "124",
    F14: "125",
    F15: "126",
    F16: "127",
    F17: "128",
    F18: "129",
    F19: "130",
    F20: "131",
    F21: "132",
    F22: "133",
    F23: "134",
    F24: "135",
    F25: "136",
    F26: "137",
    F27: "138",
    F28: "139",
    F29: "140",
    F30: "141",
    F31: "142",
    F32: "143",
    DECREASE_VOLUME: "174",
    INCREASE_VOLUME: "175",
    NEXT: "176",
    PREVIOUS: "177",
    STOP: "178",
    PLAY_PAUSE: "179"
  }
  private bindings: Map < string, string > = new Map();
  private pressed: Map < string, number > = new Map();
  public constructor() {
    this.bindKeys();
  }
  public bind(key: string, action: string): void {
    this.bindings.set(key, action);
    this.pressed.set(action, 0);
  }
  public bindKeys(): void {
    document.addEventListener("keyup", this.keyup.bind(this), false);
    document.addEventListener("keydown", this.keydown.bind(this), false);
  }
  public unbindKeys(): void {
    document.removeEventListener("keyup", this.keyup.bind(this), false);
    document.removeEventListener("keydown", this.keydown.bind(this), false);
  }
  private keyup(event: KeyboardEvent): void {
    var key = event.key;
    if (this.bindings.has(key)) {
      var action = this.bindings.get(key);
      this.pressed.set(action, 0);
    }
  }
  private keydown(event: KeyboardEvent): void {
    var key = event.key;
    if (this.bindings.has(key)) {
      var action = this.bindings.get(key);
      this.pressed.set(action, 2);
    }
  }
  public isPressed(action: string): number {
    if (this.pressed.has(action)) {
      var pressed = this.pressed.get(action);
      if (pressed) {
        if (pressed === 2)
          this.pressed.set(action, 1);
        return pressed;
      }
    }
    return 0;
  }
}