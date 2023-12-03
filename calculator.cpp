#include <iostream>
#include <string>
#include <stack>
#include <cmath>
#include <cctype>

using namespace std;

// Function to get the precedence of an operator
int getPrecedence(char op) {
    if (op == '^')
        return 3;
    else if (op == '*' || op == '/' || op == '%')
        return 2;
    else if (op == '+' || op == '-')
        return 1;
    else
        return 0;
}

// Function to apply an operator to two operands
double applyOperator(char op, double operand1, double operand2, bool& error) {
    switch (op) {
        case '+':
            return operand1 + operand2;
        case '-':
            return operand1 - operand2;
        case '*':
            return operand1 * operand2;
        case '/':
            // Check for division by zero
            if (operand2 != 0) {
                return operand1 / operand2;
            } else {
                cerr << "Error: Division by zero." << endl;
                error = true;
                return 0.0;
            }
        case '%':
            // Check for modulo by zero
            if (operand2 != 0) {
                return fmod(operand1, operand2);
            } else {
                cerr << "Error: Modulo by zero." << endl;
                error = true;
                return 0.0;
            }
        case '^':
            return pow(operand1, operand2);
        default:
            cerr << "Error: Invalid operator" << endl;
            error = true;
            return 0.0;
    }
}

// Function to evaluate an arithmetic expression
double evaluateExpression(const string& expression, bool& error) {
    stack<double> values;  // Stack to store operands
    stack<char> operators; // Stack to store operators

    for (size_t i = 0; i < expression.length(); ++i) {
        // Check for whitespaces and skip them
        if (isspace(expression[i])) {
            continue;
        } else if (isdigit(expression[i])) {
            // Read and push operands onto the stack
            string operandStr;
            while (i < expression.length() && (isdigit(expression[i]) || expression[i] == '.')) {
                operandStr += expression[i++];
            }
            --i;
            values.push(stod(operandStr));
        } else if (expression[i] == '(') {
            operators.push('(');
        } else if (expression[i] == ')') {
            // Evaluate expressions within parentheses
            while (!operators.empty() && operators.top() != '(') {
                double operand2 = values.top();
                values.pop();
                double operand1 = values.top();
                values.pop();
                char op = operators.top();
                operators.pop();
                values.push(applyOperator(op, operand1, operand2, error));
                if (error) return 0.0;
            }
            // Check for unmatched closing parenthesis
            if (!operators.empty()) {
                operators.pop(); // Pop '('
            } else {
                cerr << "Error: Unmatched closing parenthesis." << endl;
                error = true;
                return 0.0;
            }
        } else if (expression[i] == '+' || expression[i] == '-' || expression[i] == '*' || expression[i] == '/' ||
                   expression[i] == '%' || expression[i] == '^') {
            // Evaluate operators based on precedence
            while (!operators.empty() && getPrecedence(operators.top()) >= getPrecedence(expression[i])) {
                double operand2 = values.top();
                values.pop();
                double operand1 = values.top();
                values.pop();
                char op = operators.top();
                operators.pop();
                values.push(applyOperator(op, operand1, operand2, error));
                if (error) return 0.0;
            }
            operators.push(expression[i]);
        } else {
            // Invalid character in the expression
            cerr << "Error: Invalid character '" << expression[i] << "' in the expression." << endl;
            error = true;
            return 0.0;
        }
    }

    // Evaluate remaining operators
    while (!operators.empty()) {
        double operand2 = values.top();
        values.pop();
        double operand1 = values.top();
        values.pop();
        char op = operators.top();
        operators.pop();
        values.push(applyOperator(op, operand1, operand2, error));
        if (error) return 0.0;
    }

    // Check for an empty expression
    if (values.empty()) {
        cerr << "Error: Empty expression." << endl;
        error = true;
        return 0.0;
    }

    return values.top();
}

// Main function
int main() {
    string expression;

    cout << "Enter an arithmetic expression: ";
    getline(cin, expression);

    bool error = false;
    double result = evaluateExpression(expression, error);

    if (!error) {
        cout << "Result: " << result << endl;
    } else {
        cerr << "Error encountered during evaluation." << endl;
    }

    return 0;
}
