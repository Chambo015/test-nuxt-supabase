import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const res = await prisma.server.update({
        where: {id: Number(event.context.params?.id)},
        data: {
            serverName: body.serverName || undefined,
            serverType: body.serverType || undefined
        }
    });

    return res
});
