const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["+", "-", "*", "/"];
let prvInput = document.querySelector(".input__preview").innerText;
let inlineInput = document.querySelector(".input__line").innerText;
let firstOperand = 0;
let secondOperand = 0;

const test = () => {};
// this function adds characters to first and second operand
const onAddChar = (char) => {
  // This condition specifies how to add the character to inlineInput and the first and second operand
  if (!isIncloudOperator(inlineInput)) {
    if (firstOperand === 0) {
      firstOperand = char;
      inlineInput = char;
      document.querySelector(".input__line").innerText = inlineInput;
    } else {
      firstOperand = firstOperand + char;
      inlineInput = inlineInput + char;
      document.querySelector(".input__line").innerText = inlineInput;
    }
  } else {
    inlineInput = inlineInput + char;
    document.querySelector(".input__line").innerText = inlineInput;
    if (secondOperand === 0) {
      secondOperand = char;
    } else {
      secondOperand = secondOperand + char;
    }
  }
};

// this condition specify that inlineInput has any operator or not
const isIncloudOperator = (str) => {
  for (let i = 0; str.split.length > i; i++) {
    if (str.split("").includes(operators[i])) {
      return true;
    }
  }
  return false;
};
// This function must determine if the operator should calculate two numbers or if it should be added to the inlineInput as a character.
const onClickOperator = (operator) => {
  if (!isIncloudOperator(inlineInput)) {
    inlineInput = inlineInput + operator;
    document.querySelector(".input__line").innerText = inlineInput;
  }
};
