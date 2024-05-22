# Servicio REST para Gestión de Inversionistas, Conceptos de Inversión e Inversiones Realizadas

Este proyecto implementa un servicio REST utilizando Express y Prisma para gestionar entidades de inversionistas, conceptos de inversión e inversiones realizadas. El proyecto incluye operaciones CRUD (Crear, Leer, Actualizar, Eliminar) con eliminación lógica mediante el atributo `estado`.

## Configuración del Proyecto

### Requisitos

- Node.js
- Prisma
- SQLite (o cualquier base de datos compatible con Prisma)

### Instalación

1. Clona el repositorio:
    ```sh
    git clone <url_del_repositorio>
    ```

2. Instala las dependencias:
    ```sh
    npm install
    ```

3. Configura el archivo `.env` con la URL de la base de datos:
    ```plaintext
    DATABASE_URL="file:./dev.db"
    ```

4. Inicializa Prisma:
    ```sh
    npx prisma init
    ```

5. Define el esquema Prisma en `prisma/schema.prisma`:
    ```prisma
    datasource db {
      provider = "sqlite"
      url      = env("DATABASE_URL")
    }

    generator client {
      provider = "prisma-client-js"
    }

    model Inversionista {
      id             Int              @id @default(autoincrement())
      nombre         String
      identificacion String
      estado         String           @default("Activo")
      inversiones    InversionRealizada[]
    }

    model ConceptoInversion {
      id       Int              @id @default(autoincrement())
      concepto String
      detalle  String
      estado   String           @default("Activo")
      inversiones InversionRealizada[]
    }

    model InversionRealizada {
      id                    Int              @id @default(autoincrement())
      inversionistaId       Int
      conceptoInversionId   Int
      monto                 Float
      fecha                 DateTime
      estado                String           @default("Activo")
      inversionista         Inversionista    @relation(fields: [inversionistaId], references: [id])
      conceptoInversion     ConceptoInversion @relation(fields: [conceptoInversionId], references: [id])
    }
    ```

6. Ejecuta las migraciones para crear las tablas en la base de datos:
    ```sh
    npx prisma migrate dev --name init
    ```

7. Genera el cliente Prisma:
    ```sh
    npx prisma generate
    ```

### Ejecución del Servidor

Para iniciar el servidor, usa el siguiente comando:
```sh
ts-node src/tarea3.ts
