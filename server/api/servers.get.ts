import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export default defineEventHandler(async () => {
    const server = await prisma.server.findMany({
        orderBy: {
            id: 'asc'
        }
    }) 
    return server
})