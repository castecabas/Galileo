import { Router } from 'express';
import { ConsultarPrestamos , ConsultarPrestamoPorID, CrearPrestamo, ModificarPrestamoPorID, EliminarPrestamoPorID} from '../Controllers/Prestamos.controller';
// ---
const router = Router();
router.get('/prestamos', ConsultarPrestamos);
router.get('/prestamos/:id', ConsultarPrestamoPorID);
router.post('/prestamos', CrearPrestamo);
router.put('/prestamos/:id', ModificarPrestamoPorID);
router.delete('/prestamos/:id', EliminarPrestamoPorID);

export default router;