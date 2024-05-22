import * as readline from 'readline';

// Definición de interfaces
interface Inversionista {
    id: number;
    nombre: string;
    identificacion: string;
}

interface ConceptoInversion {
    id: number;
    concepto: string;
    detalle: string;
}

interface InversionRealizada {
    id: number;
    inversionistaId: number;
    conceptoInversionId: number;
    monto: number;
    fecha: string;
}

// Datos de ejemplo
const inversionistas: Inversionista[] = [
    { id: 1, nombre: 'Luber', identificacion: '1234567890' },
    { id: 2, nombre: 'Matt', identificacion: '0987654321' },
    { id: 3, nombre: 'Erick', identificacion: '1111111111' },
    { id: 4, nombre: 'Edwin', identificacion: '2222222222' },
    { id: 5, nombre: 'Piloso', identificacion: '3333333333' }
];

const conceptosInversion: ConceptoInversion[] = [
    { id: 1, concepto: 'Acciones', detalle: 'Compra de acciones en bolsa' },
    { id: 2, concepto: 'Bienes Raíces', detalle: 'Compra de propiedades inmobiliarias' },
    { id: 3, concepto: 'Bonos', detalle: 'Compra de bonos gubernamentales' },
    { id: 4, concepto: 'Criptomonedas', detalle: 'Compra de criptomonedas' },
    { id: 5, concepto: 'Fondos Mutuos', detalle: 'Inversión en fondos mutuos' }
];

const inversionesRealizadas: InversionRealizada[] = [
    { id: 1, inversionistaId: 1, conceptoInversionId: 1, monto: 10000, fecha: '2023-01-15' },
    { id: 2, inversionistaId: 2, conceptoInversionId: 2, monto: 50000, fecha: '2023-02-20' },
    { id: 3, inversionistaId: 3, conceptoInversionId: 3, monto: 20000, fecha: '2023-03-18' },
    { id: 4, inversionistaId: 4, conceptoInversionId: 4, monto: 15000, fecha: '2023-04-25' },
    { id: 5, inversionistaId: 5, conceptoInversionId: 5, monto: 25000, fecha: '2023-05-30' }
];

// Función con callback para buscar un inversionista por ID
function buscarInversionistaPorId(id: number, callback: (inversionista: Inversionista | undefined) => void) {
    const inversionista = inversionistas.find(inv => inv.id === id);
    callback(inversionista);
}

// Función para obtener datos de una API pública usando Fetch y Async/Await
async function obtenerDatosAPI() {
    const fetch = require('node-fetch');
    try {
        const response = await fetch('https://api.publicapis.org/entries');
        const data = await response.json();
        console.log('Datos de la API:', data.entries.slice(0, 5)); // Mostrar solo los primeros 5 resultados para brevedad
    } catch (error) {
        console.error('Error al obtener datos de la API:', error);
    }
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
                    } else {
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
