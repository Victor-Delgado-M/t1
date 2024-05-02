import { PrismaClient } from '@prisma/client';
import readline from 'readline';

const prisma = new PrismaClient();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function agregarCliente() {
    rl.question('Ingrese el nombre del cliente: ', async (nombre) => {
        const cliente = await prisma.cliente.create({
            data: { nombre }
        });
        console.log('Cliente creado:', cliente);
        mostrarMenu();  // Vuelve al menú principal después de la operación
    });
}

async function agregarTransacciones() {
    for (let i = 0; i < 10; i++) {
        console.log(`Transacción ${i + 1}:`);
        const clienteId = await new Promise<number>(resolve => {
            rl.question('Ingrese el ID del cliente: ', (id) => resolve(parseInt(id)));
        });
        const descripcion = await new Promise<string>(resolve => {
            rl.question('Ingrese la descripción de la transacción: ', resolve);
        });
        const monto = await new Promise<number>(resolve => {
            rl.question('Ingrese el monto de la transacción: ', (monto) => resolve(parseFloat(monto)));
        });
        const transaccion = await prisma.transaccion.create({
            data: {
                clienteId,
                descripcion,
                monto
            }
        });
        console.log('Transacción creada:', transaccion);
    }
    mostrarMenu();
}

async function buscarTransaccion() {
    rl.question('Ingrese el ID de la transacción: ', async (id) => {
        const transaccion = await prisma.transaccion.findUnique({
            where: { id: parseInt(id) },
            include: { cliente: true }
        });
        if (transaccion) {
            console.log('Transacción encontrada:', transaccion);
        } else {
            console.log('Transacción no encontrada.');
        }
        mostrarMenu();
    });
}

async function consultarTransacciones() {
    const transacciones = await prisma.transaccion.findMany({
        include: {
            cliente: true
        }
    });
    console.log('Todas las transacciones:');
    transacciones.forEach(t => {
        console.log(`ID: ${t.id}, Cliente: ${t.cliente.nombre}, Descripción: ${t.descripcion}, Monto: ${t.monto}`);
    });
    mostrarMenu();
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

mostrarMenu();  // Iniciar el programa mostrando el menú
