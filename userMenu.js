import { table } from "table";
import prompt from "./readline.js";
import pressKey from "./pressKey.js";
import {
  titleText,
  subTitleText,
  errorText,
  balanceText,
  headerTable,
} from "./coloredText.js";
import loading from "./loading.js";

const menuCheckBalance = "1";
const menuDebit = "2";
const menuCredit = "3";
const menuCheckMutation = "4";
const menuExit = "5";
const transaction50 = "1";
const transaction100 = "2";
const errorHeader = "Error message:";

function formatBalancetoRupiah(balance) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(balance);
}

async function userMenu(baseUrl, user) {
  let i = 0;
  while (i === 0) {
    console.clear();
    console.log(titleText("Welcome to DIGI ATM"));
    console.log("Menu:");
    console.log("1. Check Balance");
    console.log("2. Debit");
    console.log("3. Credit");
    console.log("4. Check Mutation");
    console.log("5. Exit/Logout");
    const menu = await prompt("Input: ");
    let transactionType = "";
    switch (menu) {
      case menuCheckBalance:
        console.clear();
        let data = await user.checkBalance(baseUrl);
        let balanceRupiah = formatBalancetoRupiah(data.balance);
        console.log(subTitleText("Check Balance"));
        console.log(`Your balance is ${balanceText(balanceRupiah)}`);
        await pressKey("Press any key to back...");
        break;
      case menuDebit:
        transactionType = menuDebit;
        await userTransaction(baseUrl, user, transactionType);
        break;
      case menuCredit:
        transactionType = menuCredit;
        await userTransaction(baseUrl, user, transactionType);
        break;
      case menuCheckMutation:
        await userMutation(baseUrl, user);
        break;
      case menuExit:
        i = 1;
        break;
      default:
        console.log(`${errorHeader} ${errorText("Invalid menu input")}`);
        await pressKey("Press any key to back...");
        break;
    }
  }
}

async function isValidTransaction(
  user,
  nominal,
  baseUrl,
  nominalTemplate,
  transactionType
) {
  if (nominal === "") {
    console.log(`${errorHeader} ${errorText("Input can't be empty.")}`);
    return false;
  }

  const data = await user.checkBalance(baseUrl);
  if (data.balance < nominal && transactionType === menuDebit) {
    console.log(`${errorHeader} ${errorText("Your balance is not enough")}`);
    return false;
  }

  if (nominal < 0) {
    console.log(`${errorHeader} ${errorText("Amount cannot be negative")}`);
    return false;
  }

  if (nominal % nominalTemplate !== 0) {
    console.log(
      `${errorHeader} ${errorText(
        `Amount must be the multiples of ${formatBalancetoRupiah(
          nominalTemplate
        )}`
      )}`
    );
    return false;
  }
  return true;
}

function isValidMutation(orderInput, typeInput) {
  const order = ["asc", "desc"];
  const type = ["DEBIT", "CREDIT", "ALL"];

  if (!order.includes(orderInput)) {
    console.log(
      `${errorHeader} ${errorText(
        `Order must be 'asc' (ascending) or 'desc' (descending)`
      )}`
    );
    return false;
  }
  if (!type.includes(typeInput)) {
    console.log(
      `${errorHeader} ${errorText(`Type must be 'CREDIT', 'DEBIT', or 'ALL'`)}`
    );
    return false;
  }
  return true;
}

async function userTransaction(baseUrl, user, transactionType) {
  let transactionData = {
    data: {
      amount: "",
      userId: user.id,
    },
  };
  let i = 0;
  let nominalTemplate = 0;
  while (i === 0) {
    console.clear();
    console.log(subTitleText("Choose nominal:"));
    console.log(`1. Rp. 50.000,00\n2. Rp. 100.000,00`);
    const chooseNominal = await prompt("Input: ");

    switch (chooseNominal) {
      case transaction50:
        nominalTemplate = 50000;
        i = 1;
        break;
      case transaction100:
        nominalTemplate = 100000;
        i = 1;
        break;
      default:
        console.log(
          `${errorHeader} ${errorText("Invalid menu input (Choose 1 or 2).")}`
        );
        await pressKey("Press any key to continue...");
        break;
    }
  }
  let j = 0;
  let successMess = "";
  while (j === 0) {
    let transactionNominal = 0;
    console.clear();
    transactionNominal = await prompt("Input: ");
    if (
      await isValidTransaction(
        user,
        transactionNominal,
        baseUrl,
        nominalTemplate,
        transactionType
      )
    ) {
      if (transactionType === menuDebit) {
        transactionData.data.amount = 0 - transactionNominal;
        successMess = "Debit success";
      } else if (transactionType === menuCredit) {
        transactionData.data.amount = parseInt(transactionNominal);
        successMess = "Credit success";
      }
      await user.transactions(baseUrl, transactionData, successMess);
      j = 1;
    }
    await pressKey("Press any key to continue...");
  }
}

function createTableObject(mutationData) {
  const date = new Date(mutationData.createdAt);
  const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
  const month = new Intl.DateTimeFormat("en", { month: "numeric" }).format(
    date
  );
  const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
  const formattedDate = `${day}-${month}-${year}`;
  const newObject = {
    date: formattedDate,
    type: mutationData.type,
    amount: Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(Math.abs(mutationData.amount)),
  };

  return newObject;
}

function printTable(heading, mutation) {
  let tableArr = [];
  tableArr.push(heading);
  for (let transaction of mutation.data.transactionList) {
    let mutationArr = [];
    const newObject = createTableObject(transaction);
    for (let key in newObject) {
      mutationArr.push(newObject[key]);
    }
    tableArr.push(mutationArr);
  }
  return table(tableArr);
}

async function userMutation(baseUrl, user) {
  let j = 0;
  while (j === 0) {
    console.clear();
    let mutationInput = await prompt("Input: ");
    mutationInput = mutationInput.split(" ");
    const type = mutationInput[0];
    const order = mutationInput[1];
    if (isValidMutation(order, type)) {
      const tableHeading = [
        headerTable("Date"),
        headerTable("Type"),
        headerTable("Nominal"),
      ];
      await loading("Loading...");
      const mutation = await user.checkMutation(baseUrl, order, type);
      console.clear();
      console.log(printTable(tableHeading, mutation));
      j = 1;
    }
    await pressKey("Press any key to continue...");
  }
}

export default userMenu;
