"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const client_1 = require("@prisma/client");
const readline = __importStar(require("readline"));
const prisma = new client_1.PrismaClient();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// Insertar inversionistas y conceptos de inversión para asegurar que existen
function inicializarDatos() {
    return __awaiter(this, void 0, void 0, function* () {
        const inversionistasData = [
            { nombre: 'Luber', identificacion: '1234567890' },
            { nombre: 'Matt', identificacion: '0987654321' },
            { nombre: 'Erick', identificacion: '1111111111' },
            { nombre: 'Edwin', identificacion: '2222222222' },
            { nombre: 'Piloso', identificacion: '3333333333' }
        ];
        const conceptosInversionData = [
            { concepto: 'Acciones', detalle: 'Compra de acciones en bolsa' },
            { concepto: 'Bienes Raíces', detalle: 'Compra de propiedades inmobiliarias' },
            { concepto: 'Bonos', detalle: 'Compra de bonos gubernamentales' },
            { concepto: 'Criptomonedas', detalle: 'Compra de criptomonedas' },
            { concepto: 'Fondos Mutuos', detalle: 'Inversión en fondos mutuos' }
        ];
        yield prisma.inversionista.createMany({ data: inversionistasData });
        yield prisma.conceptoInversion.createMany({ data: conceptosInversionData });
        console.log('Datos inicializados.');
    });
}
// Función LLENAR para insertar 10 transacciones
function llenarTransacciones() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            for (let i = 0; i < 10; i++) {
                const inversionistaId = Math.floor(Math.random() * 5) + 1;
                const conceptoInversionId = Math.floor(Math.random() * 5) + 1;
                const monto = Math.floor(Math.random() * 10000) + 1;
                const fecha = new Date();
                yield prisma.inversionRealizada.create({
                    data: {
                        inversionistaId,
                        conceptoInversionId,
                        monto,
                        fecha
                    }
                });
            }
            console.log('10 transacciones insertadas.');
        }
        catch (error) {
            console.error('Error al insertar transacciones:', error);
        }
    });
}
// Función para buscar una transacción por ID
function buscarTransaccion(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const transaccion = yield prisma.inversionRealizada.findUnique({
                where: { id },
                include: {
                    inversionista: true,
                    conceptoInversion: true
                }
            });
            if (transaccion) {
                console.log('Transacción encontrada:', transaccion);
            }
            else {
                console.log('Transacción no encontrada.');
            }
        }
        catch (error) {
            console.error('Error al buscar transacción:', error);
        }
    });
}
// Función para consultar todas las transacciones y mostrar atributos principales
function consultarTransacciones() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const transacciones = yield prisma.inversionRealizada.findMany({
                include: {
                    inversionista: {
                        select: { nombre: true, identificacion: true }
                    },
                    conceptoInversion: {
                        select: { concepto: true, detalle: true }
                    }
                }
            });
            console.log('Todas las transacciones:', transacciones);
        }
        catch (error) {
            console.error('Error al consultar transacciones:', error);
        }
    });
}
// Menú de opciones
function mostrarMenu() {
    const menu = `
Elija una opción:
1. Inicializar datos
2. Llenar transacciones
3. Buscar transacción por ID
4. Consultar todas las transacciones
5. Salir

Ingrese el número de la opción: `;
    rl.question(menu, (option) => {
        switch (option) {
            case '1':
                inicializarDatos().then(() => mostrarMenu());
                break;
            case '2':
                llenarTransacciones().then(() => mostrarMenu());
                break;
            case '3':
                rl.question('Ingrese el ID de la transacción: ', (id) => {
                    buscarTransaccion(parseInt(id)).then(() => mostrarMenu());
                });
                break;
            case '4':
                consultarTransacciones().then(() => mostrarMenu());
                break;
            case '5':
                rl.close();
                break;
            default:
                console.log('Opción no válida');
                mostrarMenu();
        }
    });
}
mostrarMenu();
