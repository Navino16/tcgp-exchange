"use client";

import {useRouter, useSearchParams} from "next/navigation";
import styles from "@/styles/Error.module.css"

export default function ErrorPage() {
    const searchParams = useSearchParams();
    const message = searchParams.get("message") || "Une erreur est survenue.";
    const router = useRouter();

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Oups... 😢</h1>
                <p className={styles.message}>{decodeURIComponent(message)}</p>
                <button className={styles.button} onClick={() => router.push("/")}>
                    Retour à l&#39;accueil
                </button>
            </div>
        </div>
    );
}
