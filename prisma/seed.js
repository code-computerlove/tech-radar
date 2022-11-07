'use strict';

const path = require('path');

const { PrismaClient } = require('@prisma/client');

const json = require(path.join(__dirname, '..', 'data', 'data.json'));

const prisma = new PrismaClient();

async function addItem(item, index) {
	return await prisma.tech.create({
		data: {
			index,
			name: item.name,
			url: item.url,
			type: item.type,
			stage: item.stage,
		},
	});
}

async function seed() {
	let index = 1;
	for (const item of json) {
		await addItem(item, index);
		index++;
	}

	console.log(`Database has been seeded. 🌱`);
}

seed()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
