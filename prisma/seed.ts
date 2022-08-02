import prisma from "../libs/prisma";

async function main() {
    const admin = await prisma.user.upsert({
        where: { email: 'admin@email.com' },
        update: {},
        create: {
            email: 'admin@email.com',
            name: 'Admin',
        },
    })
    console.log({ admin })
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