import User from "./User.js";

import prompt from "./readline.js";

async function userMutation(baseUrl, user) {
  let j = 0;
  while (j === 0) {
    console.clear();
    // let mutationInput = await prompt("Input: ");
    // mutationInput = mutationInput.split(" ");\
    let mutationInput = ["DEBIT", "asc"];
    const type = mutationInput[0];
    const order = mutationInput[1];
    if (isValidMutation(order, type)) {
      const tableHeading = ["Date", "Type", "Nominal"];
      const mutation = await user.checkMutation(baseUrl, order, type);
      console.clear();
      console.log("foo");
      console.log(printTable(tableHeading, mutation));
      j = 1;
    }
    await pressKey("Press any key to continue...");
  }
}

function isValidMutation(orderInput, typeInput) {
  const order = ["asc", "desc"];
  const type = ["DEBIT", "CREDIT", "ALL"];

  if (!order.includes(orderInput)) {
    console.log(
      `Error message: Order must be 'asc' (ascending) or 'desc' (descending)`
    );
    return false;
  }
  if (!type.includes(typeInput)) {
    console.log(`Error message: Type must be 'CREDIT', 'DEBIT', or 'ALL'`);
    return false;
  }
  return true;
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

const baseUrl = "http://localhost:1337/api";
const user = new User(4);

userMutation(baseUrl, user);
