import { Router } from 'express';
import { ConsultarGeneros, CrearGenero, EliminarGeneroPorID } from '../Controllers/Generos.controller';
// ---

const router = Router();
router.get('/generos', ConsultarGeneros);
router.post('/generos', CrearGenero);
router.delete('/generos/:id', EliminarGeneroPorID);

export default router;