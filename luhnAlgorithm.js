function isValidAccountNumber(accountNumber) {
  let lengthNumber = accountNumber.length;

  let sum = 0;
  let isSecond = false;
  for (let i = lengthNumber - 1; i >= 0; i--) {
    let digitNumber = accountNumber[i].charCodeAt() - "0".charCodeAt();

    if (isSecond == true) {
      digitNumber = digitNumber * 2;
    }
    sum += parseInt(digitNumber / 10, 10);
    sum += digitNumber % 10;

    isSecond = !isSecond;
  }
  return sum % 10 == 0;
}

export default isValidAccountNumber;
