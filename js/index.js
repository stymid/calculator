const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["+", "-", "×", "÷"];
const input = document.querySelector(".input");
const history = document.querySelector(".history");
const keys = document.querySelectorAll(".container__button span");
let operation = "";
let answer;
let operatorAdded = false;

const handleKeyPress = (e) => {
  const key = e.target.dataset.key;
  const lastIndex = operation[operation.length - 1];

  if (key === "=") {
    return;
  }

  // if (!operation === "" && answer && !operators.indexOf(key) === -1) {
  //   history.innerText = "";
  // }

  if (operators.includes(key)) {
    if (operators.includes(lastIndex)) {
    }
    if (!operatorAdded) {
      operatorAdded = true;
      operation = operation + key;
      input.innerText = operation;
      history.innerText = "";
      return;
    } else {
      return;
    }
  }
  if (digits.includes(key)) {
    operation = operation + key;
    input.innerText = operation;
    return;
  }
};

const evaluate = (e) => {
  const key = e.target.dataset.key;
  if (key === "=") {
    operatorAdded = !operatorAdded;
    const final = operation.replace(/÷/g, "/").replace(/×/g, "*");
    history.innerText = operation;
    answer = +eval(final);
    input.innerText = answer;
    operation = answer;
    return;
  }
};
keys.forEach((key) => {
  key.addEventListener("click", evaluate);
  key.addEventListener("click", handleKeyPress);
});
