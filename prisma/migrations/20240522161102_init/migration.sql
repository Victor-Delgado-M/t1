-- CreateTable
CREATE TABLE "Inversionista" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "identificacion" TEXT NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'Activo'
);

-- CreateTable
CREATE TABLE "ConceptoInversion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "concepto" TEXT NOT NULL,
    "detalle" TEXT NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'Activo'
);

-- CreateTable
CREATE TABLE "InversionRealizada" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "inversionistaId" INTEGER NOT NULL,
    "conceptoInversionId" INTEGER NOT NULL,
    "monto" REAL NOT NULL,
    "fecha" DATETIME NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'Activo',
    CONSTRAINT "InversionRealizada_inversionistaId_fkey" FOREIGN KEY ("inversionistaId") REFERENCES "Inversionista" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "InversionRealizada_conceptoInversionId_fkey" FOREIGN KEY ("conceptoInversionId") REFERENCES "ConceptoInversion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
