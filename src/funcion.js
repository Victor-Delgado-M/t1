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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const readline_1 = __importDefault(require("readline"));
const prisma = new client_1.PrismaClient();
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
function agregarCliente() {
    return __awaiter(this, void 0, void 0, function* () {
        rl.question('Ingrese el nombre del cliente: ', (nombre) => __awaiter(this, void 0, void 0, function* () {
            const cliente = yield prisma.cliente.create({
                data: { nombre }
            });
            console.log('Cliente creado:', cliente);
            mostrarMenu(); // Vuelve al menú principal después de la operación
        }));
    });
}
function agregarTransacciones() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < 10; i++) {
            console.log(`Transacción ${i + 1}:`);
            const clienteId = yield new Promise(resolve => {
                rl.question('Ingrese el ID del cliente: ', (id) => resolve(parseInt(id)));
            });
            const descripcion = yield new Promise(resolve => {
                rl.question('Ingrese la descripción de la transacción: ', resolve);
            });
            const monto = yield new Promise(resolve => {
                rl.question('Ingrese el monto de la transacción: ', (monto) => resolve(parseFloat(monto)));
            });
            const transaccion = yield prisma.transaccion.create({
                data: {
                    clienteId,
                    descripcion,
                    monto
                }
            });
            console.log('Transacción creada:', transaccion);
        }
        mostrarMenu();
    });
}
function buscarTransaccion() {
    return __awaiter(this, void 0, void 0, function* () {
        rl.question('Ingrese el ID de la transacción: ', (id) => __awaiter(this, void 0, void 0, function* () {
            const transaccion = yield prisma.transaccion.findUnique({
                where: { id: parseInt(id) },
                include: { cliente: true }
            });
            if (transaccion) {
                console.log('Transacción encontrada:', transaccion);
            }
            else {
                console.log('Transacción no encontrada.');
            }
            mostrarMenu();
        }));
    });
}
function consultarTransacciones() {
    return __awaiter(this, void 0, void 0, function* () {
        const transacciones = yield prisma.transaccion.findMany({
            include: {
                cliente: true
            }
        });
        console.log('Todas las transacciones:');
        transacciones.forEach(t => {
            console.log(`ID: ${t.id}, Cliente: ${t.cliente.nombre}, Descripción: ${t.descripcion}, Monto: ${t.monto}`);
        });
        mostrarMenu();
    });
}
function mostrarMenu() {
    console.log("\nSeleccione una opción:");
    console.log("1: Agregar Cliente");
    console.log("2: Agregar 10 Transacciones");
    console.log("3: Buscar Transacción por ID");
    console.log("4: Consultar Todas las Transacciones");
    console.log("5: Salir");
    rl.question('Opción: ', (opcion) => {
        switch (opcion) {
            case '1':
                agregarCliente();
                break;
            case '2':
                agregarTransacciones();
                break;
            case '3':
                buscarTransaccion();
                break;
            case '4':
                consultarTransacciones();
                break;
            case '5':
                console.log("Saliendo...");
                rl.close();
                prisma.$disconnect();
                break;
            default:
                console.log("Opción no válida.");
                mostrarMenu();
                break;
        }
    });
}
mostrarMenu(); // Iniciar el programa mostrando el menú
