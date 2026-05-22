"use client";

import { useEffect, useState } from "react";
import styles from "./stores.module.css";

export default function StoresPage() {
    const [stores, setStores] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchStores();
    }, []);

    const fetchStores = async () => {
        const token = localStorage.getItem("token");

        const response = await fetch("/api/stores", {
            headers: {
                authorization: token,
            },
        });

        const data = await response.json();

        setStores(data);
    };

    const filteredStores = stores.filter((store) => {
        return (
            store.name.toLowerCase().includes(search.toLowerCase()) ||
            store.address.toLowerCase().includes(search.toLowerCase())
        );
    });

    const submitRating = async (storeId, rating) => {
        const token = localStorage.getItem("token");

        const response = await fetch("/api/rate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: token,
            },
            body: JSON.stringify({
                storeId,
                rating,
            }),
        });

        const data = await response.json();

        alert(data.message);
    };

    return (
        <div className={styles.container}>
            <div className={styles.topBar}>
                <h1>Stores</h1>

                <button
                    onClick={() => {
                        localStorage.clear();
                        document.cookie =
                            "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                        window.location.href = "/login";
                    }}
                >
                    Logout
                </button>
            </div>
            <input
                type="text"
                placeholder="Search stores"
                className={styles.searchInput}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className={styles.storeGrid}>
                {filteredStores.map((store) => (
                    <div key={store.id} className={styles.storeCard}>
                        <h2>{store.name}</h2>

                        <p>{store.address}</p>
                        <p>Average Rating: {store.averageRating}</p>
                        <p>
                            Your Rating:{" "}
                            {store.userSubmittedRating || "Not rated"}
                        </p>

                        <div className={styles.ratingRow}>
                            {[1, 2, 3, 4, 5].map((num) => (
                                <button
                                    key={num}
                                    onClick={() => submitRating(store.id, num)}
                                ></button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
