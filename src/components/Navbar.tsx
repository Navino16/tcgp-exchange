"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton"; // Importer le bouton de déconnexion
import styles from "@/styles/Navbar.module.css";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
    const { data: session } = useSession();

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    TCGP Exchange
                </Link>
                <ul className={styles.navLinks}>
                    <li>
                        <Link href="/login" className={styles.navLink}>
                            Connexion
                        </Link>
                    </li>
                    <li>
                        <Link href="/register" className={styles.navLink}>
                            Inscription
                        </Link>
                    </li>
                </ul>
                <ThemeToggle />  {/* Bouton de changement de thème */}
            </div>
        </nav>
    );
}
