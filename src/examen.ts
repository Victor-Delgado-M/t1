import { PrismaClient } from '@prisma/client';
import readline from 'readline';

const prisma = new PrismaClient();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function agregarTransaccion(entornoId: number) {
  rl.question('Ingrese la descripción de la transacción: ', async (descripcion) => {
    await prisma.transaccion.create({
      data: {
        descripcion,
        entornoId,
      },
    });
    console.log('Transacción agregada exitosamente');
    rl.close();
  });
}

async function mostrarMenu() {
  const entornos = await prisma.entorno.findMany();
  console.log('Seleccione un entorno:');
  entornos.forEach((entorno, index) => {
    console.log(`${index + 1}. ${entorno.descripcion}`);
  });

  rl.question('Seleccione una opción: ', (opcion) => {
    const seleccion = parseInt(opcion);
    if (seleccion > 0 && seleccion <= entornos.length) {
      const entorno = entornos[seleccion - 1];
      agregarTransaccion(entorno.id);
    } else {
      console.log('Opción no válida');
      rl.close();
    }
  });
}

mostrarMenu();
