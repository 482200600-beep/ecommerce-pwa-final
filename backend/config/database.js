// backend/config/database.js - CONFIGURACIÓN CORREGIDA PARA PUERTO 3307
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Vacío por defecto en XAMPP
  database: 'ecommerce_db',
  port: 3307, // ⚠️ IMPORTANTE: Usar puerto 3307 en lugar de 3306
  connectTimeout: 60000
});

connection.connect((err) => {
  if (err) {
    console.error('Error conectando a MySQL:', err);
    return;
  }
  console.log('✅ Conectado a MySQL en puerto 3307');
});
