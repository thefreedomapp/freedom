import type { NextPage } from "next";
import Head from "next/head";
import styles from "@/styles/Home.module.css";

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Freedom</title>
                <meta
                    name="description"
                    content="Giving voice to the shunned."
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome To <a href="/">Freedom!</a>
                </h1>

                <h2>Giving voice to the shunned.</h2>

                <div className={styles.grid}>
                    <a href="/causes" className={styles.card}>
                        <h2>Causes &rarr;</h2>
                        <p>
                            Show some love to people facing ethnic cleansing &
                            danger.
                        </p>
                    </a>

                    <a href="/account" className={styles.card}>
                        <h2>Log In &rarr;</h2>
                        <p>
                            Log in with your account and chat with people from
                            all over the world.
                        </p>
                    </a>

                    <a href="/direct" className={styles.card}>
                        <h2>Direct &rarr;</h2>
                        <p>
                            Have some time to yourselves, talk in a seperate
                            chat.
                        </p>
                    </a>

                    <a href="/support" className={styles.card}>
                        <h2>Support &rarr;</h2>
                        <p>
                            Show how you can help. Donate, Sign a petition,
                            either way, it counts.
                        </p>
                    </a>
                </div>
            </main>
        </div>
    );
};

export default Home;
