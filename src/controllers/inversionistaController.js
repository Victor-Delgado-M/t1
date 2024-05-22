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
exports.updateEstadoInversionista = exports.deleteInversionista = exports.updateInversionista = exports.createInversionista = exports.getInversionistas = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getInversionistas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inversionistas = yield prisma.inversionista.findMany({
            where: { estado: 'Activo' }
        });
        res.json(inversionistas);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener inversionistas' });
    }
});
exports.getInversionistas = getInversionistas;
const createInversionista = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, identificacion } = req.body;
        if (!nombre || !identificacion) {
            return res.status(400).json({ error: 'Nombre e identificación son requeridos' });
        }
        const nuevoInversionista = yield prisma.inversionista.create({
            data: { nombre, identificacion, estado: 'Activo' }
        });
        res.json(nuevoInversionista);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al crear inversionista' });
    }
});
exports.createInversionista = createInversionista;
const updateInversionista = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { nombre, identificacion } = req.body;
        if (!nombre || !identificacion) {
            return res.status(400).json({ error: 'Nombre e identificación son requeridos' });
        }
        const inversionistaActualizado = yield prisma.inversionista.update({
            where: { id: Number(id) },
            data: { nombre, identificacion }
        });
        res.json(inversionistaActualizado);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al actualizar inversionista' });
    }
});
exports.updateInversionista = updateInversionista;
const deleteInversionista = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const inversionistaEliminado = yield prisma.inversionista.update({
            where: { id: Number(id) },
            data: { estado: 'Eliminado' }
        });
        res.json(inversionistaEliminado);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al eliminar inversionista' });
    }
});
exports.deleteInversionista = deleteInversionista;
// Método para actualizar el estado de un inversionista
const updateEstadoInversionista = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        if (!estado || !['Activo', 'Pendiente', 'Eliminado'].includes(estado)) {
            return res.status(400).json({ error: 'Estado no válido. Debe ser Activo, Pendiente o Eliminado' });
        }
        const inversionistaActualizado = yield prisma.inversionista.update({
            where: { id: Number(id) },
            data: { estado }
        });
        res.json(inversionistaActualizado);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al actualizar el estado del inversionista' });
    }
});
exports.updateEstadoInversionista = updateEstadoInversionista;
