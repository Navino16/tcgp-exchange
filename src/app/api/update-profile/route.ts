import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { friendID } = await req.json();

    if (!friendID) {
        return NextResponse.json({ error: "L'ID Ami ne peut pas être vide" }, { status: 400 });
    }

    await prisma.user.update({
        where: { email: session.user.email! },
        data: { friendID },
    });

    return NextResponse.json({ message: "ID Ami mis à jour avec succès" });
}
