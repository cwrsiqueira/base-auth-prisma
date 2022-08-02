import prisma from "../libs/prisma";
import { hash } from 'bcryptjs'

async function main() {
    const hashPass = await hash('123456', 10);

    const admin = await prisma.user.upsert({
        where: { email: 'admin@email.com' },
        update: {},
        create: {
            email: 'admin@email.com',
            name: 'Admin',
            password: hashPass
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