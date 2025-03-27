"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        // Charger le thème préféré de l'utilisateur depuis le localStorage
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.body.classList.remove("light", "dark");
        document.body.classList.add(newTheme);

        // Sauvegarder le thème dans le localStorage
        localStorage.setItem("theme", newTheme);
    };

    return (
        <button onClick={toggleTheme}>
            {theme === "light" ? "🌙" : "☀️"}
        </button>
    );
}
