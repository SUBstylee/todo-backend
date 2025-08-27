import type { Request, Response } from 'express';
import prisma from '../prisma/client.js';

export const getTasks = async (req: Request, res: Response) => {
	try {
		const tasks = await prisma.task.findMany();
		res.status(200).json(tasks);
	} catch (error) {
		res.status(500).json({ message: 'Failed to fetch tasks' });
	}
};

export const getTaskById = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const task = await prisma.task.findUnique({
			where: { id: Number(id) },
		});

		if (!task) return res.status(404).json({ message: 'Task not found' });

		res.status(200).json(task);
	} catch (error) {
		res.status(500).json({ message: 'Failed to fetch task' });
	}
};

export const createTask = async (req: Request, res: Response) => {
	const { title, color = '#fff' } = req.body;

	if (!title) return res.status(400).json({ message: 'Invalid data' });

	try {
		const newTask = await prisma.task.create({
			data: { title, color, completedStatus: false },
		});
		res.status(201).json(newTask);
	} catch (error) {
		res.status(500).json({ message: 'Failed to create task' });
	}
};

export const updateTask = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { title, color, completedStatus } = req.body;

	try {
		const taskExists = await prisma.task.findUnique({
			where: { id: Number(id) },
		});
		if (!taskExists) return res.status(404).json({ message: 'Task not found' });

		const updatedTask = await prisma.task.update({
			where: { id: Number(id) },
			data: { title, color, completedStatus },
		});
		res.status(200).json(updatedTask);
	} catch (error) {
		res.status(500).json({ message: 'Failed to update task' });
	}
};

export const deleteTask = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const taskExists = await prisma.task.findUnique({
			where: { id: Number(id) },
		});
		if (!taskExists) return res.status(404).json({ message: 'Task not found' });

		await prisma.task.delete({ where: { id: Number(id) } });
		res.status(204).send();
	} catch (error) {
		res.status(500).json({ message: 'Failed to delete task' });
	}
};
