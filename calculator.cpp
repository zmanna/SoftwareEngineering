#include <iostream>
#include <string>
#include <stack>
#include <cmath>
#include <cctype>

using namespace std;

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

double applyOperator(char op, double operand1, double operand2, bool& error, string& errorMsg) {
    switch (op) {
        case '+':
            return operand1 + operand2;
        case '-':
            return operand1 - operand2;
        case '*':
            return operand1 * operand2;
        case '/':
            if (operand2 == 0) {
                errorMsg = "Division by zero error.";
                error = true;
                return 0;
            }
            return operand1 / operand2;
        case '%':
            if (operand2 == 0) {
                errorMsg = "Modulo by zero error.";
                error = true;
                return 0;
            }
            return fmod(operand1, operand2);
        case '^':
            return pow(operand1, operand2);
        default:
            errorMsg = "Invalid operator '" + string(1, op) + "'.";
            error = true;
            return 0;
    }
}

void processOperator(stack<double>& values, stack<char>& operators, bool& error, string& errorMsg) {
    if (values.size() < 2) {
        errorMsg = "Insufficient operands.";
        error = true;
        return;
    }
    double operand2 = values.top(); values.pop();
    double operand1 = values.top(); values.pop();
    char op = operators.top(); operators.pop();
    values.push(applyOperator(op, operand1, operand2, error, errorMsg));
}

double evaluateExpression(const string& expression, bool& error, string& errorMsg) {
    stack<double> values;
    stack<char> operators;

    for (size_t i = 0; i < expression.length(); ++i) {
        if (isspace(expression[i])) {
            continue;
        } else if (isdigit(expression[i]) || expression[i] == '.') {
            string operandStr;
            while (i < expression.length() && (isdigit(expression[i]) || expression[i] == '.')) {
                operandStr += expression[i++];
            }
            --i;
            values.push(stod(operandStr));
        } else if (expression[i] == '(') {
            operators.push('(');
        } else if (expression[i] == ')') {
            while (!operators.empty() && operators.top() != '(') {
                processOperator(values, operators, error, errorMsg);
                if (error) return 0;
            }
            if (operators.empty()) {
                errorMsg = "Unmatched closing parenthesis.";
                error = true;
                return 0;
            }
            operators.pop();
        } else if (getPrecedence(expression[i]) > 0) {
            while (!operators.empty() && getPrecedence(operators.top()) >= getPrecedence(expression[i])) {
                processOperator(values, operators, error, errorMsg);
                if (error) return 0;
            }
            operators.push(expression[i]);
        } else {
            errorMsg = "Invalid character '" + string(1, expression[i]) + "'.";
            error = true;
            return 0;
        }
    }

    while (!operators.empty()) {
        processOperator(values, operators, error, errorMsg);
        if (error) return 0;
    }

    if (values.size() != 1) {
        errorMsg = "Invalid expression or unmatched opening parenthesis.";
        error = true;
        return 0;
    }

    return values.top();
}

int main() {
    string expression;

    while (true) {
        cout << "Enter an arithmetic expression (or type 'quit' to exit): ";
        getline(cin, expression);

        if (expression == "quit") {
            break; // Exit the loop if the user types 'quit'
        }

        bool error = false;
        string errorMsg;
        double result = evaluateExpression(expression, error, errorMsg);

        if (!error) {
            cout << "Result: " << result << endl;
        } else {
            cerr << "Error encountered: " << errorMsg << endl;
        }

        cout << endl; // Adding a newline for better readability
    }

    cout << "Exiting the calculator." << endl;
    return 0;
}
