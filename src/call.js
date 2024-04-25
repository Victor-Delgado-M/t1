"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.facturas = exports.productos = exports.clientes = void 0;
const readline = require('readline');
exports.clientes = [
    { id: 1, nombre: "Matt" },
    { id: 2, nombre: "Luber" },
    { id: 3, nombre: "Erick" },
    { id: 4, nombre: "Piloso" },
    { id: 5, nombre: "Edwin" },
];
exports.productos = [
    { id: 1, nombre: "Telefono", precio: 10 },
    { id: 2, nombre: "Laptop", precio: 20 },
    { id: 3, nombre: "Cpu", precio: 30 },
    { id: 4, nombre: "Monitor", precio: 40 },
    { id: 5, nombre: "Mouse", precio: 50 },
];
exports.facturas = [
    { id: 1, clienteId: 1, productos: [exports.productos[0], exports.productos[1]] },
    { id: 2, clienteId: 2, productos: [exports.productos[2], exports.productos[3]] },
    { id: 3, clienteId: 3, productos: [exports.productos[4]] },
    { id: 4, clienteId: 4, productos: [exports.productos[0], exports.productos[2], exports.productos[4]] },
    { id: 5, clienteId: 5, productos: [exports.productos[1], exports.productos[3]] },
];
function buscarFacturaPorId(id, callback) {
    const factura = exports.facturas.find(f => f.id === id);
    if (factura) {
        const cliente = exports.clientes.find(c => c.id === factura.clienteId);
        callback(factura, cliente);
    }
    else {
        callback();
    }
}
if (require.main === module) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('Ingrese el ID de la factura que desea buscar: ', (input) => {
        const id = parseInt(input.trim(), 10); // Convertir el input a un número
        if (!isNaN(id)) { // Verificar que el ID sea un número válido
            buscarFacturaPorId(id, (factura, cliente) => {
                if (factura && cliente) {
                    console.log(`Factura encontrada: ID ${factura.id}`);
                    console.log(`Cliente: ${cliente.nombre} (ID ${cliente.id})`);
                    console.log('Productos en la factura:');
                    factura.productos.forEach(p => {
                        console.log(`${p.nombre} - $${p.precio}`);
                    });
                }
                else {
                    console.log('Factura no encontrada');
                }
                rl.close();
            });
        }
        else {
            console.log('ID inválido. Por favor, ingrese un número.');
            rl.close();
        }
    });
}
