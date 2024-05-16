-- CreateTable
CREATE TABLE "Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'Activo'
);

-- CreateTable
CREATE TABLE "Producto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "precio" REAL NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'Activo'
);

-- CreateTable
CREATE TABLE "Factura" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clienteId" INTEGER NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'Activo',
    CONSTRAINT "Factura_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FacturaProducto" (
    "facturaId" INTEGER NOT NULL,
    "productoId" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,

    PRIMARY KEY ("facturaId", "productoId"),
    CONSTRAINT "FacturaProducto_facturaId_fkey" FOREIGN KEY ("facturaId") REFERENCES "Factura" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FacturaProducto_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Transaccion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clienteId" INTEGER NOT NULL,
    "descripcion" TEXT NOT NULL,
    "monto" REAL NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'Activo',
    CONSTRAINT "Transaccion_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
