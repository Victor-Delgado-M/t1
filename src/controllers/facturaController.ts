import { Request, Response } from 'express';
import prisma from '../prisma';

const allowedStates = ['ACTIVO', 'PENDIENTE', 'ELIMINADO'];

export const getFacturas = async (req: Request, res: Response) => {
  try {
    const facturas = await prisma.factura.findMany({
      where: { estado: { not: 'ELIMINADO' } },
      include: {
        productos: {
          include: {
            producto: true
          }
        }
      }
    });
    res.json(facturas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocurrió un error al obtener las facturas.' });
  }
};

export const createFactura = async (req: Request, res: Response) => {
  const { clienteId, productos } = req.body;

  try {
    const nuevaFactura = await prisma.factura.create({
      data: {
        clienteId,
        productos: {
          create: productos.map((producto: { productoId: number, cantidad: number }) => ({
            productoId: producto.productoId,
            cantidad: producto.cantidad
          }))
        },
        estado: 'ACTIVO'
      }
    });
    res.json(nuevaFactura);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocurrió un error al crear la factura.' });
  }
};

export const updateFactura = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { clienteId, productos, estado } = req.body;

  if (estado && !allowedStates.includes(estado)) {
    return res.status(400).json({ error: 'Estado no permitido' });
  }

  try {
    // Actualizar la factura y las relaciones de productos
    await prisma.factura.update({
      where: { id: Number(id) },
      data: {
        clienteId,
        productos: {
          deleteMany: {}, // Eliminar todas las relaciones actuales de productos
          create: productos.map((producto: { productoId: number, cantidad: number }) => ({
            productoId: producto.productoId,
            cantidad: producto.cantidad
          }))
        },
        estado
      }
    });

    // Obtener los detalles actualizados de la factura incluyendo los nombres de los productos
    const facturaActualizada = await prisma.factura.findUnique({
      where: { id: Number(id) },
      include: {
        productos: {
          include: {
            producto: true
          }
        }
      }
    });

    res.json(facturaActualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocurrió un error al actualizar la factura.' });
  }
};

export const deleteFactura = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const facturaEliminada = await prisma.factura.update({
      where: { id: Number(id) },
      data: { estado: 'ELIMINADO' }
    });
    res.json(facturaEliminada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocurrió un error al eliminar la factura.' });
  }
};
