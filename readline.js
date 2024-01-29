import { createInterface } from "readline/promises";
import { inputText } from "./coloredText.js";

async function prompt(question) {
  const readline = createInterface(process.stdin, process.stdout);
  const answer = await readline.question(inputText(question));
  readline.close();

  return answer;
}

export default prompt;
