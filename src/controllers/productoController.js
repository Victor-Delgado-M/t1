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
exports.deleteProducto = exports.updateProducto = exports.createProducto = exports.getProductos = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productos = yield prisma.producto.findMany({
        where: { estado: 'Activo' }
    });
    res.json(productos);
});
exports.getProductos = getProductos;
const createProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, precio } = req.body;
    const producto = yield prisma.producto.create({
        data: { nombre, precio, estado: 'Activo' }
    });
    res.json(producto);
});
exports.createProducto = createProducto;
const updateProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombre, precio, estado } = req.body;
    const producto = yield prisma.producto.update({
        where: { id: parseInt(id) },
        data: { nombre, precio, estado }
    });
    res.json(producto);
});
exports.updateProducto = updateProducto;
const deleteProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const producto = yield prisma.producto.update({
        where: { id: parseInt(id) },
        data: { estado: 'Eliminado' }
    });
    res.json(producto);
});
exports.deleteProducto = deleteProducto;
