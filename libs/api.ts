import prisma from "./prisma"
import { compare } from 'bcryptjs';

const api = {
    getAllUsers: async (perPage: number = 5, page: number = 1, active: boolean = true) => {

        let take = perPage
        let currentPage = page > 0 ? page : 1
        let skip = (currentPage - 1) * take || 0

        return await prisma.user.findMany({
            take,
            skip,
            where: {
                active: active
            },
            select: {
                id: true,
                name: true,
                email: true,
                active: true,
            },
            orderBy: {
                id: 'asc'
            }
        })
    },

    createUser: async (name: string, email: string, password: string) => {
        return await prisma.user.create({
            data: { name, email, password }
        })
    },

    getOneUser: async (id: number) => {
        return await prisma.user.findUnique({
            where: { id }
        })
    },

    getOneUserByEmail: async (email: string) => {
        return await prisma.user.findUnique({
            where: { email }
        })
    },

    verifyCredentials: async (email: string, password: string) => {
        const user = await prisma.user.findUnique({
            where: { email }
        })
        if (user) {
            if (await compare(password, user.password)) {
                return user;
            }
        }
        return null;
    },

    updateUser: async (id: number, name?: string, active?: string, role?: string) => {
        let data: {
            name?: string,
            active?: boolean,
            role?: string,
        } = {}

        if (name) {
            data.name = name
        }

        if (active) {
            data.active = active == 'true' || active == '1'
        }

        if (role) {
            data.role = role
        }

        return await prisma.user.update({
            where: { id },
            data
        })
    },

    deleteUser: async (id: number) => {
        return await prisma.user.delete({
            where: { id }
        })
    }
}

export default api;