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
exports.deleteCliente = exports.updateCliente = exports.createCliente = exports.getClientes = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clientes = yield prisma.cliente.findMany({
        where: { estado: 'Activo' }
    });
    res.json(clientes);
});
exports.getClientes = getClientes;
const createCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre } = req.body;
    const cliente = yield prisma.cliente.create({
        data: { nombre, estado: 'Activo' }
    });
    res.json(cliente);
});
exports.createCliente = createCliente;
const updateCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombre, estado } = req.body;
    const cliente = yield prisma.cliente.update({
        where: { id: parseInt(id) }, // Asegúrate de convertir el id a número
        data: { nombre, estado }
    });
    res.json(cliente);
});
exports.updateCliente = updateCliente;
const deleteCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const cliente = yield prisma.cliente.update({
        where: { id: parseInt(id) }, // Asegúrate de convertir el id a número
        data: { estado: 'Eliminado' }
    });
    res.json(cliente);
});
exports.deleteCliente = deleteCliente;
