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
