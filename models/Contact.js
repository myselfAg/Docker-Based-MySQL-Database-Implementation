const pool = require('../config/db');

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

function validate({ name, email, phone }) {
  const errors = [];

  if (!name || !name.trim()) errors.push('Name is required');
  if (!email || !email.trim()) errors.push('Email is required');
  else if (!EMAIL_REGEX.test(email.trim())) errors.push('Please enter a valid email address');
  if (!phone || !phone.trim()) errors.push('Phone number is required');

  return errors;
}

async function create({ name, email, phone }) {
  const errors = validate({ name, email, phone });
  if (errors.length) {
    const err = new Error(errors.join(', '));
    err.isValidation = true;
    throw err;
  }

  const [result] = await pool.query(
    'INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)',
    [name.trim(), email.trim().toLowerCase(), phone.trim()]
  );

  const [rows] = await pool.query('SELECT * FROM contacts WHERE id = ?', [result.insertId]);
  return rows[0];
}

async function findAll() {
  const [rows] = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
  return rows;
}

module.exports = { create, findAll };
