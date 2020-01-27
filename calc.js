const display = document.querySelector('#display');
let currentVal = "";
let numbers = [];
let nextIsNegative = false;
let highPriorityOp = [];
let operations = [];
let numOfMultiplies = 0;
let numOfDivides = 0;
let firstVal = true;
let consecutiveOperationsPressed = false;

const digits = document.querySelectorAll('.digit');
digits.forEach(function (button) {
    button.addEventListener('click', function (e) {
        currentVal += button.textContent;
        display.textContent += button.textContent;
        consecutiveOperationsPressed = false;
        firstVal = false;
    })
});

const addButton = document.querySelector('#add');
addButton.addEventListener('click', function (e) {
    if (!consecutiveOperationsPressed) {
        display.textContent += '+';
        pushNumber();
        if (!firstVal) {
            operations.push(add);
        }
        nextIsNegative = false;
        currentVal = ""
        consecutiveOperationsPressed = true;
    }
})

const subButton = document.querySelector('#subtract');
subButton.addEventListener('click', function (e) {
    if (!consecutiveOperationsPressed) {
        display.textContent += '-';
        if (!firstVal) {
            operations.push(subtract);
        }
        pushNumber();
        nextIsNegative = true;
        currentVal = ""
        consecutiveOperationsPressed = true;
    }
})

const multiplyButton = document.querySelector('#multiply');
multiplyButton.addEventListener('click', function (e) {
    if (!consecutiveOperationsPressed) {
        if (!firstVal) {
            display.textContent += '*';
            pushNumber();
            operations.push(multiply);
            currentVal = ""
            numOfMultiplies++;
        }
        consecutiveOperationsPressed = true;
    }
})

const divButton = document.querySelector('#divide');
divButton.addEventListener('click', function (e) {
    if (!consecutiveOperationsPressed) {
        if (!firstVal) {
            display.textContent += '/';
            pushNumber();
            operations.push(divide);
            currentVal = ""
            numOfDivides++;
        }
        consecutiveOperationsPressed = true;
    }
})

const equalButton = document.querySelector('#equals');
equalButton.addEventListener('click', function (e) {
    if (currentVal) {
        pushNumber();
    }
    for (j = 0; j < numOfMultiplies; j++) {
        doMultiplaction();
    }
    for (k = 0; k < numOfDivides; k++) {
        doDivision();
    }

    let total = numbers.reduce(getSum, 0);
    display.textContent = total;

    console.table(numbers);
})

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', function (e) {
    operations = [];
    numbers = [];
    display.textContent = "";
    nextIsNegative = false;
    consecutiveOperationsPressed = false;
    currentVal = "";
})

function getSum(total, num) {
    return total + num;
}

function doMultiplaction() {
    for (i = 0; i < operations.length; i++) {
        if (operations[i] == multiply) {
            numbers[i] = (operate(multiply, numbers[i], numbers[i + 1]))
            numbers.splice(i + 1, 1);
            operations.splice(i, 1);
            break;
        }
    }
}

function doDivision() {
    for (i = 0; i < operations.length; i++) {
        if (operations[i] == divide) {
            numbers[i] = (operate(divide, numbers[i], numbers[i + 1]))
            numbers.splice(i + 1, 1);
            operations.splice(i, 1);
            break;
        }
    }
}

function pushNumber() {
    firstVal = false;
    if (currentVal) {
        if (nextIsNegative) {
            numbers.push(-+currentVal);
        } else {
            numbers.push(+currentVal);
        }
        nextIsNegative = false;
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operation, a, b) {
    return operation(a, b);
}