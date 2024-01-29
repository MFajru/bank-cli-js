# Assignment 1 JavaScript

## Online ATM CLI (Command Line Interface)

To create a CLI app that mimics the functionalities of an Automated Teller Machine (ATM). Users should be able to login, register, credit (deposit) money, debit (withdraw) money, and see account mutations (transaction history).

## Objectives

- Using input/output console
- Able to implement OOP in JavaScript
- Able to implement Asynchronous javascirpt
- Able to fetch API resource with JavaScript
- Able to implement and model JavaScript with real case scenario

**Notes** :

- Do frequent commit
- Endpoint will be served with Strapi
- You may use chalk.js library to make your CLI colorful
- You may use table.js library to create table

## Prerequisites

- Clone [strapi-api]() repo and
- `cd` to repo
- Run `npm install`
- Run `npm start`

## List endpoint

#### 1. Login

<details>
 <summary><code>POST</code> <code><b>/api/login</b></code></summary>

##### Body

```
{
    "data":{
        "username":"daniel",
        "pin":"123456"
    }
}
```

</details>

#### 2. Register

<details>
 <summary><code>POST</code> <code><b>/api/register</b></code></summary>

##### Body

```
{
   "data":{
        "username": "tandry",
        "pin": "123456",
        "account_number":"371449635398431"
    }
}
```

</details>

#### 3. Debit

<details>
 <summary><code>POST</code> <code><b>/api/transactions</b></code></summary>

##### Body

```json
{
  "data": {
    "amount": -26000,
    "userId": 1
  }
}
```

</details>

#### 4. CREDIT

<details>
 <summary><code>POST</code> <code><b>/api/transactions</b></code></summary>

##### Body

```json
{
  "data": {
    "amount": 20000,
    "userId": 1
  }
}
```

</details>

#### 5. Balance

<details>
 <summary><code>GET</code> <code><b>/api/balance/:userId</b></code></summary>

| Parameter | Value  |
| --------- | ------ |
| UserId    | number |

</details>

#### 5. Mutation

<details>
 <summary><code>GET</code> <code><b>/api/mutation/:userId?sort=[ORDER]&filter=[TYPE]</b></code></summary>

| Parameter | Value              |
| --------- | ------------------ |
| Order     | ["asc","desc"]     |
| Type      | ["CREDIT","DEBIT"] |
| UserId    | number             |

</details>

### General Requirement

- Running `npm start` will start your app
- All input and output should follow the required format and sentence. **Violating this rule will affect your completion**
- Wrong number input on menu or wrong format should give error
- If the user input a number thats not in the menu, or the input is not a valid number, give output `Error message: Invalid menu input` and show the menu (and ask for input) again
- If you wish to add delay between process, don't add more than 2 seconds in total.
- If you wish to add loading (e.g. when fetching the backend), don't clear the previous output or add another steps. Example when register:
  - Example of bad flow
  ```sh
    Register
    Pin: 13331
  ```
  ```sh
    Loading...
  ```
  ```sh
    Welcome to DIGI ATM
    Menu:
    1. Register
    2. Login
    Input:
  ```
  - Example of accepted flow
  ```sh
    Register
    Pin: 13331
    Loading...
  ```
  ```sh
    Welcome to DIGI ATM
    Menu:
    1. Register
    2. Login
    Input:
  ``
  ```

### Story 1

User able to login and register in the CLI App.

#### Part 1 Register

```sh
    Welcome to DIGI ATM
    Menu:
    1. Register
    2. Login
    Input:
```

When user input `1`

```sh
    Register
    Username:
```

```sh
    Register
    Account number:
```

```sh
    Register
    Pin:
```

##### Requirement:

- Username max length is 10 ($error_message = Username should no longer than 10 characters)
- Pin is numbers with 6 digit ($error_message = Pin must contain 6 digit numbers)
- Account number should be validate with [luhn algortihm](https://en.wikipedia.org/wiki/Luhn_algorithm) ($error_message = Account number is not valid)
- Example validated: [card number](https://developer.paypal.com/tools/sandbox/card-testing/)

##### Negative cases:

- If user input doesn't match with the requirements or edge cases, show errors with this ordered ways:

  1. Show some error messsage with this template

  ```sh
  Error message: $error_message
  Press any key to continue...
  ```

  2.  Pressing any key
  3.  Clear the terminal
  4.  Repeat the input prompt (e.g. asking to input username again)

- If the error comes from the server, network or some error logic, show error with this ordered ways:

  1.  Show some error messsage with this template:

  ```sh
  Oops something wrong: $error_message
  Press any key to continue...
  ```

  2.  Pressing any key
  3.  Clear the terminal
  4.  Back to auth menu

**Note**: Some error message might have 2 details (or errors) that you must merge the error into one string

##### Positive Cases :

- If success back to auth menu :

```sh
    Welcome to DIGI ATM
    Menu:
    1. Register
    2. Login
    Input:
```

#### Part 2 Login

```sh
    Welcome to DIGI ATM
    Menu:
    1. Register
    2. Login
    Input:
```

When user input `2`

```sh
    Login
    Username:
```

```sh
    Login
    Pin:
```

##### Negative cases:

- If user input doesn't match with the requirements or edge cases, show errors with this ordered ways:

  1.  Show some error messsage with this template

  ```sh
  Error message: $error_message
  Press any key to continue...
  ```

  2.  Pressing any key
  3.  Clear the terminal
  4.  Repeat the input prompt (e.g. asking to input username again)

- If the error comes from the server, network, or some error logic, show errors with this ordered ways:

  1.  Show some error messsage with this template

  ```sh
  Oops something wrong: $error_message
  Press any key to continue...
  ```

  2.  Pressing any key
  3.  Clear the terminal
  4.  Back to auth menu

**Note**: Some error message might have 2 details (or errors) that you must merge the error into one string

#### Positive cases :

If success enter to the main menu

### Story 2

User able to see main menu and check their balance

#### Part 1 Main Menu

Main menu

```sh
    Welcome to DIGI ATM
    Menu:
    1. Check Balance
    2. Debit
    3. Credit
    4. Check mutation
    5. Exit
    Input:
```

#### Part 2 Check balance

If user input `1`

Fetch data from API

##### Negative cases:

- If the error comes from the server, network, or some error logic, show errors with this ordered ways:

  1.  Show some error messsage with this template

  ```sh
  Oops something wrong: $error_message
  Press any key to continue...
  ```

  2.  Pressing any key
  3.  Clear the terminal
  4.  Back to main menu

##### Positive cases :

Show output like this:

```sh
Check balance
Your balance is Rp. 100.000,00
Press any key to back...
```

### Story 3

User able to Debit their money

Example:

```sh
Welcome to DIGI ATM
Menu:
1. Check Balance
2. Debit
3. Credit
4. Check mutation
5. Exit
Input: 2
```

```sh
Choose nominal:
1. Rp. 50.000,00
2. Rp. 100.000,00
Input:
```

```sh
Debit
Input:
```

Requirement:

- Debit amount must be less than the user remaining balance ($error_message = Your balance is not enough)
- Validate negative amount ($error_message = Amount cannot be negative)
- Input base on nominal and its multiples. For example if the user choose 50.000 nominal, debit amount input should be 50.000 in minimum or the multiples of 50.000, e.g. 250.000 ($error_message = Amount must be the multiples of Rp. XX.000,00)

##### Negative cases:

- If the user input doesn't match with the requirements or edge cases, show errors with this ordered ways:

  1.  Show some error messsage with this template

  ```sh
  Error message: $error_message
  Press any key to continue...
  ```

  2.  Pressing any key
  3.  Clear the terminal
  4.  Repeat the input

- If the error comes from the server, network, or some error logic, show errors with this ordered ways:

  1.  Show some error messsage with this template

  ```sh
  Oops something wrong: $error_message
  Press any key to continue...
  ```

  2.  Pressing any key
  3.  Clear the terminal
  4.  Back to main menu

##### Positive cases :

1. Give success response

```sh
Debit success
Press any key to continue...
```

2. Back to main menu

### Story 4

User able to Credit their money

Example:

```sh
Welcome to DIGI ATM
Menu:
1. Check Balance
2. Debit
3. Credit
4. Check mutation
5. Exit
Input: 3
```

```sh
Choose nominal:
1. Rp. 50.000,00
2. Rp. 100.000,00
Input:
```

```sh
Credit
Input:
```

Requirement:

- Validate negative amount ($error_message = Amount cannot be negative)
- Input base on nominal and its multiples. For example if the user choose 50.000 nominal, debit amount input should be 50.000 in minimum or the multiples of 50.000, e.g. 250.000 ($error_message = Amount must be the multiples of Rp. XX.000,00)

##### Negative cases:

- If the user input doesn't match with the requirements or edge cases, show errors with this ordered ways:

  1.  Show some error messsage with this template

  ```sh
  Error message: $error_message
  Press any key to continue...
  ```

  2.  Pressing any key
  3.  Clear the terminal
  4.  Repeat the input

- If the error comes from the server, network, or some error logic, show errors with this ordered ways:

  1.  Show some error messsage with this template

  ```sh
  Oops something wrong: $error_message
  Press any key to continue...
  ```

  2.  Pressing any key
  3.  Clear the terminal
  4.  Back to main menu

##### Positive cases :

1. Give success response

```sh
Credit success
Press any key to continue...
```

2. Back to main menu

### Story 5

User able to see their mutation. The list of transactions can be sorted by date [asc,desc] and filter mutation based on type [CREDIT,DEBIT,ALL]. The input must have two word.

You can use `console.table` or other library to create table-like output.

Example:

```sh
    Welcome to DIGI ATM
    Menu:
    1. Check Balance
    2. Debit
    3. Credit
    4. Check mutation
    5. Exit
    Input: 4
```

```sh
    // format, don't need to show to the user
    Input : [type] [order]
```

```sh
    Input : CREDIT asc
```

```sh
    Date        | Type   | Amount
    09-07-2023  | CREDIT | Rp. 50.000,00
    10-07-2023  | CREDIT | Rp. 200.000,00
    11-07-2023  | DEBIT  | Rp. 50.000,00
    12-07-2023  | DEBIT  | Rp. 100.000,00
```

Requirement:

- Validate sort by [asc,desc] ($error_message = Order must be 'asc' (ascending) or 'desc' (descending))
- Validate filter mutation type [CREDIT,DEBIT,ALL] ($error_message = Type must be 'CREDIT', 'DEBIT', or 'ALL')

**Note**:
`You may use library like "table" for output in table or use console.table`

##### Negative cases:

- If the user input doesn't match with the requirements or edge cases, show errors with this ordered ways:

  1.  Show some error messsage with this template

  ```sh
  Error message: $error_message
  Press any key to continue...
  ```

  2.  Pressing any key
  3.  Clear the terminal
  4.  Repeat the input

- If the error comes from the server, network, or some error logic, show errors with this ordered ways:

  1.  Show some error messsage with this template

  ```sh
  Oops something wrong: $error_message
  Press any key to continue...
  ```

  2.  Pressing any key
  3.  Clear the terminal
  4.  Back to main menu

##### Positive cases :

1. Give success response

```sh
    Date        | Type   | Amount
    09-07-2023  | CREDIT | Rp. 5.000,00
    10-07-2023  | CREDIT | Rp. 20.000,00
    11-07-2023  | DEBIT  | Rp. 5.000,00
    12-07-2023  | DEBIT  | Rp. 10.000,00

    Press any key to continue...
```

2. Back to main menu

## Good luck 🙂
