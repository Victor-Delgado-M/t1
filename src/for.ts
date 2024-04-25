import { clientes, productos, facturas } from './call';

console.log('Mostrando Clientes con forEach:');
clientes.forEach(cliente => {
    console.log(`Cliente ID: ${cliente.id}, Nombre: ${cliente.nombre}`);
});

console.log('\nMostrando Productos con for...of:');
for (const producto of productos) {
    console.log(`Producto ID: ${producto.id}, Nombre: ${producto.nombre}, Precio: ${producto.precio}`);
}

console.log('\nMostrando Facturas con for...in:');
for (const index in facturas) {
    if (facturas.hasOwnProperty(index)) {
        const factura = facturas[index];
        console.log(`Factura ID: ${factura.id}, Cliente ID: ${factura.clienteId}`);
        console.log('Productos de la Factura:');
        factura.productos.forEach(producto => {
            console.log(`  Producto: ${producto.nombre}, Precio: ${producto.precio}`);
        });
    }
}
