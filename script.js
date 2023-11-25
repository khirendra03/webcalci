// Variables to store calculator state
let displayValue = '0';
let operator = '';
let firstOperand = '';
let history = ''; // Variable to store calculation history

// Update the display with the current value
function updateDisplay() {
    document.getElementById('display').innerText = displayValue;
    document.getElementById('history').innerText = history;
}

// Append a number to the display
function appendNumber(number) {
    // Check if the display is at its initial state or after a calculation
    if (displayValue === '0' || operator === '=') {
        displayValue = number;
    } else {
        displayValue += number;
    }
    updateDisplay();
}

// Append a decimal point to the display
function appendDecimal() {
    // Check if the current display value already contains a decimal point
    if (!displayValue.includes('.')) {
        displayValue += '.';
        updateDisplay();
    }
}

// Set the operator for the calculation
function setOperator(op) {
    // Check if there is a previous operator and operand for ongoing calculations
    if (operator !== '=' && firstOperand !== '') {
        calculate();
    }
    // Set the new operator and store the current display value as the first operand
    operator = op;
    history += `${firstOperand} ${operator} `;
    firstOperand = displayValue;
    displayValue = '0';
    updateDisplay();
}

// Clear the display and reset calculator state
function clearDisplay() {
    displayValue = '0';
    operator = '';
    firstOperand = '';
    history = ''; // Clear history on display clear
    updateDisplay();
}

// Toggle the sign of the current number
function toggleSign() {
    displayValue = (parseFloat(displayValue) * -1).toString();
    updateDisplay();
}

// Calculate the percentage of the current number
function percentage() {
    displayValue = (parseFloat(displayValue) / 100).toString();
    updateDisplay();
}

// Perform the calculation based on the current operator
function operateOnOperands(operation) {
    return operation(parseFloat(firstOperand), parseFloat(displayValue));
}

// Calculate and display the result
function calculate() {
    try {
        if (operator === '+') {
            displayValue = operateOnOperands((a, b) => a + b).toString();
        } else if (operator === '-') {
            displayValue = operateOnOperands((a, b) => a - b).toString();
        } else if (operator === '*') {
            displayValue = operateOnOperands((a, b) => a * b).toString();
        } else if (operator === '/') {
            // Check for division by zero
            if (parseFloat(displayValue) !== 0) {
                displayValue = operateOnOperands((a, b) => a / b).toString();
            } else {
                // Display an error message for division by zero
                displayValue = 'Error: Division by zero';
            }
        }
        // Update history with the calculation
        history += `${firstOperand} ${operator} ${parseFloat(displayValue)} = `;
        // Set the operator to '=' to indicate the end of the current calculation
        operator = '=';
        updateDisplay();
    } catch (error) {
        // Display an error message for any other calculation errors
        displayValue = 'Error';
        updateDisplay();
    }
}

// Handle keyboard key press events for calculator input
function handleKeyPress(event) {
    const key = event.key;

    // Check for numeric keys
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

// Add event listener for keyboard key presses
document.addEventListener('keydown', handleKeyPress);

// Initial display update
updateDisplay();
