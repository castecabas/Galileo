import { Router } from "express";
import { ConsultarMultas, CrearMulta, ModificarMultaPorID,EliminarMultaPorID} from '../Controllers/Multas.controller';
// ---
const router=Router();
router.get('/multas', ConsultarMultas);
router.post('/multas', CrearMulta);
router.put('/multas/:id', ModificarMultaPorID);
router.delete('/multas/:id', EliminarMultaPorID);
export default router;