type EventHandler = (...args: any[]) => void;

class EventEmitter {
  private events: Record<string, EventHandler[]> = {};

  on(eventName: string, handler: EventHandler) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(handler);
  }

  off(eventName: string, handler: EventHandler) {
    if (!this.events[eventName]) return;
    
    this.events[eventName] = this.events[eventName].filter(
      (existingHandler) => existingHandler !== handler
    );
  }

  emit(eventName: string, ...args: any[]) {
    if (!this.events[eventName]) return;
    
    this.events[eventName].forEach((handler) => {
      try {
        handler(...args);
      } catch (error) {
        console.error(`[EventEmitter] Error in event handler for ${eventName}:`, error);
      }
    });
  }

  removeAllListeners(eventName?: string) {
    if (eventName) {
      delete this.events[eventName];
    } else {
      this.events = {};
    }
  }
}

const globalEventEmitter = new EventEmitter();

export default globalEventEmitter;