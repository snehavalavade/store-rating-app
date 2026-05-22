"use client";

import { useEffect, useState } from "react";
import styles from "./owner.module.css";

export default function OwnerPage() {
    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        const token = localStorage.getItem("token");

        const response = await fetch("/api/owner", {
            headers: {
                authorization: token,
            },
        });

        const data = await response.json();

        setDashboard(data);
    };

    if (!dashboard) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className={styles.container}>
            <h1>Store Owner Dashboard</h1>

            <div className={styles.card}>
                <h2>{dashboard.storeName}</h2>

                <p>Average Rating: {dashboard.averageRating}</p>
            </div>

            <h2 className={styles.heading}>Users Who Rated</h2>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Rating</th>
                    </tr>
                </thead>

                <tbody>
                    {dashboard.ratings.map((item) => (
                        <tr key={item.id}>
                            <td>{item.user.name}</td>

                            <td>{item.user.email}</td>

                            <td>{item.rating}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
