let t = document.getElementById("text");

let num1 = null;
let num2 = null;
let op = null;
let shouldResetDisplay = false;

function add(num1, num2) { return num1 + num2; }
function substract(num1, num2) { return num1 - num2; }
function multiply(num1, num2) { return num1 * num2; }
function divide(num1, num2) { return num1 / num2; }

function operate(num1, num2, op) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    if (isNaN(num1) || isNaN(num2)) {
        return "Error"; 
    }

    if (op === "+") {
        return add(num1, num2);
    } else if (op === "-") {
        return substract(num1, num2);
    } else if (op === "*") {
        return multiply(num1, num2);
    } else if (op === "/") {
        if (num2 === 0) {
            return "Error";
        }
        return divide(num1, num2);
    }

    return "Error"; 
}

function populateDisplay(text) {
    if (shouldResetDisplay) {
        t.textContent = text; 
        shouldResetDisplay = false;
    } else {
        t.textContent += text; 
    }
}

function handleOperator(operator) {
    if (op !== null && !shouldResetDisplay) {
        num2 = t.textContent;
        let result = operate(num1, num2, op);
        t.textContent = Math.round(result * 1000000) / 1000000
        num1 = result; 
    } else {
        num1 = t.textContent;
    }
    op = operator; 
    shouldResetDisplay = true; 
}

const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        populateDisplay(button.textContent);
    });
});

const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        handleOperator(button.textContent);
    });
});

document.getElementById("=").addEventListener("click", () => {
    if (op !== null) {
        num2 = t.textContent;
        let result = operate(num1, num2, op);
        t.textContent = Math.round(result * 1000000) / 1000000
        num1 = result; 
        op = null; 
        shouldResetDisplay = true;
    }
});

document.getElementById("del").addEventListener("click", () => {
    t.textContent = t.textContent.slice(0, -1); 
});

document.getElementById("clear").addEventListener("click", () => {
    t.textContent = "";
    num1 = null;
    num2 = null;
    op = null;
    shouldResetDisplay = false;
});

document.getElementById("dec").addEventListener("click", () => {
    if (!t.textContent.includes(".")) {
        populateDisplay(".");
    }
});




