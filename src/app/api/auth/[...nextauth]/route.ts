import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "email@example.com" },
                password: { label: "Mot de passe", type: "password" },
            },
            async authorize(credentials) {
                // Vérification de l'email et du mot de passe
                const user = await prisma.user.findUnique({
                    where: { email: credentials?.email },
                });

                if (!user) {
                    throw new Error("Email ou mot de passe incorrect");
                }

                // Vérification du mot de passe
                const isPasswordValid = await bcrypt.compare(credentials?.password || "", user.password);

                if (!isPasswordValid) {
                    throw new Error("Email ou mot de passe incorrect");
                }

                // Vérifier si l'email est confirmé
                if (!user.emailVerified) {
                    throw new Error("Veuillez confirmer votre email avant de vous connecter");
                }

                return {
                    id: user.id.toString(),
                    email: user.email
                };
            },
        }),
    ],
    debug: false, // Active les logs dans la console
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }