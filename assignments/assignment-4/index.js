// Set some global variables for re-use
let displayValue = "0";
let previousValue = null;
let currentOperation = null;
let shouldResetDisplay = true;
let lastOperand = null;

const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

function formatForDisplay(value) {
  if (
    typeof value === "string" &&
    (value === "Error" || value === "Infinity")
  ) {
    return value;
  }

  const num = parseFloat(value);

  if (Math.abs(num) >= 1e10 || (Math.abs(num) < 0.0000001 && num !== 0)) {
    return num.toExponential(6);
  }

  let strValue = num.toString();

  if (strValue.length > 10) {
    if (strValue.includes(".")) {
      const parts = strValue.split(".");
      const intLength = parts[0].length;
      const maxDecimalPlaces = Math.max(0, 9 - intLength);
      return num.toFixed(maxDecimalPlaces);
    }
    return num.toExponential(6);
  }

  return strValue;
}
// Update the display with the global display value after editing
function updateDisplay() {
  display.textContent = formatForDisplay(displayValue);
}

function handleNumberInput(number) {
  if (shouldResetDisplay) {
    displayValue = number;
    shouldResetDisplay = false;
  } else {
    if (displayValue.replace(/[^0-9]/g, "").length >= 10) return;

    displayValue = displayValue === "0" ? number : displayValue + number;
  }
  updateDisplay();
}

function handleDecimal() {
  if (shouldResetDisplay) {
    displayValue = "0.";
    shouldResetDisplay = false;
  } else if (!displayValue.includes(".")) {
    displayValue += ".";
  }
  updateDisplay();
}

function clearCalculator() {
  displayValue = "0";
  previousValue = null;
  currentOperation = null;
  shouldResetDisplay = true;
  lastOperand = null;
  updateDisplay();
}

function toggleSign() {
  displayValue = (parseFloat(displayValue) * -1).toString();
  updateDisplay();
}

function calculatePercentage() {
  displayValue = (parseFloat(displayValue) / 100).toString();
  updateDisplay();
}

function calculate(a, operator, b) {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "x":
      return a * b;
    case "÷":
      if (b === 0) return "Error";
      return a / b;
    default:
      return b;
  }
}

function handleOperation(operation) {
  const currentValue = parseFloat(displayValue);

  if (previousValue !== null && currentOperation && !shouldResetDisplay) {
    const result = calculate(previousValue, currentOperation, currentValue);

    if (result === "Error") {
      displayValue = "Error";
      updateDisplay();
      return;
    }

    displayValue = result.toString();
    previousValue = result;
  } else {
    previousValue = currentValue;
  }

  currentOperation = operation;
  shouldResetDisplay = true;
  updateDisplay();
}

function handleEquals() {
  const currentValue = parseFloat(displayValue);

  if (currentOperation === null) return;

  if (!shouldResetDisplay) {
    lastOperand = currentValue;
  }

  let result;

  if (shouldResetDisplay && lastOperand !== null) {
    result = calculate(previousValue, currentOperation, lastOperand);
  } else {
    result = calculate(previousValue, currentOperation, currentValue);
    lastOperand = currentValue;
  }

  if (result === "Error") {
    displayValue = "Error";
    updateDisplay();
    return;
  }

  displayValue = result.toString();
  previousValue = result;
  currentOperation = null;
  shouldResetDisplay = true;

  updateDisplay();
}

document.addEventListener("keydown", (event) => {
  if (
    [
      "+",
      "-",
      "*",
      "/",
      "=",
      "Enter",
      ".",
      "%",
      "Escape",
      "Backspace",
      "Delete",
    ].includes(event.key) ||
    (event.key >= "0" && event.key <= "9")
  ) {
    event.preventDefault();
  }

  if (
    displayValue === "Error" &&
    event.key !== "Escape" &&
    event.key !== "Delete" &&
    event.key !== "Backspace"
  ) {
    return;
  }

  if (event.key >= "0" && event.key <= "9") {
    handleNumberInput(event.key);
  } else if (event.key === ".") {
    handleDecimal();
  } else if (event.key === "+") {
    handleOperation("+");
  } else if (event.key === "-") {
    handleOperation("-");
  } else if (event.key === "*" || event.key === "x") {
    handleOperation("x");
  } else if (event.key === "/") {
    handleOperation("÷");
  } else if (event.key === "=" || event.key === "Enter") {
    handleEquals();
  } else if (
    event.key === "Escape" ||
    event.key === "Delete" ||
    event.key === "Backspace"
  ) {
    clearCalculator();
  } else if (event.key === "%") {
    calculatePercentage();
  }
});

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (displayValue === "Error" && button.textContent !== "AC") {
      return;
    }

    const buttonText = button.textContent;

    if (button.classList.contains("number") && buttonText !== ".") {
      handleNumberInput(buttonText);
    } else if (buttonText === ".") {
      handleDecimal();
    } else if (
      button.classList.contains("operation") &&
      !button.classList.contains("equals")
    ) {
      handleOperation(buttonText);
    } else if (button.classList.contains("equals")) {
      handleEquals();
    } else if (buttonText === "AC") {
      clearCalculator();
    } else if (buttonText === "+/-") {
      toggleSign();
    } else if (buttonText === "%") {
      calculatePercentage();
    }
  });
});

updateDisplay();
