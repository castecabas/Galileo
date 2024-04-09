import express from "express";
import cors from 'cors';
// importar rutas
import LibrosRoutes from './Routes/Libros.routes';
// ---

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

// asignar rutas
app.use('/biblioteca',LibrosRoutes);
// ---

app.use((req, res, next) => {
    console.log('Ruta no encontrada');
    res.status(404).json({ message: 'Ruta no encontrada' })
})

export default app;