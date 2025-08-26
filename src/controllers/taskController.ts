import type { Request, Response } from 'express';
import prisma from '../prisma/client.js';

export const getTasks = async (req: Request, res: Response) => {
	try {
		const tasks = await prisma.task.findMany();
		res.status(200).json(tasks);
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch tasks' });
	}
};

export const updateTask = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { title, color, completedStatus } = req.body;

	try {
		const updatedTask = await prisma.task.update({
			where: { id: Number(id) },
			data: { title, color, completedStatus },
		});
		res.status(200).json(updatedTask);
	} catch (error) {
		res.status(500).json({ error: 'Failed to update task' });
	}
};

export const deleteTask = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		await prisma.task.delete({ where: { id: Number(id) } });
		res.status(204).send();
	} catch (error) {
		res.status(500).json({ error: 'Failed to delete task' });
	}
};
