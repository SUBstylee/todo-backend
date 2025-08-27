const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const {
	getTasks,
	getTaskById,
	createTask,
	updateTask,
	deleteTask,
} = require('../controllers/taskController');
const prisma = require('../prisma/client');

jest.mock('../prisma/client', () => ({
	task: {
		findMany: jest.fn(),
		create: jest.fn(),
		findUnique: jest.fn(),
		update: jest.fn(),
		delete: jest.fn(),
	},
}));

const app = express();
app.use(bodyParser.json());

app.get('/tasks', getTasks);
app.get('/tasks/:id', getTaskById);
app.post('/tasks', createTask);
app.put('/tasks/:id', updateTask);
app.delete('/tasks/:id', deleteTask);

describe('Task Controller', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('GET /tasks returns all tasks', async () => {
		(prisma.task.findMany as jest.Mock).mockResolvedValue([
			{ id: 1, title: 'Test Task', color: '#fff', completedStatus: false },
		]);
		const res = await request(app).get('/tasks');
		expect(res.status).toBe(200);
		expect(res.body).toHaveLength(1);
		expect(res.body[0].title).toBe('Test Task');
	});

	it('POST /tasks creates a new task', async () => {
		const mockTask = {
			id: 2,
			title: 'New Task',
			color: '#000',
			completedStatus: false,
		};
		(prisma.task.create as jest.Mock).mockResolvedValue(mockTask);

		const res = await request(app)
			.post('/tasks')
			.send({ title: 'New Task', color: '#000' });
		expect(res.status).toBe(201);
		expect(res.body).toEqual(mockTask);
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
		expect(res.body.title).toBe('Test Task');
	});

	it('PUT /tasks/:id updates a task', async () => {
		const updatedTask = {
			id: 1,
			title: 'Updated',
			color: '#111',
			completedStatus: true,
		};
		(prisma.task.update as jest.Mock).mockResolvedValue(updatedTask);

		const res = await request(app)
			.put('/tasks/1')
			.send({ title: 'Updated', color: '#111', completedStatus: true });
		expect(res.status).toBe(200);
		expect(res.body.completedStatus).toBe(true);
	});

	it('DELETE /tasks/:id deletes a task', async () => {
		(prisma.task.delete as jest.Mock).mockResolvedValue({});
		const res = await request(app).delete('/tasks/1');
		expect(res.status).toBe(204);
	});
});
