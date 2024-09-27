let display = document.getElementById('display');
let currentInput = '';
let lastInput = ''; // to track last input (whether it's a number or operator)
let isEvaluated = false; // flag to check if the result has been displayed

function inputNumber(number) {
    if (isEvaluated) {
        currentInput = '';
        isEvaluated = false;
    }
    currentInput += number;
    lastInput = number;
    display.value = currentInput;
}

function inputOperator(operator) {
    if (isEvaluated) {
        isEvaluated = false;
    }
    if (currentInput !== '' && !isNaN(lastInput)) {
        currentInput += ' ' + operator + ' ';
        lastInput = operator;
    } else if (isNaN(lastInput)) {
        // Replace the last operator with the new one if a sequence of operators is input
        currentInput = currentInput.slice(0, -3) + ' ' + operator + ' ';
        lastInput = operator;
    }
    display.value = currentInput;
}

function clearAll() {
    currentInput = '';
    lastInput = '';
    isEvaluated = false;
    display.value = '';
}

function clearEntry() {
    currentInput = '';
    lastInput = '';
    display.value = currentInput;
}

function deleteLast() {
    if (isEvaluated) {
        clearAll();
        return;
    }
    if (currentInput !== '') {
        currentInput = currentInput.trim().slice(0, -1);
        lastInput = currentInput[currentInput.length - 1];
        display.value = currentInput;
    }
}

function calculate() {
    try {
        // Replace ÷ and × symbols for JS evaluation
        currentInput = currentInput.replace(/÷/g, '/').replace(/×/g, '*');
        let result = eval(currentInput).toString();
        display.value = result;
        currentInput = result; // Store result for further calculations
        lastInput = result; // Set last input as the result
        isEvaluated = true; // Mark that the result was displayed
    } catch (error) {
        display.value = 'Error';
        isEvaluated = true;
    }
}

function scientificFunction(func) {
    let result;
    try {
        let inputEval = eval(currentInput); // Evaluate only the number input
        switch (func) {
            case 'sqrt':
                result = Math.sqrt(inputEval);
                break;
            case 'square':
                result = Math.pow(inputEval, 2);
                break;
            case 'cube':
                result = Math.pow(inputEval, 3);
                break;
            case 'log':
                result = Math.log10(inputEval);
                break;
            case 'ln':
                result = Math.log(inputEval);
                break;
            case 'exp':
                result = Math.exp(inputEval);
                break;
            case 'tenExp':
                result = Math.pow(10, inputEval);
                break;
            case 'sin':
                result = Math.sin(inputEval);
                break;
            case 'cos':
                result = Math.cos(inputEval);
                break;
            case 'tan':
                result = Math.tan(inputEval);
                break;
            case 'pi':
                currentInput = Math.PI.toString();
                break;
            default:
                result = eval(currentInput);
        }
        currentInput = result.toString();
        display.value = currentInput;
        lastInput = result.toString();
    } catch (error) {
        display.value = 'Error';
    }
}
