"use client";

import { useSession } from "next-auth/react";
import {useEffect, useState} from "react";
import styles from "@/styles/Profile.module.css";
import formStyles from "@/styles/Forms.module.css";
import {SubmitHandler, useForm} from "react-hook-form";

type PasswordFormData = {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
};
type FriendIDFormData = {
    friendID: string;
};

export default function Profile() {
    const { data: session } = useSession();
    const { register, handleSubmit, watch, formState: { errors } } = useForm<PasswordFormData>();
    const { register: registerFriendID, handleSubmit: handleSubmitFriendID, formState: { errors: errorsFriendID }, setValue: setValueFriendID } = useForm<FriendIDFormData>();
    const [apiError, setApiError] = useState<string | null>(null); // Pour gérer l'erreur de l'API
    const [apiErrorFriendID, setApiErrorFriendID] = useState<string | null>(null); // Pour gérer l'erreur de l'API
    const [message, setMessage] = useState<string | null>(null); // Pour gérer l'erreur de l'API
    const [messageFriendID, setMessageFriendID] = useState<string | null>(null); // Pour gérer l'erreur de l'API

    useEffect(() => {
        if (session?.user?.email) {
            fetch("/api/get-profile")
                .then(res => res.json())
                .then(data => setValueFriendID("friendID", data.friendID || ""));
        }
    }, [session, setValueFriendID]);

    const changePassword: SubmitHandler<PasswordFormData> = async (data) => {
        setApiError(null);
        setMessage(null);
        try {
            const res = await fetch("/api/change-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    oldPassword: data.oldPassword,
                    newPassword: data.newPassword,
                }),
            });
            const result = await res.json();
            if (res.ok) {
                setMessage("Mot de passe modifié avec succès !");
            } else {
                setApiError(result.error || "Erreur lors du changement de mot de passe.");
            }
        } catch (error) {
            console.error(error);
            // Si une erreur se produit (par exemple, problème réseau).
            setApiError("Une erreur est survenue, veuillez réessayer plus tard.");
        }
    };

    const changeFriendID: SubmitHandler<FriendIDFormData> = async (data) => {
        setApiErrorFriendID(null);
        setMessageFriendID(null);
        try {
            const res = await fetch("/api/update-profile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ friendID: data.friendID }),
            });
            const result = await res.json();
            if (res.ok) {
                setMessageFriendID("ID Ami mis à jour avec succès !");
            } else {
                setApiErrorFriendID(result.error || "Erreur lors du changement de mot de passe.");
            }
        } catch (error) {
            console.error(error);
            // Si une erreur se produit (par exemple, problème réseau).
            setApiErrorFriendID("Une erreur est survenue, veuillez réessayer plus tard.");
        }
    };

    if (!session) {
        return <p>Vous devez être connecté pour voir cette page.</p>;
    }

    return (
        <div className={styles.container}>
            <h1>Profil</h1>
            <p>Email: {session.user?.email}</p>

            {/* Modifier l'ID Ami */}
            <form onSubmit={handleSubmitFriendID(changeFriendID)} className={formStyles.form}>
                <h2 className={formStyles.title}>Modifier l&#39;ID Ami</h2>

                {messageFriendID && <p className={formStyles.message}>{messageFriendID}</p>}
                {apiErrorFriendID && <p className={formStyles.apiError}>{apiErrorFriendID}</p>}

                <input
                    {...registerFriendID("friendID", {
                        required: "ID Ami requis",
                    })}
                    type="text"
                    placeholder="Votre ID Ami"
                    className={`${formStyles.input} ${errorsFriendID.friendID ? formStyles.errorInput : ''}`}
                />
                {errorsFriendID.friendID && <p className={formStyles.error}>{errorsFriendID.friendID.message}</p>}
                <button type="submit" className={formStyles.button}>Mettre à jour</button>
            </form>

            <form onSubmit={handleSubmit(changePassword)} className={formStyles.form}>
                <h2 className={formStyles.title}>Modifier le mot de passe</h2>

                {message && <p className={formStyles.message}>{message}</p>}
                {apiError && <p className={formStyles.apiError}>{apiError}</p>}

                {/* Champ mot de passe actuel */}
                <input
                    {...register("oldPassword", {
                        required: "Mot de passe requis",
                    })}
                    type="password"
                    placeholder="Mot de passe actuel"
                    className={`${formStyles.input} ${errors.oldPassword ? formStyles.errorInput : ''}`}
                />
                {errors.oldPassword && <p className={formStyles.error}>{errors.oldPassword.message}</p>}

                {/* Champ mot de passe */}
                <input
                    {...register("newPassword", {
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
                    className={`${formStyles.input} ${errors.newPassword ? formStyles.errorInput : ''}`}
                />
                {errors.newPassword && <p className={formStyles.error}>{errors.newPassword.message}</p>}

                {/* Champ confirmation du mot de passe */}
                <input
                    {...register("confirmNewPassword", {
                        required: "La confirmation du mot de passe est requise.",
                        validate: (value) => value === watch("newPassword") || "Les mots de passe ne correspondent pas.",
                    })}
                    type="password"
                    placeholder="Confirmer le mot de passe"
                    className={`${formStyles.input} ${errors.confirmNewPassword ? formStyles.errorInput : ''}`}
                />
                {errors.confirmNewPassword && <p className={formStyles.error}>{errors.confirmNewPassword.message}</p>}

                <button type="submit" className={formStyles.button}>Changer le mot de passe</button>
            </form>
        </div>
    );
}
