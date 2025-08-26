import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	const tasks = [
		{ title: 'Buy groceries', color: '#FF6B6B', completedStatus: false },
		{ title: 'Finish project report', color: '#4ECDC4', completedStatus: true },
		{ title: 'Call Mom', color: '#FFD93D', completedStatus: false },
	];

	for (const task of tasks) {
		await prisma.task.create({ data: task });
	}

	console.log('Seed data created!');
}

main()
	.catch((e) => console.error(e))
	.finally(async () => {
		await prisma.$disconnect();
	});
