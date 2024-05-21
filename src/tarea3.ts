import express, { Application, Request, Response } from 'express';
import { json } from 'body-parser';
import { PrismaClient } from '@prisma/client';
import clienteRoutes from './routes/clienteRoutes';
import productoRoutes from './routes/productoRoutes';
import facturaRoutes from './routes/facturaRoutes';

const app: Application = express();
const prisma = new PrismaClient();

app.use(json());

// Rutas
app.use('/api/clientes', clienteRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/facturas', facturaRoutes);

// Middleware de manejo de errores
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
