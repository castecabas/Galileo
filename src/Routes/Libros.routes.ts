import { Router } from 'express';
import { ConsultarLibros, CrearLibro, ConsultarLibroPorID, EliminarLibroPorID } from '../Controllers/Libros.controller';
// ---
const router = Router();
router.get('/libros', ConsultarLibros);
router.get('/libros/:id', ConsultarLibroPorID);
router.post('/libros', CrearLibro);
router.delete('/libros/:id', EliminarLibroPorID);

export default router