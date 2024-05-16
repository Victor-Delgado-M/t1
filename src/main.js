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
const readline_1 = __importDefault(require("readline"));
// Datos de clientes
const clientes = [
    { id: 1, nombre: "Matt" },
    { id: 2, nombre: "Luber" },
    { id: 3, nombre: "Erick" },
    { id: 4, nombre: "Piloso" },
    { id: 5, nombre: "Edwin" },
];
// Datos de productos
const productos = [
    { id: 1, nombre: "Telefono", precio: 10 },
    { id: 2, nombre: "Laptop", precio: 20 },
    { id: 3, nombre: "Cpu", precio: 30 },
    { id: 4, nombre: "Monitor", precio: 40 },
    { id: 5, nombre: "Mouse", precio: 50 },
];
// Datos de facturas
const facturas = [
    { id: 1, clienteId: 1, productos: [productos[0], productos[1]] },
    { id: 2, clienteId: 2, productos: [productos[2], productos[3]] },
    { id: 3, clienteId: 3, productos: [productos[4]] },
    { id: 4, clienteId: 4, productos: [productos[0], productos[2], productos[4]] },
    { id: 5, clienteId: 5, productos: [productos[1], productos[3]] },
];
// Función para mostrar todas las facturas
function mostrarTodasLasFacturas() {
    console.log("Mostrando todas las facturas:");
    facturas.forEach((factura) => {
        console.log(`Factura ID: ${factura.id}, Cliente ID: ${factura.clienteId}`);
        const cliente = clientes.find(c => c.id === factura.clienteId);
        console.log(`Cliente: ${cliente ? cliente.nombre : 'Cliente no encontrado'}`);
        console.log("Productos en la factura:");
        factura.productos.forEach((p) => {
            console.log(`  Producto: ${p.nombre}, Precio: $${p.precio}`);
        });
        console.log("-----");
    });
}
// Función para mostrar datos con diferentes ciclos
function mostrarDatosConCiclos() {
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
}
// Función para buscar factura por ID
function buscarFacturaPorId(id, callback) {
    const factura = facturas.find(f => f.id === id);
    if (factura) {
        const cliente = clientes.find(c => c.id === factura.clienteId);
        callback(factura, cliente);
    }
    else {
        callback();
    }
}
// Función para consumir un servicio REST
function consumirServicioREST() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://jsonplaceholder.typicode.com/posts/1');
            if (!response.ok) {
                throw new Error('Error al obtener los datos.');
            }
            const data = yield response.json();
            console.log("\nDatos del servicio REST:");
            console.log(data);
        }
        catch (error) {
            console.error("\nError al consumir el servicio REST:", error);
        }
    });
}
// Menú interactivo
function mostrarMenu() {
    const rl = readline_1.default.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    console.log("\nSeleccione una opción:");
    console.log("1: Mostrar todas las facturas");
    console.log("2: Mostrar datos con diferentes ciclos");
    console.log("3: Buscar factura por ID");
    console.log("4: Consumir servicio REST");
    console.log("5: Salir");
    rl.question('Opción: ', (opcion) => {
        switch (opcion) {
            case '1':
                mostrarTodasLasFacturas();
                rl.close();
                setTimeout(mostrarMenu, 1000); // Usar setTimeout para asegurar que rl se cierra antes de reabrir
                break;
            case '2':
                mostrarDatosConCiclos();
                rl.close();
                setTimeout(mostrarMenu, 1000); // Usar setTimeout para asegurar que rl se cierra antes de reabrir
                break;
            case '3':
                rl.question('Ingrese el ID de la factura que desea buscar: ', (input) => {
                    const id = parseInt(input.trim(), 10);
                    if (!isNaN(id)) {
                        buscarFacturaPorId(id, (factura, cliente) => {
                            if (factura && cliente) {
                                console.log(`Factura encontrada: ID ${factura.id}`);
                                console.log(`Cliente: ${cliente.nombre} (ID ${cliente.id})`);
                                console.log('Productos en la factura:');
                                factura.productos.forEach((p) => {
                                    console.log(`${p.nombre} - $${p.precio}`);
                                });
                            }
                            else {
                                console.log('Factura no encontrada');
                            }
                            rl.close();
                            setTimeout(mostrarMenu, 1000); // Usar setTimeout para asegurar que rl se cierra antes de reabrir
                        });
                    }
                    else {
                        console.log('ID inválido. Por favor, ingrese un número.');
                        rl.close();
                        setTimeout(mostrarMenu, 1000); // Usar setTimeout para asegurar que rl se cierra antes de reabrir
                    }
                });
                break;
            case '4':
                consumirServicioREST().then(() => {
                    rl.close();
                    setTimeout(mostrarMenu, 1000); // Usar setTimeout para asegurar que rl se cierra antes de reabrir
                });
                break;
            case '5':
                console.log("Saliendo...");
                rl.close();
                break;
            default:
                console.log("Opción no válida.");
                rl.close();
                setTimeout(mostrarMenu, 1000); // Usar setTimeout para asegurar que rl se cierra antes de reabrir
                break;
        }
    });
}
mostrarMenu();
