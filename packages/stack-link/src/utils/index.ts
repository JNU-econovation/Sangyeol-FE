export const isInStackFrame = () => {
  try {
    if (typeof window === "undefined" || !window.self || !window.top) {
      return true;
    }
    return window.self !== window.top;
  } catch (e) {
    console.error("[isInIframe] Error checking if in iframe:", e);
    return true;
  }
};
