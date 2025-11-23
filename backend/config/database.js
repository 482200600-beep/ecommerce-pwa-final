// backend/config/database.js
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Usuario por defecto de XAMPP
  password: '', // Password por defecto (vacío en XAMPP)
  database: 'ecommerce_db',
  port: 3306
});

connection.connect((err) => {
  if (err) {
    console.error('Error conectando a MySQL:', err);
    return;
  }
  console.log('✅ Conectado a MySQL con XAMPP');
});

// Promisify para usar async/await
const db = connection.promise();

module.exports = db;
