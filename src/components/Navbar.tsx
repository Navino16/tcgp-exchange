"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton"; // Importer le bouton de déconnexion
import styles from "@/styles/Navbar.module.css";
import ThemeToggle from "@/components/ThemeToggle";
import {useEffect, useState} from "react";

export default function Navbar() {
    const { data: session } = useSession();
    const [theme, setTheme] = useState<"light" | "dark">("light");

    // Fonction pour détecter le thème
    const detectTheme = () => {
        if (typeof document !== "undefined") {
            return document.body.classList.contains("dark") ? "dark" : "light";
        }
        return "light";
    };

    useEffect(() => {
        // Mettre à jour le thème au chargement
        setTheme(detectTheme());

        // Écouter les changements de classe sur <body>
        const observer = new MutationObserver(() => {
            setTheme(detectTheme());
        });

        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ["class"],
        });

        // Nettoyage de l'observer quand le composant est démonté
        return () => observer.disconnect();
    }, []);

    return (
        <nav className={`${styles.navbar} ${theme === "dark" ? styles.dark : styles.light}`}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    TCGP Exchange
                </Link>
                <ul className={styles.navLinks}>
                    {session ? (
                        <li>
                            <Link href="/dashboard" className={styles.navLink}>
                                Dashboard
                            </Link>
                        </li>
                    ) : (
                        <>
                        </>
                    )}
                </ul>

                {/* Conteneur aligné à droite */}
                <div className={styles.navRight}>
                    <ul className={styles.navLinks}>
                        {session ? (
                            <li>
                                <LogoutButton />
                            </li>
                        ) : (
                            <>
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
                            </>
                        )}
                    </ul>

                    {/* Bouton de changement de thème */}
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
}
