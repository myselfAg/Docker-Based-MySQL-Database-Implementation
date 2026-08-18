require('dotenv').config();
const express = require('express');
const path = require('path');
const pool = require('./config/db');
const Contact = require('./models/Contact');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

pool
  .query('SELECT 1')
  .then(() => console.log('Connected to MySQL'))
  .catch((err) => {
    console.error('MySQL connection error:', err.message);
    process.exit(1);
  });

app.post('/api/contacts', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const contact = await Contact.create({ name, email, phone });
    res.status(201).json({ message: 'Contact saved successfully', contact });
  } catch (err) {
    if (err.isValidation) {
      return res.status(400).json({ error: err.message });
    }
    console.error(err);
    res.status(500).json({ error: 'Something went wrong while saving the contact.' });
  }
});

app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    res.json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong while fetching contacts.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
