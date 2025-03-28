import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { oldPassword, newPassword } = await req.json();

    if (!oldPassword || !newPassword) {
        return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email! },
    });

    if (!user) {
        return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
        return NextResponse.json({ error: "Ancien mot de passe incorrect" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
        where: { email: user.email },
        data: { password: hashedPassword },
    });

    return NextResponse.json({ message: "Mot de passe changé avec succès" });
}
