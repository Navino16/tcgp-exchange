"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "@/styles/Navbar.module.css";
import React from "react";

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async (e: React.MouseEvent) => {
        e.preventDefault(); // Empêcher le rechargement de la page
        await signOut({
            redirect: false, // Ne pas rediriger automatiquement après la déconnexion
        });

        // Rediriger l'utilisateur vers la page d'accueil ou une autre page après déconnexion
        router.push("/");
    };

    return (
        <a href="#" onClick={handleLogout} className={styles.navLink}>
            Déconnexion
        </a>
    );
}
