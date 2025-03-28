"use client";

import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import styles from "@/styles/Login.module.css";
import formStyles from "@/styles/Forms.module.css";
import Link from "next/link";
import {useState} from "react";

type FormData = {
    email: string;
    password: string;
};

export default function Login() {
    const { register, handleSubmit } = useForm<FormData>();
    const [error, setError] = useState<string | null>(null); // Stocke le message d'erreur

    const onSubmit = async (data: { email: string; password: string }) => {
        setError(null); // Réinitialiser l'erreur à chaque tentative

        const result = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false, // Empêche la redirection automatique
        });

        if (result?.error) {
            setError(result.error); // Stocke l'erreur pour l'afficher
        } else {
            window.location.href = "/dashboard"; // Redirige manuellement si succès
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
                <h1 className={formStyles.title}>Connexion</h1>

                {error && <p className={formStyles.apiError}>{error}</p>} {/* Affichage de l'erreur */}

                <input
                    {...register("email")}
                    type="email"
                    placeholder="Email"
                    className={formStyles.input}
                />
                <input
                    {...register("password")}
                    type="password"
                    placeholder="Mot de passe"
                    className={formStyles.input}
                />
                <button type="submit" className={formStyles.button}>
                    Se connecter
                </button>

                {/* Lien vers la page d'inscription */}
                <p className={styles.redirect}>
                    Pas encore de compte ?{" "}
                    <Link href="/register" className={styles.link}>S&#39;inscrire</Link>
                </p>
            </form>
        </div>
    );
}
