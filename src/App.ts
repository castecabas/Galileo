import express from "express";
import cors from 'cors';

import LibrosRoutes from './Routes/Libros.routes';
import GenerosRoutes from './Routes/Generos.routes';
import AutoresRoutes from './Routes/Autores.routes';
import PrestamosRoutes from './Routes/Prestamos.routes';
import ClientesRoutes from './Routes/Clientes.routes';

import MotivosRoutes from './Routes/Motivos.routes';
import MultasRoutes from './Routes/Multas.routes';
// ---

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

// asignar rutas
app.use('/biblioteca',LibrosRoutes);
app.use('/biblioteca',GenerosRoutes);
app.use('/biblioteca',AutoresRoutes);
app.use('/biblioteca',PrestamosRoutes);
app.use('/biblioteca',ClientesRoutes);
app.use('/biblioteca',MotivosRoutes);
app.use('/biblioteca',MultasRoutes);
// ---
app.get("/biblioteca", (req, res) => {
    res.sendFile(__dirname + "/Templates/index.html");
  });

app.use((req, res, next) => {
    res.status(404).json({ message: 'Ruta no encontrada' })
})

export default app;