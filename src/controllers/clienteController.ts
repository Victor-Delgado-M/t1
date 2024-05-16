import { Request, Response } from 'express';
import prisma from '../prisma';

const allowedStates = ['ACTIVO', 'PENDIENTE', 'ELIMINADO'];

export const getClientes = async (req: Request, res: Response) => {
  const clientes = await prisma.cliente.findMany({
    where: { estado: 'ACTIVO' }
  });
  res.json(clientes);
};

export const createCliente = async (req: Request, res: Response) => {
  const { nombre } = req.body;
  const nuevoCliente = await prisma.cliente.create({
    data: { nombre, estado: 'ACTIVO' }
  });
  res.json(nuevoCliente);
};

export const updateCliente = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, estado } = req.body;

  if (!allowedStates.includes(estado)) {
    return res.status(400).json({ error: 'Estado no permitido' });
  }

  const clienteActualizado = await prisma.cliente.update({
    where: { id: Number(id) },
    data: { nombre, estado }
  });
  res.json(clienteActualizado);
};

export const deleteCliente = async (req: Request, res: Response) => {
  const { id } = req.params;
  const clienteEliminado = await prisma.cliente.update({
    where: { id: Number(id) },
    data: { estado: 'ELIMINADO' }
  });
  res.json(clienteEliminado);
};
