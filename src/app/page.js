import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
    return (
        <div className={styles.container}>
            <div className={styles.overlay}></div>

            <div className={styles.content}>
                <h1>Store Rating Platform</h1>

                <p>
                    Discover stores, rate your experience, and manage ratings
                    through role-based dashboards.
                </p>

                <div className={styles.buttonGroup}>
                    <Link href="/signup" className={styles.primaryBtn}>
                        Create Account
                    </Link>

                    <Link href="/login" className={styles.secondaryBtn}>
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
