import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.entorno.createMany({
    data: [
      { descripcion: 'Desarrollo' },
      { descripcion: 'Pruebas' },
      { descripcion: 'Producción' },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
