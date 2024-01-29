import Atm from "./Atm.js";
import isValidAccountNumber from "./luhnAlgorithm.js";
import userMenu from "./userMenu.js";
import User from "./User.js";
import pressKey from "./pressKey.js";
import prompt from "./readline.js";
import { titleText, subTitleText, errorText } from "./coloredText.js";
import loading from "./loading.js";

const registerMenu = "1";
const loginMenu = "2";
const exitProgram = "3";c
const atm = new Atm();
const errorMessage = {
  username: "Username should no longer than 10 characters",
  account_number: "Account number is not valid",
  pin: "Pin must contain 6 digit numbers",
};
const errorHeader = "Error message:";

async function authMenu(baseUrl) {
  let i = 0;
  while (i === 0) {
    console.clear();
    console.log(titleText("Welcome to DIGI ATM"));
    console.log("Menu:");
    console.log("1. Register\n2. Login\n3. Exit");
    const input = await prompt("Input: ");
    switch (input) {
      case registerMenu:
        await registerUser(baseUrl);
        break;
      case loginMenu:
        await userLogin(baseUrl);
        break;
      case exitProgram:
        i = 1;
        break;
      default:
        console.log(`${errorHeader} ${errorText("Invalid menu input")}`);
        await pressKey("Press any key to continue...");
        break;
    }
  }
}

async function registerUser(baseUrl) {
  const questions = ["Username", "Account Number", "Pin"];
  let body = {
    data: {
      username: "",
      account_number: "",
      pin: "",
    },
  };

  for (let question of questions) {
    console.clear();
    const bodyKey = question.replace(" ", "_").toLowerCase();
    let bodyInput;
    let i = 0;
    while (i === 0) {
      console.log(subTitleText("Register"));
      bodyInput = await prompt(`${question}: `);
      if (question === "Username" && bodyInput.length <= 10) {
        i = 1;
      } else if (
        question === "Account Number" &&
        isValidAccountNumber(bodyInput)
      ) {
        i = 1;
      } else if (
        question === "Pin" &&
        bodyInput.length === 6 &&
        Number.isInteger(parseInt(bodyInput))
      ) {
        i = 1;
      } else {
        console.log(`${errorHeader} ${errorText(errorMessage[bodyKey])}`);
        await pressKey("Press any key to continue...");
        console.clear();
      }
    }
    body.data[bodyKey] = bodyInput;
  }
  await loading("Loading...");
  const user = await atm.register(baseUrl, body);
  user;
  await pressKey("Press any key to continue...");
}

async function userLogin(baseUrl) {
  let loginInput = {
    data: {
      username: "Username",
      pin: "Pin",
    },
  };

  for (let key in loginInput.data) {
    const question = loginInput.data[key];
    let i = 0;
    let userInput;
    while (i === 0) {
      console.clear();
      console.log(subTitleText("Login"));
      userInput = await prompt(`${question}: `);
      if (question === "Username" && userInput.length <= 10) {
        i = 1;
      } else if (
        question === "Pin" &&
        userInput.length === 6 &&
        Number.isInteger(parseInt(userInput))
      ) {
        i = 1;
      } else {
        console.log(`${errorHeader} ${errorText(errorMessage[key])}`);
        await pressKey("Press any key to continue...");
      }
    }
    loginInput.data[key] = userInput;
  }
  const userData = await atm.login(baseUrl, loginInput);
  if (userData) {
    const user = new User(userData.id);
    await userMenu(baseUrl, user);
  } else {
    await pressKey("Press any key to continue...");
  }
}

export default authMenu;
