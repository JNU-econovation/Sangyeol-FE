class RWindow {
  public RWND_BUFFER: Set<string>;

  private callbackBuffer: Map<string, ((resMessage?: any) => void)[]> =
    new Map();
  private static WINDOW_SIZE = 20;

  constructor() {
    this.RWND_BUFFER = new Set<string>();
  }

  public add(id: string) {
    if (this.RWND_BUFFER.size >= RWindow.WINDOW_SIZE) {
      throw new Error("RWND_BUFFER is already full");
    }

    if (this.RWND_BUFFER.has(id)) {
      throw new Error("RWND_BUFFER already contains this id");
    }

    this.RWND_BUFFER.add(id);
  }

  public popCallbacksById(id: string) {
    this.RWND_BUFFER.delete(id);

    const callbacks = this.callbackBuffer.get(id);

    return callbacks ?? [];
  }

  public clear() {
    this.RWND_BUFFER.clear();
  }

  public addListener<ResMessageType>(
    id: string,
    callback: (resMessage: ResMessageType) => void
  ) {
    if (this.callbackBuffer.has(id)) {
      this.callbackBuffer.set(id, [...this.callbackBuffer.get(id)!, callback]);
      return;
    }
    this.callbackBuffer.set(id, [callback]);
  }

  public getListeners(
    id: string
  ): ((resMessage?: unknown) => void)[] | undefined {
    return this.callbackBuffer.get(id);
  }
}

export default RWindow;
