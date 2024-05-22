import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getInversionesRealizadas = async (req: Request, res: Response) => {
    try {
        const inversionesRealizadas = await prisma.inversionRealizada.findMany({
            where: { estado: 'Activo' },
            include: {
                inversionista: true,
                conceptoInversion: true
            }
        });
        res.json(inversionesRealizadas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener inversiones realizadas' });
    }
};

export const createInversionRealizada = async (req: Request, res: Response) => {
    try {
        const { inversionistaId, conceptoInversionId, monto, fecha } = req.body;
        if (!inversionistaId || !conceptoInversionId || !monto || !fecha) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }

        const nuevaInversionRealizada = await prisma.inversionRealizada.create({
            data: { inversionistaId, conceptoInversionId, monto, fecha, estado: 'Activo' }
        });
        res.json(nuevaInversionRealizada);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear inversión realizada' });
    }
};

export const updateInversionRealizada = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { inversionistaId, conceptoInversionId, monto, fecha } = req.body;
        if (!inversionistaId || !conceptoInversionId || !monto || !fecha) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }

        const inversionRealizadaActualizada = await prisma.inversionRealizada.update({
            where: { id: Number(id) },
            data: { inversionistaId, conceptoInversionId, monto, fecha }
        });
        res.json(inversionRealizadaActualizada);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar inversión realizada' });
    }
};

export const deleteInversionRealizada = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const inversionRealizadaEliminada = await prisma.inversionRealizada.update({
            where: { id: Number(id) },
            data: { estado: 'Eliminado' }
        });
        res.json(inversionRealizadaEliminada);
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar inversión realizada' });
    }
};
export const updateEstadoInversionRealizada = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        if (!estado || !['Activo', 'Pendiente', 'Eliminado'].includes(estado)) {
            return res.status(400).json({ error: 'Estado no válido. Debe ser Activo, Pendiente o Eliminado' });
        }

        const inversionRealizadaActualizada = await prisma.inversionRealizada.update({
            where: { id: Number(id) },
            data: { estado }
        });
        res.json(inversionRealizadaActualizada);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el estado de la inversión realizada' });
    }
};