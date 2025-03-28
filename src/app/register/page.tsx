"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import styles from "@/styles/Login.module.css";
import formStyles from "@/styles/Forms.module.css";
import React from "react";

// Définir le type des données du formulaire
type FormData = {
    email: string;
    password: string;
    confirmPassword: string;
};

export default function Register() {
    // Utiliser le type FormData pour useForm
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
    const [apiError, setApiError] = React.useState<string | null>(null); // Pour gérer l'erreur de l'API

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setApiError(null); // Réinitialiser l'erreur avant de soumettre
        try {
            // Envoyer la requête d'inscription à l'API
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                }),
            });

            const result = await res.json();
            if (res.ok) {
                // Redirection vers la page de connexion
                window.location.href = "/login";
            } else {
                setApiError(result.error || "Erreur inconnue lors de l'inscription.");
            }
        } catch (error) {
            console.error(error);
            // Si une erreur se produit (par exemple, problème réseau).
            setApiError("Une erreur est survenue, veuillez réessayer plus tard.");
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
                <h1 className={formStyles.title}>Inscription</h1>

                {/* Affichage des erreurs d'API globales */}
                {apiError && <p className={formStyles.apiError}>{apiError}</p>}

                {/* Champ email */}
                <input
                    {...register("email", { required: "Email requis" })}
                    type="email"
                    placeholder="Email"
                    className={`${formStyles.input} ${errors.email ? formStyles.errorInput : ''}`}
                />
                {errors.email && <p className={formStyles.error}>{errors.email.message}</p>}

                {/* Champ mot de passe */}
                <input
                    {...register("password", {
                        required: "Mot de passe requis",
                        minLength: {
                            value: 8,
                            message: "Le mot de passe doit contenir au moins 8 caractères.",
                        },
                        pattern: {
                            value: /[A-Z]/,
                            message: "Le mot de passe doit contenir au moins une majuscule.",
                        },
                        validate: (value) => /[0-9]/.test(value) || "Le mot de passe doit contenir au moins un chiffre.",
                    })}
                    type="password"
                    placeholder="Mot de passe"
                    className={`${formStyles.input} ${errors.password ? formStyles.errorInput : ''}`}
                />
                {errors.password && <p className={formStyles.error}>{errors.password.message}</p>}

                {/* Champ confirmation du mot de passe */}
                <input
                    {...register("confirmPassword", {
                        required: "La confirmation du mot de passe est requise.",
                        validate: (value) => value === watch("password") || "Les mots de passe ne correspondent pas.",
                    })}
                    type="password"
                    placeholder="Confirmer le mot de passe"
                    className={`${formStyles.input} ${errors.confirmPassword ? formStyles.errorInput : ''}`}
                />
                {errors.confirmPassword && <p className={formStyles.error}>{errors.confirmPassword.message}</p>}

                <button type="submit" className={formStyles.button}>
                    S&#39;inscrire
                </button>

                <p className={styles.redirect}>
                    Déjà un compte ? <a href="/login" className={styles.link}>Se connecter</a>
                </p>
            </form>
        </div>
    );
}
