"use client";

import { useEffect, useState } from "react";
import styles from "./admin.module.css";

export default function AdminPage() {
    const [dashboard, setDashboard] = useState(null);

    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        const response = await fetch("/api/admin");

        const data = await response.json();

        setDashboard(data);
    };

    if (!dashboard) {
        return <h1>Loading...</h1>;
    }

    const sortedUsers = dashboard.users
        ? [...dashboard.users].sort((a, b) => {
              if (sortOrder === "asc") {
                  return a.name.localeCompare(b.name);
              }

              return b.name.localeCompare(a.name);
          })
        : [];

    return (
        <div className={styles.container}>
            <h1>Admin Dashboard</h1>

            <div className={styles.statsGrid}>
                <div className={styles.card}>
                    <h2>{dashboard.totalUsers}</h2>

                    <p>Total Users</p>
                </div>

                <div className={styles.card}>
                    <h2>{dashboard.totalStores}</h2>

                    <p>Total Stores</p>
                </div>

                <div className={styles.card}>
                    <h2>{dashboard.totalRatings}</h2>

                    <p>Total Ratings</p>
                </div>
            </div>

            <h2 className={styles.heading}>Users</h2>

            <button
                className={styles.sortButton}
                onClick={() =>
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
            >
                Sort Users
            </button>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>

                <tbody>
                    {sortedUsers.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>

                            <td>{user.email}</td>

                            <td>{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 className={styles.heading}>Stores</h2>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Average Rating</th>
                    </tr>
                </thead>

                <tbody>
                    {dashboard.stores?.map((store) => (
                        <tr key={store.id}>
                            <td>{store.name}</td>

                            <td>{store.address}</td>

                            <td>{store.averageRating}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
