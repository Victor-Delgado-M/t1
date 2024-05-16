"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clienteController_1 = require("../controllers/clienteController");
const router = (0, express_1.Router)();
router.get('/', clienteController_1.getClientes);
router.post('/', clienteController_1.createCliente);
router.put('/:id', clienteController_1.updateCliente); // Asegúrate de que la ruta tiene ':id'
router.delete('/:id', clienteController_1.deleteCliente); // Asegúrate de que la ruta tiene ':id'
exports.default = router;
