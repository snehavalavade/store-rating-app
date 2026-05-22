"use client";

import { useState } from "react";
import styles from "./signup.module.css";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
    });

    const handleSignup = async () => {
        const response = await fetch("/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Signup successful");

            router.push("/login");
        } else {
            alert(data.message);
        }
    };

    if (formData.name.length < 5) {
        alert("Name should be at least 5 characters");

        return;
    }

    if (formData.address.length > 400) {
        alert("Address is too long");

        return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_]).{8,16}$/;

    if (!passwordRegex.test(formData.password)) {
        alert(
            "Password must contain uppercase letter, special character and be 8-16 characters long",
        );

        return;
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1>Create Account</h1>

                <input
                    type="text"
                    placeholder="Name"
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            name: e.target.value,
                        })
                    }
                />

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

                <textarea
                    placeholder="Address"
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            address: e.target.value,
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

                <button onClick={handleSignup}>Signup</button>
            </div>
        </div>
    );
}
