"use client";

import { useState } from "react";
import styles from "./update-password.module.css";

export default function UpdatePasswordPage() {
    const [password, setPassword] = useState("");

    const updatePassword = async () => {
        const token = localStorage.getItem("token");

        const response = await fetch("/api/update-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: token,
            },
            body: JSON.stringify({
                password,
            }),
        });

        const data = await response.json();

        alert(data.message);
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1>Update Password</h1>

                <input
                    type="password"
                    placeholder="New Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={updatePassword}>Update Password</button>
            </div>
        </div>
    );
}
