// Importa los datos desde data.ts
import { clientes, productos, facturas, Cliente, Producto, Factura } from './call';

// Función con callback para obtener una factura y mostrar detalles
function obtenerFacturaPorId(id: number, callback: (error: Error | null, factura?: Factura) => void): void {
    const factura = facturas.find(f => f.id === id);
    if (factura) {
        callback(null, factura);
    } else {
        callback(new Error('Factura no encontrada'));
    }
}

// Función para mostrar detalles de una factura usando un callback
function mostrarDetallesFactura(idFactura: number): void {
    obtenerFacturaPorId(idFactura, (error, factura) => {
        if (error) {
            console.error(error.message);
            return;
        }
        console.log(`Factura ID: ${factura!.id}`);
        const cliente = clientes.find(c => c.id === factura!.clienteId);
        console.log(`Cliente: ${cliente!.nombre} (ID: ${cliente!.id})`);
        console.log('Productos en la factura:');
        factura!.productos.forEach(p => {
            console.log(`${p.nombre} - $${p.precio}`);
        });
    });
}

// Función para mostrar todas las facturas usando el mismo patrón de callback
function mostrarTodasLasFacturas(): void {
    console.log('Mostrando todas las facturas:');
    facturas.forEach(factura => {
        mostrarDetallesFactura(factura.id);
    });
}

// Llamada a la función para mostrar todas las facturas
mostrarTodasLasFacturas();
