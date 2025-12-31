document.getElementById('dataForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;
    const messageDiv = document.getElementById('message');

    const data = { name, email, age };

    try {
        const response = await fetch('/submit-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        messageDiv.style.display = 'block';
        if (result.success) {
            messageDiv.className = 'success';
            messageDiv.textContent = result.message;
            document.getElementById('dataForm').reset();
        } else {
            messageDiv.className = 'error';
            messageDiv.textContent = result.message;
        }
    } catch (error) {
        console.error('Error:', error);
        messageDiv.style.display = 'block';
        messageDiv.className = 'error';
        messageDiv.textContent = 'An error occurred while sending data.';
    }
});
