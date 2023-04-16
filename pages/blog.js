import Head from "next/head";

import Divider from "../components/Global/Divider";
import Navbar from "../components/Global/Navbar";
import Footer from "../components/Global/Footer";

import TextSection from "../components/Home/TextSection";
import styles from "../styles/Home.module.css";

export default function Portfolio() {
  return (
    <div className={styles.master}>
      <Head>
        <title>Parth Sharma</title>
        <meta
          name="description"
          content="The website and blog of Parth Sharma, a developer, designer, builder and sophomore at BITS Pilani."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.card}>
        <Navbar />
        <Divider />

        <TextSection heading="Blog" text="Coming soon!" />

        <Divider />
        <Footer />
      </div>
    </div>
  );
}
