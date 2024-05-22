"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEstadoConceptoInversion = exports.deleteConceptoInversion = exports.updateConceptoInversion = exports.createConceptoInversion = exports.getConceptosInversion = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getConceptosInversion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conceptosInversion = yield prisma.conceptoInversion.findMany({
            where: { estado: 'Activo' }
        });
        res.json(conceptosInversion);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener conceptos de inversión' });
    }
});
exports.getConceptosInversion = getConceptosInversion;
const createConceptoInversion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { concepto, detalle } = req.body;
        if (!concepto || !detalle) {
            return res.status(400).json({ error: 'Concepto y detalle son requeridos' });
        }
        const nuevoConceptoInversion = yield prisma.conceptoInversion.create({
            data: { concepto, detalle, estado: 'Activo' }
        });
        res.json(nuevoConceptoInversion);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al crear concepto de inversión' });
    }
});
exports.createConceptoInversion = createConceptoInversion;
const updateConceptoInversion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { concepto, detalle } = req.body;
        if (!concepto || !detalle) {
            return res.status(400).json({ error: 'Concepto y detalle son requeridos' });
        }
        const conceptoInversionActualizado = yield prisma.conceptoInversion.update({
            where: { id: Number(id) },
            data: { concepto, detalle }
        });
        res.json(conceptoInversionActualizado);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al actualizar concepto de inversión' });
    }
});
exports.updateConceptoInversion = updateConceptoInversion;
const deleteConceptoInversion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const conceptoInversionEliminado = yield prisma.conceptoInversion.update({
            where: { id: Number(id) },
            data: { estado: 'Eliminado' }
        });
        res.json(conceptoInversionEliminado);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al eliminar concepto de inversión' });
    }
});
exports.deleteConceptoInversion = deleteConceptoInversion;
// Método para actualizar el estado de un concepto de inversión
const updateEstadoConceptoInversion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        if (!estado || !['Activo', 'Pendiente', 'Eliminado'].includes(estado)) {
            return res.status(400).json({ error: 'Estado no válido. Debe ser Activo, Pendiente o Eliminado' });
        }
        const conceptoInversionActualizado = yield prisma.conceptoInversion.update({
            where: { id: Number(id) },
            data: { estado }
        });
        res.json(conceptoInversionActualizado);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al actualizar el estado del concepto de inversión' });
    }
});
exports.updateEstadoConceptoInversion = updateEstadoConceptoInversion;
