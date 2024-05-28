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
    output: process.stdout,
});
function agregarTransaccion(entornoId) {
    return __awaiter(this, void 0, void 0, function* () {
        rl.question('Ingrese la descripción de la transacción: ', (descripcion) => __awaiter(this, void 0, void 0, function* () {
            yield prisma.transaccion.create({
                data: {
                    descripcion,
                    entornoId,
                },
            });
            console.log('Transacción agregada exitosamente');
            rl.close();
        }));
    });
}
function mostrarMenu() {
    return __awaiter(this, void 0, void 0, function* () {
        const entornos = yield prisma.entorno.findMany();
        console.log('Seleccione un entorno:');
        entornos.forEach((entorno, index) => {
            console.log(`${index + 1}. ${entorno.descripcion}`);
        });
        rl.question('Seleccione una opción: ', (opcion) => {
            const seleccion = parseInt(opcion);
            if (seleccion > 0 && seleccion <= entornos.length) {
                const entorno = entornos[seleccion - 1];
                agregarTransaccion(entorno.id);
            }
            else {
                console.log('Opción no válida');
                rl.close();
            }
        });
    });
}
mostrarMenu();
