// backend/server.js - CON CORS CONFIGURADO
import express from 'express';
import cors from 'cors';
import productRoutes from './routes/products.js';

const app = express();
const PORT = 5000;

// Configurar CORS para aceptar requests de Vercel
app.use(cors({
  origin: [
    'http://localhost:5173', // Desarrollo local
    'https://tu-app.vercel.app', // ⚠️ REEMPLAZA con tu URL de Vercel
    'https://*.vercel.app'
  ],
  credentials: true
}));

app.use(express.json());

// Rutas
app.use('/api/products', productRoutes);

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend funcionando',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, '0.0.0.0', () => { // ⚠️ Escuchar en todas las interfaces
  console.log(`🚀 Backend corriendo en: http://localhost:${PORT}`);
  console.log(`🌐 Accesible desde: https://tu-app.vercel.app`);
});
