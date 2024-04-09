import { Router } from 'express';
import { ConsultarAutores, ConsultarAutorPorID, CrearAutor, EliminarAutorPorID, ModificarAutorPorID } from '../Controllers/Autores.controller';
// ---
const router = Router();
router.get('/autores', ConsultarAutores);
router.get('/autores/:id', ConsultarAutorPorID);
router.post('/autores', CrearAutor);
router.put('/autores/:id', ModificarAutorPorID);
router.delete('/autores/:id', EliminarAutorPorID);

export default router;