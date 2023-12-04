// index.js

// Event listener for numeric and operator buttons
document.querySelectorAll('.btn-num, .btn-other').forEach(button => {
    button.addEventListener('click', () => {
        // Append the clicked button value to the input field
        document.getElementById('equation').value += button.textContent;
    });
});

// Event listener for the CLR (clear) button
document.getElementById('btn-clr').addEventListener('click', () => {
    // Clear the input field
    document.getElementById('equation').value = '';
});

// Event listener for the "=" button
document.getElementById('btn-eq').addEventListener('click', () => {
    // Get the equation from the input field
    const equation = document.getElementById('equation').value;

    // Send the equation to the C++ backend using fetch
    fetch('/calculate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ equation: equation }),
    })
    .then(response => response.json())
    .then(data => {
        // Display the result on the calculator display
        document.getElementById('equation').value = data.result;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// Function to call the C++ backend
function calculateExpression(expression) {
    // Use WebAssembly or other methods to call the C++ function
    // For simplicity, assume the function is available globally
    return Module.ccall('calculateExpression', 'number', ['string'], [expression]);
}

// Event listener for the "=" button
document.querySelector("#btn-eq").onclick = function () {
    const textbox = document.querySelector("#textbox");
    const expression = textbox.value;

    // Call the C++ backend
    const result = calculateExpression(expression);

    // Update the UI with the result or handle errors
    textbox.value = result;
};
