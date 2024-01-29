import { loadingText } from "./coloredText.js";
import ora from "ora";

function loading(message) {
  return new Promise((resolve) => {
    const spinner = ora({
      text: loadingText(message),
      color: "yellow",
    });
    spinner.start();
    setTimeout(() => {
      spinner.stop();
      resolve();
    }, 1000);
  });
}

export default loading;
