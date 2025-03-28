"use client";

import { useEffect, useState } from "react";
import styles from "@/styles/Navbar.module.css";

export default function ThemeToggle() {
    const [theme, setTheme] = useState("light");

    // Fonction pour changer le thème et le stocker
    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme); // Stocke le thème dans localStorage
    };

    // Applique le thème au chargement de la page
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setTheme(savedTheme);
        } else {
            // Si aucun thème n'est stocké, définir par défaut le thème clair
            setTheme("light");
        }
    }, []);

    // Applique la classe de thème à l'élément <body>
    useEffect(() => {
        if (theme === "dark") {
            document.body.classList.add("dark");
            document.body.classList.remove("light");
        } else {
            document.body.classList.add("light");
            document.body.classList.remove("dark");
        }
    }, [theme]);

    return (
        <a href="#" onClick={toggleTheme} className={styles.navLink}>
            {theme === "dark" ? "☀️" : "🌙"}
        </a>
    );
}
