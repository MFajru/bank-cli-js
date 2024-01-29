import chalk from "chalk";

function titleText(text) {
  return chalk.bgBlue(text);
}

function subTitleText(text) {
  return chalk.bgMagenta(text);
}

function inputText(text) {
  return chalk.blue(text);
}

function successText(text) {
  return chalk.green(text);
}

function errorText(text) {
  return chalk.red(text);
}

function balanceText(text) {
  return chalk.bgGreen(text);
}

function headerTable(text) {
  return chalk.magenta(text);
}

function loadingText(text) {
  return chalk.yellow(text);
}

export {
  titleText,
  subTitleText,
  inputText,
  successText,
  errorText,
  balanceText,
  headerTable,
  loadingText,
};
