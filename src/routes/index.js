"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/index.ts
const express_1 = require("express");
const inversionistaController_1 = require("../controllers/inversionistaController");
const conceptoInversionController_1 = require("../controllers/conceptoInversionController");
const inversionRealizadaController_1 = require("../controllers/inversionRealizadaController");
const router = (0, express_1.Router)();
// Rutas para Inversionistas
router.get('/inversionistas', inversionistaController_1.getInversionistas);
router.post('/inversionistas', inversionistaController_1.createInversionista);
router.put('/inversionistas/:id', inversionistaController_1.updateInversionista);
router.delete('/inversionistas/:id', inversionistaController_1.deleteInversionista);
router.patch('/inversionistas/:id/estado', inversionistaController_1.updateEstadoInversionista);
// Rutas para Conceptos de Inversión
router.get('/conceptos-inversion', conceptoInversionController_1.getConceptosInversion);
router.post('/conceptos-inversion', conceptoInversionController_1.createConceptoInversion);
router.put('/conceptos-inversion/:id', conceptoInversionController_1.updateConceptoInversion);
router.delete('/conceptos-inversion/:id', conceptoInversionController_1.deleteConceptoInversion);
router.patch('/conceptos-inversion/:id/estado', conceptoInversionController_1.updateEstadoConceptoInversion);
// Rutas para Inversiones Realizadas
router.get('/inversiones-realizadas', inversionRealizadaController_1.getInversionesRealizadas);
router.post('/inversiones-realizadas', inversionRealizadaController_1.createInversionRealizada);
router.put('/inversiones-realizadas/:id', inversionRealizadaController_1.updateInversionRealizada);
router.delete('/inversiones-realizadas/:id', inversionRealizadaController_1.deleteInversionRealizada);
router.patch('/inversiones-realizadas/:id/estado', inversionRealizadaController_1.updateEstadoInversionRealizada);
exports.default = router;
