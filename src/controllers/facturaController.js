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
exports.deleteFactura = exports.updateFactura = exports.createFactura = exports.getFacturas = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getFacturas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const facturas = yield prisma.factura.findMany({
        where: { estado: 'Activo' },
        include: { cliente: true, productos: true }
    });
    res.json(facturas);
});
exports.getFacturas = getFacturas;
const createFactura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { clienteId, productos } = req.body;
    const factura = yield prisma.factura.create({
        data: {
            clienteId,
            productos: {
                create: productos.map((producto) => ({
                    productoId: producto.id,
                    cantidad: producto.cantidad
                }))
            },
            estado: 'Activo'
        }
    });
    res.json(factura);
});
exports.createFactura = createFactura;
const updateFactura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { estado } = req.body;
    const factura = yield prisma.factura.update({
        where: { id: parseInt(id) },
        data: { estado }
    });
    res.json(factura);
});
exports.updateFactura = updateFactura;
const deleteFactura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const factura = yield prisma.factura.update({
        where: { id: parseInt(id) },
        data: { estado: 'Eliminado' }
    });
    res.json(factura);
});
exports.deleteFactura = deleteFactura;
