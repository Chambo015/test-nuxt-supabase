import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    await prisma.server.create({
      data: {
        "customerId": "user1",
        "serverName": "server7",
        "serverType": "VDS"
      },
    });
    await prisma.server.create({
      data: {
        "customerId": "user5",
        "serverName": "server2",
        "serverType": "DEDICATED"
      },
    });
    await prisma.server.create({
      data:  {
        "customerId": "user3",
        "serverName": "server4",
        "serverType": "HOSTING"
      }
    });
}


main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })