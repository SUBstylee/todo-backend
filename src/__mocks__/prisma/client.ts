import { PrismaClient } from '@prisma/client';

const taskMock = {
	findMany: jest.fn(),
	create: jest.fn(),
	findUnique: jest.fn(),
	update: jest.fn(),
	delete: jest.fn(),
};

jest.mock('@prisma/client', () => {
	return {
		PrismaClient: jest.fn(() => ({
			task: taskMock,
		})),
	};
});

export default new PrismaClient();
