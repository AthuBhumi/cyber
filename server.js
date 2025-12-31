const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Route to handle form submission
app.post('/submit-data', (req, res) => {
    const { name, email, age } = req.body;

    if (!name || !email || !age) {
        return res.status(400).json({ success: false, message: 'Please fill in all fields.' });
    }

    // Sanitize inputs (basic example) to prevent SQL injection in the file content
    const safeName = name.replace(/'/g, "''");
    const safeEmail = email.replace(/'/g, "''");
    const safeAge = parseInt(age, 10);

    // Create SQL statement
    const sqlStatement = `INSERT INTO users (name, email, age) VALUES ('${safeName}', '${safeEmail}', ${safeAge});\n`;

    // Append to data.sql file
    const filePath = path.join(__dirname, 'data.sql');
    
    fs.appendFile(filePath, sqlStatement, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return res.status(500).json({ success: false, message: 'Failed to save data.' });
        }
        console.log('Data saved to data.sql');
        res.json({ success: true, message: 'Data successfully saved to SQL file!' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
