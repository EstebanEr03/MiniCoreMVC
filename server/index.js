import express from 'express';
import cors from 'cors';
import expenseRoutes from './routes/expenseRoutes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', expenseRoutes);

// Puerto de conexión
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
