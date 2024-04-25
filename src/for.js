"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const call_1 = require("./call");
console.log('Mostrando Clientes con forEach:');
call_1.clientes.forEach(cliente => {
    console.log(`Cliente ID: ${cliente.id}, Nombre: ${cliente.nombre}`);
});
console.log('\nMostrando Productos con for...of:');
for (const producto of call_1.productos) {
    console.log(`Producto ID: ${producto.id}, Nombre: ${producto.nombre}, Precio: ${producto.precio}`);
}
console.log('\nMostrando Facturas con for...in:');
for (const index in call_1.facturas) {
    if (call_1.facturas.hasOwnProperty(index)) {
        const factura = call_1.facturas[index];
        console.log(`Factura ID: ${factura.id}, Cliente ID: ${factura.clienteId}`);
        console.log('Productos de la Factura:');
        factura.productos.forEach(producto => {
            console.log(`  Producto: ${producto.nombre}, Precio: ${producto.precio}`);
        });
    }
}
