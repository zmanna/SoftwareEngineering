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
