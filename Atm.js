import { successText, errorText } from "./coloredText.js";

class Atm {
  async register(baseUrl, bodyInput) {
    try {
      const response = await fetch(`${baseUrl}/register`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(bodyInput),
      });
      const user = response.json();
      if (!response.ok) {
        let jsonUser = await user;
        let strError = "";
        for (let detail of jsonUser.error.details.errors) {
          strError += ` ${detail.path} must be unique`;
        }
        throw new Error(`${strError}.`);
      }
      console.log(successText("Register Success"));
      return user;
    } catch (error) {
      console.error(`Oops something wrong:${errorText(error.message)}`);
    }
  }

  async login(baseUrl, bodyInput) {
    try {
      const response = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(bodyInput),
      });
      if (!response.ok) {
        throw new Error("Login Failed. Wrong username or password");
      }
      const user = response.json();
      console.log(successText("Login Success"));
      return user;
    } catch (error) {
      console.error(`Oops something wrong: ${errorText(error.message)}`);
    }
  }
}

export default Atm;
