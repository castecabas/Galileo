import { Router } from 'express';
import {ConsultarClientes,ConsultarClientePorID,CrearCliente,ModificarClientePorID,EliminarClientePorID} from '../Controllers/Clientes.controller';
// ---
const router = Router();
router.get('/clientes', ConsultarClientes);
router.get('/clientes/:id', ConsultarClientePorID);
router.post('/clientes', CrearCliente);
router.put('/clientes/:id', ModificarClientePorID);
router.delete('/clientes/:id', EliminarClientePorID);

export default router;