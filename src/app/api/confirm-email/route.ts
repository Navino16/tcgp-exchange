import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
    const url = new URL(request.url);
    const token = url.searchParams.get('token');

    if (!token) {
        return NextResponse.redirect(new URL('/error?message=Token%20invalide', request.url));
    }

    const user = await prisma.user.findUnique({
        where: { confirmationToken: token },
    });

    if (!user) {
        return NextResponse.redirect(new URL('/error?message=Utilisateur%20non%20trouvé', request.url));
    }

    // Mise à jour de l'utilisateur avec email confirmé
    await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: true, confirmationToken: null },
    });

    return NextResponse.redirect(new URL('/login', request.url)); // Redirige vers la page de connexion
}
