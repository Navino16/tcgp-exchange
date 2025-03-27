"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation"; // Utiliser le router pour rediriger après déconnexion

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        await signOut({
            redirect: false, // Ne pas rediriger automatiquement après la déconnexion
        });

        // Rediriger l'utilisateur vers la page d'accueil ou une autre page après déconnexion
        router.push("/login");
    };

    return (
        <button onClick={handleLogout} className="logout-button">
            Se déconnecter
        </button>
    );
}
