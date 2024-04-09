import { Router } from 'express';
import { ConsultarCategorias, CrearCategoria, EliminarCategoriaoPorID } from '../Controllers/Categorias.controller';
// ---

const router = Router();
router.get('/categorias', ConsultarCategorias);
router.post('/categorias', CrearCategoria);
router.delete('/categorias/:id', EliminarCategoriaoPorID);

export default router;