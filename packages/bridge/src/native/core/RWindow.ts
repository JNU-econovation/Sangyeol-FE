class RWindow {
  // TODO: 단순 id를 담는 것이 아닌 객체로 변경 고려 (메시지 body를 제외한 모든 정보 담기)
  public RWND_BUFFER: Set<string>;

  //TODO: WeakMap으로 변경 고려 => RWND_BUFFER에서 객체를 제거하면 GC가 콜백도 제거해줄 것임
  private callbackBuffer: Map<string, ((resMessage?: any) => void)[]> =
    new Map();
  private static WINDOW_SIZE = 20;

  constructor() {
    this.RWND_BUFFER = new Set<string>();
  }

  // id 추가
  public add(id: string) {
    if (this.RWND_BUFFER.size >= RWindow.WINDOW_SIZE) {
      throw new Error("RWND_BUFFER is already full");
    }

    if (this.RWND_BUFFER.has(id)) {
      throw new Error("RWND_BUFFER already contains this id");
    }

    this.RWND_BUFFER.add(id);
  }

  // id에 해당하는 콜백들 제거 및 반환
  public popCallbacksById(id: string) {
    this.RWND_BUFFER.delete(id);

    const callbacks = this.callbackBuffer.get(id);
    this.callbackBuffer.delete(id);

    return callbacks ?? [];
  }

  // 버퍼 초기화
  public clear() {
    this.RWND_BUFFER.clear();
    this.callbackBuffer.clear();
  }

  // id에 콜백 추가
  public addListener<ResMessageType>(
    id: string,
    callback: (resMessage: ResMessageType) => void,
  ) {
    if (this.callbackBuffer.has(id)) {
      this.callbackBuffer.set(id, [...this.callbackBuffer.get(id)!, callback]);
      return;
    }
    this.callbackBuffer.set(id, [callback]);
  }

  // id에 해당하는 콜백들 반환
  public getListeners(
    id: string,
  ): ((resMessage?: unknown) => void)[] | undefined {
    return this.callbackBuffer.get(id);
  }
}

export default RWindow;
