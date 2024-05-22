import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getConceptosInversion = async (req: Request, res: Response) => {
    try {
        const conceptosInversion = await prisma.conceptoInversion.findMany({
            where: { estado: 'Activo' }
        });
        res.json(conceptosInversion);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener conceptos de inversión' });
    }
};

export const createConceptoInversion = async (req: Request, res: Response) => {
    try {
        const { concepto, detalle } = req.body;
        if (!concepto || !detalle) {
            return res.status(400).json({ error: 'Concepto y detalle son requeridos' });
        }

        const nuevoConceptoInversion = await prisma.conceptoInversion.create({
            data: { concepto, detalle, estado: 'Activo' }
        });
        res.json(nuevoConceptoInversion);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear concepto de inversión' });
    }
};

export const updateConceptoInversion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { concepto, detalle } = req.body;
        if (!concepto || !detalle) {
            return res.status(400).json({ error: 'Concepto y detalle son requeridos' });
        }

        const conceptoInversionActualizado = await prisma.conceptoInversion.update({
            where: { id: Number(id) },
            data: { concepto, detalle }
        });
        res.json(conceptoInversionActualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar concepto de inversión' });
    }
};

export const deleteConceptoInversion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const conceptoInversionEliminado = await prisma.conceptoInversion.update({
            where: { id: Number(id) },
            data: { estado: 'Eliminado' }
        });
        res.json(conceptoInversionEliminado);
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar concepto de inversión' });
    }
};

// Método para actualizar el estado de un concepto de inversión
export const updateEstadoConceptoInversion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        if (!estado || !['Activo', 'Pendiente', 'Eliminado'].includes(estado)) {
            return res.status(400).json({ error: 'Estado no válido. Debe ser Activo, Pendiente o Eliminado' });
        }

        const conceptoInversionActualizado = await prisma.conceptoInversion.update({
            where: { id: Number(id) },
            data: { estado }
        });
        res.json(conceptoInversionActualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el estado del concepto de inversión' });
    }
};
