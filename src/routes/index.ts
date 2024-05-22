// src/routes/index.ts
import { Router } from 'express';
import {
    getInversionistas,
    createInversionista,
    updateInversionista,
    deleteInversionista,
    updateEstadoInversionista
} from '../controllers/inversionistaController';
import {
    getConceptosInversion,
    createConceptoInversion,
    updateConceptoInversion,
    deleteConceptoInversion,
    updateEstadoConceptoInversion
} from '../controllers/conceptoInversionController';
import {
    getInversionesRealizadas,
    createInversionRealizada,
    updateInversionRealizada,
    deleteInversionRealizada,
    updateEstadoInversionRealizada
} from '../controllers/inversionRealizadaController';

const router = Router();

// Rutas para Inversionistas
router.get('/inversionistas', getInversionistas);
router.post('/inversionistas', createInversionista);
router.put('/inversionistas/:id', updateInversionista);
router.delete('/inversionistas/:id', deleteInversionista);
router.patch('/inversionistas/:id/estado', updateEstadoInversionista);

// Rutas para Conceptos de Inversión
router.get('/conceptos-inversion', getConceptosInversion);
router.post('/conceptos-inversion', createConceptoInversion);
router.put('/conceptos-inversion/:id', updateConceptoInversion);
router.delete('/conceptos-inversion/:id', deleteConceptoInversion);
router.patch('/conceptos-inversion/:id/estado', updateEstadoConceptoInversion);

// Rutas para Inversiones Realizadas
router.get('/inversiones-realizadas', getInversionesRealizadas);
router.post('/inversiones-realizadas', createInversionRealizada);
router.put('/inversiones-realizadas/:id', updateInversionRealizada);
router.delete('/inversiones-realizadas/:id', deleteInversionRealizada);
router.patch('/inversiones-realizadas/:id/estado', updateEstadoInversionRealizada);

export default router;
