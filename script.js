// Variables to store calculator state
let displayValue = '0';
let operator = '';
let firstOperand = '';
let history = ''; // Variable to store calculation history

// Function to update the display
function updateDisplay() {
    // Update the main display
    document.getElementById('display').innerText = displayValue;
    // Update the history display
    document.getElementById('history').innerText = history;
}

// Function to handle numeric input
function handleNumericInput(number) {
    if (displayValue === '0' || operator === '=') {
        // If the display is at its initial state or after a calculation, replace the current value
        displayValue = number;
    } else {
        // Otherwise, append the number to the current value
        displayValue += number;
    }
    updateDisplay();
}

// Function to handle operator input
function handleOperatorInput(op) {
    if (operator !== '=' && firstOperand !== '') {
        // If there's a previous operator and operand, calculate the result
        calculate();
    }
    // Set the new operator and update history
    operator = op;
    history += `${firstOperand} ${operator} `;
    // Set the current display value as the first operand and reset the display
    firstOperand = displayValue;
    displayValue = '0';
    updateDisplay();
}

// Function to handle decimal input
function appendDecimal() {
    if (!displayValue.includes('.')) {
        // If the current value doesn't already contain a decimal point, append it
        displayValue += '.';
        updateDisplay();
    }
}

// Function to clear the display and reset calculator state
function clearDisplay() {
    // Reset all calculator variables and clear the history
    displayValue = '0';
    operator = '';
    firstOperand = '';
    history = '';
    updateDisplay();
}

// Function to toggle the sign of the current number
function toggleSign() {
    // Multiply the current value by -1 to toggle the sign
    displayValue = (parseFloat(displayValue) * -1).toString();
    updateDisplay();
}

// Function to calculate the percentage of the current number
function percentage() {
    // Divide the current value by 100 to get the percentage
    displayValue = (parseFloat(displayValue) / 100).toString();
    updateDisplay();
}

// Function to perform the calculation based on the current operator
function calculate() {
    try {
        switch (operator) {
            case '+':
                displayValue = operateOnOperands((a, b) => a + b).toString();
                break;
            case '-':
                displayValue = operateOnOperands((a, b) => a - b).toString();
                break;
            case '*':
                displayValue = operateOnOperands((a, b) => a * b).toString();
                break;
            case '/':
                if (parseFloat(displayValue) !== 0) {
                    displayValue = operateOnOperands((a, b) => a / b).toString();
                } else {
                    displayValue = 'Error: Division by zero';
                }
                break;
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
        handleNumericInput(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        handleOperatorInput(key);
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
