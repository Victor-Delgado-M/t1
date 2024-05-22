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
exports.updateEstadoInversionRealizada = exports.deleteInversionRealizada = exports.updateInversionRealizada = exports.createInversionRealizada = exports.getInversionesRealizadas = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getInversionesRealizadas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inversionesRealizadas = yield prisma.inversionRealizada.findMany({
            where: { estado: 'Activo' },
            include: {
                inversionista: true,
                conceptoInversion: true
            }
        });
        res.json(inversionesRealizadas);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener inversiones realizadas' });
    }
});
exports.getInversionesRealizadas = getInversionesRealizadas;
const createInversionRealizada = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { inversionistaId, conceptoInversionId, monto, fecha } = req.body;
        if (!inversionistaId || !conceptoInversionId || !monto || !fecha) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }
        const nuevaInversionRealizada = yield prisma.inversionRealizada.create({
            data: { inversionistaId, conceptoInversionId, monto, fecha, estado: 'Activo' }
        });
        res.json(nuevaInversionRealizada);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al crear inversión realizada' });
    }
});
exports.createInversionRealizada = createInversionRealizada;
const updateInversionRealizada = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { inversionistaId, conceptoInversionId, monto, fecha } = req.body;
        if (!inversionistaId || !conceptoInversionId || !monto || !fecha) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }
        const inversionRealizadaActualizada = yield prisma.inversionRealizada.update({
            where: { id: Number(id) },
            data: { inversionistaId, conceptoInversionId, monto, fecha }
        });
        res.json(inversionRealizadaActualizada);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al actualizar inversión realizada' });
    }
});
exports.updateInversionRealizada = updateInversionRealizada;
const deleteInversionRealizada = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const inversionRealizadaEliminada = yield prisma.inversionRealizada.update({
            where: { id: Number(id) },
            data: { estado: 'Eliminado' }
        });
        res.json(inversionRealizadaEliminada);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al eliminar inversión realizada' });
    }
});
exports.deleteInversionRealizada = deleteInversionRealizada;
const updateEstadoInversionRealizada = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        if (!estado || !['Activo', 'Pendiente', 'Eliminado'].includes(estado)) {
            return res.status(400).json({ error: 'Estado no válido. Debe ser Activo, Pendiente o Eliminado' });
        }
        const inversionRealizadaActualizada = yield prisma.inversionRealizada.update({
            where: { id: Number(id) },
            data: { estado }
        });
        res.json(inversionRealizadaActualizada);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al actualizar el estado de la inversión realizada' });
    }
});
exports.updateEstadoInversionRealizada = updateEstadoInversionRealizada;
