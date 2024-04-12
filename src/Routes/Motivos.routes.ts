import { Router } from "express";
import {ConsultarMotivos,CrearMotivo,ModificarMotivoPorID,EliminarMotivoPorID} from '../Controllers/Motivos.controller'
// ---
const router=Router();
router.get('/motivos', ConsultarMotivos);
router.post('/motivos', CrearMotivo);
router.put('/motivos/:id', ModificarMotivoPorID);
router.delete('/motivos/:id', EliminarMotivoPorID);

export default router;