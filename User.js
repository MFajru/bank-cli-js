import { successText, errorText } from "./coloredText.js";

class User {
  constructor(id) {
    this.id = id;
  }

  async checkBalance(baseUrl) {
    try {
      const response = await fetch(`${baseUrl}/balance/${this.id}`);
      if (!response.ok) {
        throw new Error(`${response.statusText}`);
      }
      const balance = await response.json();
      return balance.data;
    } catch (error) {
      console.error(`Oops something wrong: ${errorText(error.message)}`);
    }
  }

  async transactions(baseUrl, debitBody, successMess) {
    try {
      const response = await fetch(`${baseUrl}/transactions`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(debitBody),
      });
      const transaction = response.json();
      if (!response.ok) {
        const transactionJson = await transaction;
        const transactionError = transactionJson.error;
        throw new Error(
          `${transactionError.status} ${transactionError.error}, ${transactionError.message}`
        );
      }
      console.log(successText(successMess));
      return transaction;
    } catch (error) {
      console.error(`Oops something wrong: ${errorText(error.message)}`);
    }
  }

  async checkMutation(baseUrl, order, type) {
    try {
      const response = await fetch(
        `${baseUrl}/mutation/${this.id}?sort=${order}&filter=${type}`
      );
      const mutation = response.json();
      if (!response.ok) {
        const mutationJson = await mutation;
        const mutationError = mutationJson.error;
        throw new Error(
          `${mutationError.status} ${mutationError.error}, ${mutationError.message}`
        );
      }
      return mutation;
    } catch (error) {
      console.error(`Oops something wrong: ${errorText(error.message)}`);
    }
  }
}

export default User;
