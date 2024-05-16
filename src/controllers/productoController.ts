import { Request, Response } from 'express';
import prisma from '../prisma';

const allowedStates = ['ACTIVO', 'PENDIENTE', 'ELIMINADO'];

export const getProductos = async (req: Request, res: Response) => {
  const productos = await prisma.producto.findMany({
    where: { estado: 'ACTIVO' }
  });
  res.json(productos);
};

export const createProducto = async (req: Request, res: Response) => {
  const { nombre, precio } = req.body;
  const nuevoProducto = await prisma.producto.create({
    data: { nombre, precio, estado: 'ACTIVO' }
  });
  res.json(nuevoProducto);
};

export const updateProducto = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, precio, estado } = req.body;

  if (!allowedStates.includes(estado)) {
    return res.status(400).json({ error: 'Estado no permitido' });
  }

  const productoActualizado = await prisma.producto.update({
    where: { id: Number(id) },
    data: { nombre, precio, estado }
  });
  res.json(productoActualizado);
};

export const deleteProducto = async (req: Request, res: Response) => {
  const { id } = req.params;
  const productoEliminado = await prisma.producto.update({
    where: { id: Number(id) },
    data: { estado: 'ELIMINADO' }
  });
  res.json(productoEliminado);
};
