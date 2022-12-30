export const executeEveryNFrames = (n, i, callback) => {
  if (i % n === 0) {
    callback();
  }
};
