"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const client_1 = require("@prisma/client");
const clienteRoutes_1 = __importDefault(require("./routes/clienteRoutes"));
const productoRoutes_1 = __importDefault(require("./routes/productoRoutes"));
const facturaRoutes_1 = __importDefault(require("./routes/facturaRoutes"));
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use((0, body_parser_1.json)());
// Rutas
app.use('/api/clientes', clienteRoutes_1.default);
app.use('/api/productos', productoRoutes_1.default);
app.use('/api/facturas', facturaRoutes_1.default);
// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
