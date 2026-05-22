"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const router = useRouter();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            router.push("/login");
            return;
        }

        if (user.role === "ADMIN") {
            router.push("/admin");
        } else if (user.role === "STORE_OWNER") {
            router.push("/owner");
        } else {
            router.push("/stores");
        }
    }, [router]);

    return (
        <div
            style={{
                padding: "40px",
            }}
        >
            Redirecting...
        </div>
    );
}
