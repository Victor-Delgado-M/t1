const readline = require('readline');

export interface Cliente {
    id: number;
    nombre: string;
}

export interface Producto {
    id: number;
    nombre: string;
    precio: number;
}

export interface Factura {
    id: number;
    clienteId: number;
    productos: Producto[];
}

export const clientes: Cliente[] = [
    { id: 1, nombre: "Matt" },
    { id: 2, nombre: "Luber" },
    { id: 3, nombre: "Erick" },
    { id: 4, nombre: "Piloso" },
    { id: 5, nombre: "Edwin" },
];

export const productos: Producto[] = [
    { id: 1, nombre: "Telefono", precio: 10 },
    { id: 2, nombre: "Laptop", precio: 20 },
    { id: 3, nombre: "Cpu", precio: 30 },
    { id: 4, nombre: "Monitor", precio: 40 },
    { id: 5, nombre: "Mouse", precio: 50 },
];

export const facturas: Factura[] = [
    { id: 1, clienteId: 1, productos: [productos[0], productos[1]] },
    { id: 2, clienteId: 2, productos: [productos[2], productos[3]] },
    { id: 3, clienteId: 3, productos: [productos[4]] },
    { id: 4, clienteId: 4, productos: [productos[0], productos[2], productos[4]] },
    { id: 5, clienteId: 5, productos: [productos[1], productos[3]] },
];

function buscarFacturaPorId(id: number, callback: (factura?: Factura, cliente?: Cliente) => void): void {
    const factura = facturas.find(f => f.id === id);
    if (factura) {
        const cliente = clientes.find(c => c.id === factura.clienteId);
        callback(factura, cliente);
    } else {
        callback();
    }
}

if (require.main === module) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Ingrese el ID de la factura que desea buscar: ', (input: string) => {
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
                } else {
                    console.log('Factura no encontrada');
                }
                rl.close();
            });
        } else {
            console.log('ID inválido. Por favor, ingrese un número.');
            rl.close();
        }
    });
}
