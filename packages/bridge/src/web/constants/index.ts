const ISN = Math.floor(Math.random() * 1000000); // Initial Sequence Number
const TIMEOUT = 1000;
const SET = 1; // Set Flag
const RESET = 0; // Acknowledgment Flag
const BLANK = null; // Empty String

const BRIDGE = Object.freeze({
  ISN,
  TIMEOUT,
  SET,
  RESET,
  BLANK,
});

export default BRIDGE;
