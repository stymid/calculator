const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["+", "-", "×", "÷"];
const input = document.querySelector(".input");
const history = document.querySelector(".history");
const keys = document.querySelectorAll(".container__button span");
let operation = "";
let answer = 0;
let operatorAdded = false;
let decimalAdded = false;

const handleKeyPress = (e) => {
  const key = e.target.dataset.key;

  if (key === "=") {
    return;
  }

  if (key === "." && decimalAdded) {
    console.log("ghj");

    return;
  }
  if (key === "." && (answer % 1 === 0 || operatorAdded)) {
    operation = operation + key;
    decimalAdded = !decimalAdded;
    input.innerText = operation;
  }

  if (key === "0") {
    if (
      (operation[0] === "0" && !operation[1] === ".") ||
      (operation[0] === "(" && !operation[3] === ".")
    ) {
      return;
    } else if (
      (operatorAdded &&
        !operation.at(-1) === "." &&
        operation.at(-2) === "0") ||
      (operatorAdded && !operation.at(-2) === "." && operation.at(-3) === "0")
    ) {
      return;
    } else if (
      operation[0] === "(" ||
      operation[operation.length - 1] === ")"
    ) {
      if (!operatorAdded) {
        operation = operation.slice(0, operation.length - 1) + "0" + ")";
        input.innerText = operation;
        return;
      }
    } else {
      operation = operation + key;
      input.innerText = operation;
      return;
    }
  }

  if (operators.includes(key)) {
    if (!operatorAdded) {
      operatorAdded = true;
      operation = operation + key;
      input.innerText = operation;
      history.innerText = "";
      decimalAdded = false;
      return;
    } else {
      return;
    }
  }
  if (key === "±") {
    if (!operatorAdded) {
      if (operation[0] === "0" || digits.includes(operation[0])) {
        operation = "(-" + operation + ")";
        input.innerText = operation;
        return;
      } else if (operation[0] === "(") {
        operation = operation.slice(2, operation.length - 1);
        input.innerText = operation;
        return;
      } else if (operation[0] === "-") {
        operation = operation.slice(1);
        input.innerText = operation;
        return;
      }
    } else if (operatorAdded) {
      const indexOperation = () => {
        const indexes = [];
        for (let i = 0; operators.length > i; i++) {
          for (let i1 = 0; operation.length > i1; i1++) {
            if (operation[i1] === operators[i]) {
              indexes.push(i1);
            }
          }
        }
        indexes.sort();
        if (operation[0] === "(" || operation[0] === "-") {
          return indexes[1];
        } else {
          return indexes[0];
        }
      };

      if (
        operation[indexOperation() + 1] === "0" ||
        digits.includes(operation[indexOperation() + 1])
      ) {
        operation =
          operation.slice(0, indexOperation() + 1) +
          "(-" +
          operation.slice(indexOperation() + 1) +
          ")";
        input.innerText = operation;
      } else if (operation[indexOperation() + 1] === "(") {
        operation =
          operation.slice(0, indexOperation() + 1) +
          operation.slice(indexOperation() + 3, operation.length - 1);
        input.innerText = operation;
      }
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
    answer = +eval(final).toFixed(5);
    if (answer % 1 === 0) {
      decimalAdded = false;
    } else {
      decimalAdded = true;
    }
    input.innerText = answer.toString();
    operation = answer.toString();

    return;
  }
  if (key === "%") {
    operatorAdded = !operatorAdded;
    const final = operation.replace(/÷/g, "/").replace(/×/g, "*");
    history.innerText = operation;
    answer = (+eval(final) / 100).toFixed(2);
    if (answer % 1 === 0) {
      decimalAdded = false;
    } else {
      decimalAdded = true;
    }
    input.innerText = answer.toString();
    operation = answer.toString();

    return;
  }
  if (key === "ce") {
    operation = "";
    answer = 0;
    operatorAdded = false;
    decimalAdded = false;
    input.innerText = "";
    history.innerText = "";
  }
};

keys.forEach((key) => {
  key.addEventListener("click", evaluate);
  key.addEventListener("click", handleKeyPress);
});
