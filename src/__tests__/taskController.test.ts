import request from 'supertest';
import app from '../index.js';
import prisma from '../prisma/client.js';

jest.mock('../prisma/client', () => ({
	task: {
		findMany: jest.fn(),
		findUnique: jest.fn(),
		create: jest.fn(),
		update: jest.fn(),
		delete: jest.fn(),
	},
}));

describe('Task Controller', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('GET /tasks returns all tasks', async () => {
		(prisma.task.findMany as jest.Mock).mockResolvedValue([
			{ id: 1, title: 'Test Task', color: '#fff', completedStatus: false },
		]);

		const res = await request(app).get('/tasks');
		expect(res.status).toBe(200);
		expect(res.body.length).toBe(1);
	});

	it('POST /tasks creates a new task', async () => {
		const mockTask = {
			id: 1,
			title: 'New Task',
			color: '#fff',
			completedStatus: false,
		};
		(prisma.task.create as jest.Mock).mockResolvedValue(mockTask);

		const res = await request(app).post('/tasks').send({ title: 'New Task' });
		expect(res.status).toBe(201);
		expect(res.body.title).toBe('New Task');
	});

	it('GET /tasks/:id returns task by ID', async () => {
		const mockTask = {
			id: 1,
			title: 'Test Task',
			color: '#fff',
			completedStatus: false,
		};
		(prisma.task.findUnique as jest.Mock).mockResolvedValue(mockTask);

		const res = await request(app).get('/tasks/1');
		expect(res.status).toBe(200);
		expect(res.body.id).toBe(1);
	});

	it('GET /tasks/:id returns 404 if task not found', async () => {
		(prisma.task.findUnique as jest.Mock).mockResolvedValue(null);

		const res = await request(app).get('/tasks/999');
		expect(res.status).toBe(404);
		expect(res.body.message).toMatch(/not found/i);
	});

	it('POST /tasks returns 400 if data is invalid', async () => {
		const res = await request(app).post('/tasks').send({});
		expect(res.status).toBe(400);
		expect(res.body.message).toMatch(/invalid/i);
	});

	it('PUT /tasks/:id updates a task', async () => {
		const mockTask = {
			id: 1,
			title: 'Updated Task',
			color: '#fff',
			completedStatus: true,
		};
		(prisma.task.findUnique as jest.Mock).mockResolvedValue(mockTask);
		(prisma.task.update as jest.Mock).mockResolvedValue(mockTask);

		const res = await request(app)
			.put('/tasks/1')
			.send({ title: 'Updated Task', completedStatus: true });
		expect(res.status).toBe(200);
		expect(res.body.completedStatus).toBe(true);
	});

	it('PUT /tasks/:id returns 404 if task not found', async () => {
		(prisma.task.findUnique as jest.Mock).mockResolvedValue(null);

		const res = await request(app)
			.put('/tasks/999')
			.send({ title: 'Does not exist' });
		expect(res.status).toBe(404);
		expect(res.body.message).toMatch(/not found/i);
	});

	it('DELETE /tasks/:id deletes a task', async () => {
		const mockTask = {
			id: 1,
			title: 'Delete Me',
			color: '#fff',
			completedStatus: false,
		};
		(prisma.task.findUnique as jest.Mock).mockResolvedValue(mockTask);
		(prisma.task.delete as jest.Mock).mockResolvedValue({});

		const res = await request(app).delete('/tasks/1');
		expect(res.status).toBe(204);
	});

	it('DELETE /tasks/:id returns 404 if task not found', async () => {
		(prisma.task.findUnique as jest.Mock).mockResolvedValue(null);

		const res = await request(app).delete('/tasks/999');
		expect(res.status).toBe(404);
		expect(res.body.message).toMatch(/not found/i);
	});
});
