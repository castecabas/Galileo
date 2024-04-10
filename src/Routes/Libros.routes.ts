import { Router } from 'express';
import { ConsultarLibros, CrearLibro, ConsultarLibroPorID, ModificarLibroPorID, EliminarLibroPorID } from '../Controllers/Libros.controller';
// ---
const router = Router();
router.get('/libros', ConsultarLibros);
router.get('/libros/:id', ConsultarLibroPorID);
router.post('/libros', CrearLibro);
router.put('/libros/:id', ModificarLibroPorID);
router.delete('/libros/:id', EliminarLibroPorID);

export default router