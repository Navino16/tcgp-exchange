"use client";

import styles from "@/styles/Footer.module.css"
import {useEffect, useState} from "react";

export default function Navbar() {
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
        <footer className={`${styles.footer} ${theme === "dark" ? styles.dark : styles.light}`}>
            <p>© 2025 TCGP Exchange. Tous droits réservés.</p>
        </footer>
    );
}
