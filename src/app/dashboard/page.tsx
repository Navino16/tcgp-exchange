import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return (
            <div>
                <h1>Accès refusé</h1>
                <p>Vous devez être connecté pour accéder à cette page.</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Bienvenue, {session.user?.email} !</h1>
            <p>Vous êtes connecté et pouvez maintenant accéder au tableau de bord.</p>
        </div>
    );
}
