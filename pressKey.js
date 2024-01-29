async function pressKey(message) {
  console.log(message);
  return new Promise((resolve) => {
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.once("data", () => {
      process.stdin.pause();
      process.stdin.setRawMode(false);
      resolve();
    });
  });
}

export default pressKey;
