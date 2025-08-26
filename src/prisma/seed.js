import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	const tasks = [
		{ title: 'Put out fire', color: '#FF3C30', completedStatus: false },
		{ title: 'Finish project report', color: '#0C7AFF', completedStatus: true },
		{ title: '???', color: '#0C7AFF', completedStatus: false },
		{ title: 'Eat breakfast', color: '#FFCC00', completedStatus: false },
		{ title: 'Drink water', color: '#FFCC00', completedStatus: false },
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
