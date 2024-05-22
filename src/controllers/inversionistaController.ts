import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getInversionistas = async (req: Request, res: Response) => {
    try {
        const inversionistas = await prisma.inversionista.findMany({
            where: { estado: 'Activo' }
        });
        res.json(inversionistas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener inversionistas' });
    }
};

export const createInversionista = async (req: Request, res: Response) => {
    try {
        const { nombre, identificacion } = req.body;
        if (!nombre || !identificacion) {
            return res.status(400).json({ error: 'Nombre e identificación son requeridos' });
        }

        const nuevoInversionista = await prisma.inversionista.create({
            data: { nombre, identificacion, estado: 'Activo' }
        });
        res.json(nuevoInversionista);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear inversionista' });
    }
};

export const updateInversionista = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { nombre, identificacion } = req.body;
        if (!nombre || !identificacion) {
            return res.status(400).json({ error: 'Nombre e identificación son requeridos' });
        }

        const inversionistaActualizado = await prisma.inversionista.update({
            where: { id: Number(id) },
            data: { nombre, identificacion }
        });
        res.json(inversionistaActualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar inversionista' });
    }
};

export const deleteInversionista = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const inversionistaEliminado = await prisma.inversionista.update({
            where: { id: Number(id) },
            data: { estado: 'Eliminado' }
        });
        res.json(inversionistaEliminado);
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar inversionista' });
    }
};

// Método para actualizar el estado de un inversionista
export const updateEstadoInversionista = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        if (!estado || !['Activo', 'Pendiente', 'Eliminado'].includes(estado)) {
            return res.status(400).json({ error: 'Estado no válido. Debe ser Activo, Pendiente o Eliminado' });
        }

        const inversionistaActualizado = await prisma.inversionista.update({
            where: { id: Number(id) },
            data: { estado }
        });
        res.json(inversionistaActualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el estado del inversionista' });
    }
};
