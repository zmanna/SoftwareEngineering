// Replace operators in string
function replaceOperators(expression) {
    out = "";
    for (let i = 0; i < expression.length; ++i) {
        if (expression[i] == '×') {
            out += '*';
        }
        else if (expression[i] == '÷') {
            out += '/';
        }
        else {
            out += expression[i];
        }
    }
    return out;
}

// Function to get the precedence of an operator
function getPrecedence(op) {
    if (op === '^')
        return 3;
    else if (op === '*' || op === '/' || op === '%')
        return 2;
    else if (op === '+' || op === '-')
        return 1;
    else
        return 0;
}

// Function to apply an operator to two operands
function applyOperator(op, operand1, operand2, error) {
    switch (op) {
        case '+':
            return operand1 + operand2;
        case '-':
            return operand1 - operand2;
        case '*':
            return operand1 * operand2;
        case '/':
            // Check for division by zero
            if (operand2 !== 0) {
                return operand1 / operand2;
            } else {
                console.error("Error: Division by zero.");
                error = true;
                return 0.0;
            }
        case '%':
            // Check for modulo by zero
            if (operand2 !== 0) {
                return operand1 % operand2;
            } else {
                console.error("Error: Modulo by zero.");
                error = true;
                return 0.0;
            }
        case '^':
            return Math.pow(operand1, operand2);
        default:
            console.error("Error: Invalid operator");
            error = true;
            return 0.0;
    }
}

// Function to evaluate an arithmetic expression
function evaluateExpression(expression, error) {
    const values = [];  // Stack to store operands
    const operators = []; // Stack to store operators

    for (let i = 0; i < expression.length; ++i) {
        // Check for whitespaces and skip them
        if (expression[i].trim() === "") {
            continue;
        } else if (!isNaN(expression[i])) {
            // Read and push operands onto the stack
            let operandStr = "";
            while (i < expression.length && (!isNaN(expression[i]) || expression[i] === '.')) {
                operandStr += expression[i++];
            }
            --i;
            values.push(parseFloat(operandStr));
        } else if (expression[i] === '(') {
            operators.push('(');
        } else if (expression[i] === ')') {
            // Evaluate expressions within parentheses
            while (operators.length > 0 && operators[operators.length - 1] !== '(') {
                const operand2 = values.pop();
                const operand1 = values.pop();
                const op = operators.pop();
                values.push(applyOperator(op, operand1, operand2, error));
                if (error) return 0.0;
            }
            // Check for unmatched closing parenthesis
            if (operators.length > 0) {
                operators.pop(); // Pop opening parenthesis
            } else {
                console.error("Error: Unmatched closing parenthesis.");
                error = true;
                return 0.0;
            }
        } else if (['+', '-', '*', '/', '%', '^'].includes(expression[i])) {
            // Evaluate operators based on precedence
            while (operators.length > 0 && getPrecedence(operators[operators.length - 1]) >= getPrecedence(expression[i])) {
                const operand2 = values.pop();
                const operand1 = values.pop();
                const op = operators.pop();
                values.push(applyOperator(op, operand1, operand2, error));
                if (error) return 0.0;
            }
            operators.push(expression[i]);
        } else {
            // Invalid character in the expression
            console.error("Error: Invalid character '" + expression[i] + "' in the expression.");
            error = true;
            return 0.0;
        }
    }

    // Evaluate remaining operators
    while (operators.length > 0) {
        const operand2 = values.pop();
        const operand1 = values.pop();
        const op = operators.pop();
        values.push(applyOperator(op, operand1, operand2, error));
        if (error) return 0.0;
    }

    // Check for an empty expression
    if (values.length === 0) {
        console.error("Error: Empty expression.");
        error = true;
        return 0.0;
    }

    return values[0];
}

/*button zero click functionality*/
document.querySelector("#btn-0").onclick = function(){

    const textbox = document.querySelector("#textbox");
    textbox.innerText = textbox.innerText + "0";
}

/*button one click functionality*/
document.querySelector("#btn-1").onclick = function(){

    const textbox = document.querySelector("#textbox");
    textbox.innerText = textbox.innerText + "1";
}

/*button two click functionality*/
document.querySelector("#btn-2").onclick = function(){

    const textbox = document.querySelector("#textbox");
    textbox.innerText = textbox.innerText + "2";
}

/*button three click functionality*/
document.querySelector("#btn-3").onclick = function(){

    const textbox = document.querySelector("#textbox");
    textbox.innerText = textbox.innerText + "3";
}

/*button four click functionality*/
document.querySelector("#btn-4").onclick = function(){

    const textbox = document.querySelector("#textbox");
    textbox.innerText = textbox.innerText + "4";
}

/*button five click functionality*/
document.querySelector("#btn-5").onclick = function(){

    const textbox = document.querySelector("#textbox");
    textbox.innerText = textbox.innerText + "5";
}

/*button six click functionality*/
document.querySelector("#btn-6").onclick = function(){

    const textbox = document.querySelector("#textbox");
    textbox.innerText = textbox.innerText + "6";
}

/*button seven click functionality*/
document.querySelector("#btn-7").onclick = function(){

    const textbox = document.querySelector("#textbox");
    textbox.innerText = textbox.innerText + "7";
}

/*button eight click functionality*/
document.querySelector("#btn-8").onclick = function(){

    const textbox = document.querySelector("#textbox");
    textbox.innerText = textbox.innerText + "8";
}

/*button nine click functionality*/
document.querySelector("#btn-9").onclick = function(){

    const textbox = document.querySelector("#textbox");
    textbox.innerText = textbox.innerText + "9";
}

/*button plus click functionality*/
document.querySelector("#btn-add").onclick = function(){

    const textbox = document.querySelector("#textbox");
    textbox.innerText = textbox.innerText + "+";
}

/*button minus click functionality*/
document.querySelector("#btn-sub").onclick = function(){

    const textbox = document.querySelector("#textbox");
    textbox.innerText = textbox.innerText + "-";
}

/*button times click functionality*/
document.querySelector("#btn-mult").onclick = function(){

    const textbox = document.querySelector("#textbox");
    textbox.innerText = textbox.innerText + "×";
}

/*button divide click functionality*/
document.querySelector("#btn-div").onclick = function(){

    const textbox = document.querySelector("#textbox");
    textbox.innerText = textbox.innerText + "÷";
}

/*button modulo click functionality*/
document.querySelector("#btn-mod").onclick = function(){

    const textbox = document.querySelector("#textbox");
    textbox.innerText = textbox.innerText + "%";
}

/*button power click functionality*/
document.querySelector("#btn-pow").onclick = function(){

    const textbox = document.querySelector("#textbox");
    textbox.innerText = textbox.innerText + "^";
}

/*button decimal click functionality*/
document.querySelector("#btn-dec").onclick = function(){

    const textbox = document.querySelector("#textbox");
    textbox.innerText = textbox.innerText + ".";
}

/*button open par click functionality*/
document.querySelector("#btn-open-par").onclick = function(){

    const textbox = document.querySelector("#textbox");
    textbox.innerText = textbox.innerText + "(";
}

/*button close par click functionality*/
document.querySelector("#btn-close-par").onclick = function(){

    const textbox = document.querySelector("#textbox");
    textbox.innerText = textbox.innerText + ")";
}

/*button delete click functionality*/
document.querySelector("#btn-del").onclick = function(){

    const textbox = document.querySelector("#textbox");
    textbox.innerText = textbox.innerText.slice(0, -1);
}

/*button clear click functionality*/
document.querySelector("#btn-clr").onclick = function(){

    const textbox = document.querySelector("#textbox");
    textbox.innerText = "";
}

/*button enter click functionality*/
document.querySelector("#btn-eq").onclick = function(){

    const textbox = document.querySelector("#textbox");
    textbox.innerText = evaluateExpression(replaceOperators(textbox.innerText));
}


document.addEventListener("keydown", e => {
    const keypresses = ["0", "1", "2", "3", "4", "5", '6', '7', '8', '9', '+', '-', '×', '%', '²', '^', '.', '(', ')']
    const textbox = document.querySelector("#textbox");
    if (keypresses.includes(e.key)) {
        textbox.innerText = textbox.innerText.concat(e.key);
    }

    else if (e.key == "Backspace") {
        textbox.innerText = textbox.innerText.slice(0, -1);
    }
})