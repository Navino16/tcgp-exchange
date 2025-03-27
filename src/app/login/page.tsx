"use client";

import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import styles from "@/styles/Login.module.css";
import Link from "next/link";

type FormData = {
    email: string;
    password: string;
};

export default function Login() {
    const { register, handleSubmit } = useForm<FormData>();

    const onSubmit = async (data: {email: string, password: string}) => {
        const result = await signIn("credentials", {
            email: data.email,
            password: data.password,
            callbackUrl: "/dashboard", // Redirection après connexion
        });
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <h1 className={styles.title}>Connexion</h1>
                <input
                    {...register("email")}
                    type="email"
                    placeholder="Email"
                    className={styles.input}
                />
                <input
                    {...register("password")}
                    type="password"
                    placeholder="Mot de passe"
                    className={styles.input}
                />
                <button type="submit" className={styles.button}>
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
