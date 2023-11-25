let displayValue = '0';
let operator = '';
let firstOperand = '';

function updateDisplay() {
    document.getElementById('display').innerText = displayValue;
}

function appendNumber(number) {
    if (displayValue === '0' || operator === '=') {
        displayValue = number;
    } else {
        displayValue += number;
    }
    updateDisplay();
}

function appendDecimal() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
        updateDisplay();
    }
}

function setOperator(op) {
    if (operator !== '=' && firstOperand !== '') {
        calculate();
    }
    operator = op;
    firstOperand = displayValue;
    displayValue = '0';
    updateDisplay();
}

function clearDisplay() {
    displayValue = '0';
    operator = '';
    firstOperand = '';
    updateDisplay();
}

function operateOnOperands(operation) {
    return operation(parseFloat(firstOperand), parseFloat(displayValue)).toString();
}

function calculate() {
    if (operator === '+') {
        displayValue = operateOnOperands((a, b) => a + b);
    } else if (operator === '-') {
        displayValue = operateOnOperands((a, b) => a - b);
    } else if (operator === '*') {
        displayValue = operateOnOperands((a, b) => a * b);
    } else if (operator === '/') {
        if (parseFloat(displayValue) !== 0) {
            displayValue = operateOnOperands((a, b) => a / b);
        } else {
            displayValue = 'Error: Division by zero';
        }
    }
    operator = '=';
    updateDisplay();
}

function handleKeyPress(event) {
    const key = event.key;

    if (/\d/.test(key)) {
        appendNumber(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        setOperator(key);
    } else if (key === '.' || key === ',') {
        appendDecimal();
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Escape') {
        clearDisplay();
    }
}

document.addEventListener('keydown', handleKeyPress);

updateDisplay();
