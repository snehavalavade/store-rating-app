"use client";

import { useState } from "react";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleLogin = async () => {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("token", data.token);
            document.cookie = `token=${data.token}; path=/`;

            localStorage.setItem("user", JSON.stringify(data.user));

            router.push("/stores");
        } else {
            alert(data.message);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1>Login</h1>

                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            email: e.target.value,
                        })
                    }
                />

                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            password: e.target.value,
                        })
                    }
                />

                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
}
