import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import api from "../../../libs/api";
import { AuthUser } from "../../../types/AuthUser";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            id: 'credentials',
            credentials: {
                name: { label: 'Nome', type: 'text' },
                email: { label: 'E-mail', type: 'email' },
            },
            authorize: async (credentials, req) => {
                if (credentials && credentials.email && credentials.name) {
                    const user = await api.getOneUserByEmail(credentials.email)
                    if (user) {
                        return user;
                    }
                }
                return null;
            }
        })
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) token.user = user;
            return token;
        },
        session: async ({ session, token }) => {
            if (token) session.user = token.user as AuthUser;
            return session;
        }
    },
    pages: {
        signIn: "/auth/login",
        error: "/auth/login",
    },
    jwt: {
        secret: "jwttoken",
    },
}

export default NextAuth(authOptions)
