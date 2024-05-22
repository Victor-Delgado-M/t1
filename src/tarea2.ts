import { PrismaClient } from '@prisma/client';
import * as readline from 'readline';

const prisma = new PrismaClient();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Insertar inversionistas y conceptos de inversión para asegurar que existen
async function inicializarDatos() {
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

    await prisma.inversionista.createMany({ data: inversionistasData });
    await prisma.conceptoInversion.createMany({ data: conceptosInversionData });
    console.log('Datos inicializados.');
}

// Función LLENAR para insertar 10 transacciones
async function llenarTransacciones() {
    try {
        for (let i = 0; i < 10; i++) {
            const inversionistaId = Math.floor(Math.random() * 5) + 1;
            const conceptoInversionId = Math.floor(Math.random() * 5) + 1;
            const monto = Math.floor(Math.random() * 10000) + 1;
            const fecha = new Date();

            await prisma.inversionRealizada.create({
                data: {
                    inversionistaId,
                    conceptoInversionId,
                    monto,
                    fecha
                }
            });
        }
        console.log('10 transacciones insertadas.');
    } catch (error) {
        console.error('Error al insertar transacciones:', error);
    }
}

// Función para buscar una transacción por ID
async function buscarTransaccion(id: number) {
    try {
        const transaccion = await prisma.inversionRealizada.findUnique({
            where: { id },
            include: {
                inversionista: true,
                conceptoInversion: true
            }
        });

        if (transaccion) {
            console.log('Transacción encontrada:', transaccion);
        } else {
            console.log('Transacción no encontrada.');
        }
    } catch (error) {
        console.error('Error al buscar transacción:', error);
    }
}

// Función para consultar todas las transacciones y mostrar atributos principales
async function consultarTransacciones() {
    try {
        const transacciones = await prisma.inversionRealizada.findMany({
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
    } catch (error) {
        console.error('Error al consultar transacciones:', error);
    }
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
