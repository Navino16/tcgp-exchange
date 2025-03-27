import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import crypto from 'crypto';
import {sendConfirmationEmail} from "@/lib/mailer";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        // Vérifier si l'email est déjà utilisé
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: 'Email déjà utilisé' },
                { status: 400 }
            );
        }

        // Hashage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 12);
        const confirmationToken = crypto.randomBytes(32).toString('hex');

        // Créer un nouvel utilisateur
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                confirmationToken: confirmationToken
            },
        });

        await sendConfirmationEmail(user.email, user.confirmationToken as string);

        return NextResponse.json({ message: 'Utilisateur créé avec succès' }, { status: 201 });
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur:', error);
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
    }
}
