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
const readline = __importStar(require("readline"));
// Datos de ejemplo
const inversionistas = [
    { id: 1, nombre: 'Luber', identificacion: '1234567890' },
    { id: 2, nombre: 'Matt', identificacion: '0987654321' },
    { id: 3, nombre: 'Erick', identificacion: '1111111111' },
    { id: 4, nombre: 'Edwin', identificacion: '2222222222' },
    { id: 5, nombre: 'Piloso', identificacion: '3333333333' }
];
const conceptosInversion = [
    { id: 1, concepto: 'Acciones', detalle: 'Compra de acciones en bolsa' },
    { id: 2, concepto: 'Bienes Raíces', detalle: 'Compra de propiedades inmobiliarias' },
    { id: 3, concepto: 'Bonos', detalle: 'Compra de bonos gubernamentales' },
    { id: 4, concepto: 'Criptomonedas', detalle: 'Compra de criptomonedas' },
    { id: 5, concepto: 'Fondos Mutuos', detalle: 'Inversión en fondos mutuos' }
];
const inversionesRealizadas = [
    { id: 1, inversionistaId: 1, conceptoInversionId: 1, monto: 10000, fecha: '2023-01-15' },
    { id: 2, inversionistaId: 2, conceptoInversionId: 2, monto: 50000, fecha: '2023-02-20' },
    { id: 3, inversionistaId: 3, conceptoInversionId: 3, monto: 20000, fecha: '2023-03-18' },
    { id: 4, inversionistaId: 4, conceptoInversionId: 4, monto: 15000, fecha: '2023-04-25' },
    { id: 5, inversionistaId: 5, conceptoInversionId: 5, monto: 25000, fecha: '2023-05-30' }
];
// Función con callback para buscar un inversionista por ID
function buscarInversionistaPorId(id, callback) {
    const inversionista = inversionistas.find(inv => inv.id === id);
    callback(inversionista);
}
// Función para obtener datos de una API pública usando Fetch y Async/Await
function obtenerDatosAPI() {
    return __awaiter(this, void 0, void 0, function* () {
        const fetch = require('node-fetch');
        try {
            const response = yield fetch('https://api.publicapis.org/entries');
            const data = yield response.json();
            console.log('Datos de la API:', data.entries.slice(0, 5)); // Mostrar solo los primeros 5 resultados para brevedad
        }
        catch (error) {
            console.error('Error al obtener datos de la API:', error);
        }
    });
}
// Crear interfaz de readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// Menú de opciones
const menu = `
Elija una opción:
1. Mostrar Inversionistas
2. Mostrar Conceptos de Inversión
3. Mostrar Inversiones Realizadas
4. Buscar Inversionista por ID
5. Obtener datos de API

Ingrese el número de la opción: `;
rl.question(menu, (option) => {
    console.log(`Opción seleccionada: ${option}`); // Mensaje de depuración
    switch (option) {
        case '1':
            console.log('Inversionistas:');
            inversionistas.forEach(inversionista => console.log(inversionista));
            rl.close();
            break;
        case '2':
            console.log('Conceptos de Inversión:');
            for (const concepto of conceptosInversion) {
                console.log(concepto);
            }
            rl.close();
            break;
        case '3':
            console.log('Inversiones Realizadas:');
            for (const index in inversionesRealizadas) {
                console.log(inversionesRealizadas[index]);
            }
            rl.close();
            break;
        case '4':
            rl.question('Ingrese el ID del inversionista: ', (id) => {
                buscarInversionistaPorId(parseInt(id), (inversionista) => {
                    if (inversionista) {
                        console.log('Inversionista encontrado:', inversionista);
                    }
                    else {
                        console.log('Inversionista no encontrado');
                    }
                    rl.close();
                });
            });
            break;
        case '5':
            obtenerDatosAPI().then(() => rl.close());
            break;
        default:
            console.log('Opción no válida');
            rl.close();
    }
});
