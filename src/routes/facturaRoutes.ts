import { Router } from 'express';
import { getFacturas, createFactura, updateFactura, deleteFactura } from '../controllers/facturaController';

const router = Router();

router.get('/', getFacturas);
router.post('/', createFactura);
router.put('/:id', updateFactura);
router.delete('/:id', deleteFactura);

export default router;
