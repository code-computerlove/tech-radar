import { prisma } from '~/db.server';

export const getTechs = async () => {
	return await prisma.tech.findMany();
};
