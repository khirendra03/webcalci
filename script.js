// Variables to store calculator state
let displayValue = '0';
let operator = '';
let firstOperand = '';

// Update the display with the current value
function updateDisplay() {
    document.getElementById('display').innerText = displayValue;
}

// Append a number to the display
function appendNumber(number) {
    if (displayValue === '0' || operator === '=') {
        displayValue = number;
    } else {
        displayValue += number;
    }
    updateDisplay();
}

// Append a decimal point to the display
function appendDecimal() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
        updateDisplay();
    }
}

// Set the operator for the calculation
function setOperator(op) {
    if (operator !== '=' && firstOperand !== '') {
        calculate();
    }
    operator = op;
    firstOperand = displayValue;
    displayValue = '0';
    updateDisplay();
}

// Clear the display and reset calculator state
function clearDisplay() {
    displayValue = '0';
    operator = '';
    firstOperand = '';
    updateDisplay();
}

// Perform the calculation based on the current operator
function operateOnOperands(operation) {
    return operation(parseFloat(firstOperand), parseFloat(displayValue)).toString();
}

// Calculate and display the result
function calculate() {
    if (operator === '+') {
        displayValue = operateOnOperands((a, b) => a + b);
    } else if (operator === '-') {
        displayValue = operateOnOperands((a, b) => a - b);
    } else if (operator === '*') {
        displayValue = operateOnOperands((a, b) => a * b);
    } else if (operator === '/') {
        // Check for division by zero
        if (parseFloat(displayValue) !== 0) {
            displayValue = operateOnOperands((a, b) => a / b);
        } else {
            displayValue = 'Error: Division by zero';
        }
    }
    operator = '=';
    updateDisplay();
}

// Handle keyboard input
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

// Add event listener for keyboard input
document.addEventListener('keydown', handleKeyPress);

// Initialize display
updateDisplay();
