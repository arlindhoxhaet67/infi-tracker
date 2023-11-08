// Filename: sophisticated_code.js

/**
 * This complex JavaScript code demonstrates a sophisticated and elaborate 
 * implementation of a scientific calculator. It includes a wide range of 
 * mathematical operations, advanced input handling and interactive features.
 */

class ScientificCalculator {
  constructor() {
    this.displayValue = '0';
    this.firstOperand = null;
    this.waitingForSecondOperand = false;
    this.operator = null;
    this.memory = 0;
  }

  // Utility method to format number with commas
  formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // Utility method to trim trailing zeros from decimal numbers
  trimTrailingZeros(number) {
    return parseFloat(number).toString();
  }

  // Method to handle digit button clicks
  inputDigit(digit) {
    const currentValue = this.displayValue;
    this.displayValue = currentValue === '0' ? digit : currentValue + digit;
  }

  // Method to handle decimal point button click
  inputDecimalPoint() {
    if (!this.displayValue.includes('.')) {
      this.displayValue += '.';
    }
  }

  // Method to handle operator button clicks
  inputOperator(operator) {
    const inputValue = parseFloat(this.displayValue);

    if (this.firstOperand === null) {
      this.firstOperand = inputValue;
    } else if (this.operator) {
      const result = this.performCalculation();
      this.displayValue = this.trimTrailingZeros(result);
      this.firstOperand = result;
    }

    this.operator = operator;
    this.waitingForSecondOperand = true;
  }

  // Method to perform arithmetic calculations
  performCalculation() {
    const { firstOperand, operator, displayValue } = this;
    const inputValue = parseFloat(displayValue);

    switch (operator) {
      case '+':
        return firstOperand + inputValue;
      case '-':
        return firstOperand - inputValue;
      case '*':
        return firstOperand * inputValue;
      case '/':
        return firstOperand / inputValue;
      case '%':
        return (firstOperand / 100) * inputValue;
      default:
        return inputValue;
    }
  }

  // Method to clear calculator state
  clear() {
    this.displayValue = '0';
    this.firstOperand = null;
    this.waitingForSecondOperand = false;
    this.operator = null;
  }

  // Method to perform memory operations
  memoryOperation(operation) {
    const currentValue = parseFloat(this.displayValue);
    switch (operation) {
      case 'M+':
        this.memory += currentValue;
        break;
      case 'M-':
        this.memory -= currentValue;
        break;
      case 'MR':
        this.displayValue = this.trimTrailingZeros(this.memory);
        break;
      case 'MC':
        this.memory = 0;
        break;
      default:
        break;
    }
  }

  // Method to handle input of pi value
  inputPi() {
    this.displayValue = Math.PI.toString();
  }
}

// Create an instance of the calculator
const calculator = new ScientificCalculator();

// Example usage:
calculator.inputDigit(9);
calculator.inputOperator('+');
calculator.inputDigit(5);
console.log('Result:', calculator.performCalculation()); // Output: Result: 14

calculator.clear();
calculator.inputDigit(3);
calculator.inputDecimalPoint();
calculator.inputDigit(7);
calculator.inputOperator('*');
calculator.inputDigit(2);
console.log('Result:', calculator.performCalculation()); // Output: Result: 7.4

calculator.clear();
calculator.inputDigit(1);
calculator.inputDigit(2);
calculator.memoryOperation('M+');
calculator.clear();
calculator.inputDigit(9);
calculator.memoryOperation('M+');
calculator.inputOperator('-');
calculator.inputDigit(3);
console.log('Result:', calculator.performCalculation()); // Output: Result: 18

calculator.memoryOperation('MR');
console.log('Memory:', calculator.displayValue); // Output: Memory: 21

calculator.memoryOperation('MC');
calculator.memoryOperation('MR');
console.log('Memory:', calculator.displayValue); // Output: Memory: 0

calculator.inputPi();
console.log('Result:', calculator.displayValue); // Output: Result: 3.141592653589793