import Head from "next/head";
import Link from "next/link";

import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";

import Divider from "../components/Global/Divider";
import Navbar from "../components/Global/Navbar";
import Footer from "../components/Global/Footer";

import TextSection from "../components/Home/TextSection";
import BookContainer from "../components/Home/BookContainer";

import { readingList } from "../data/home";
import styles from "../styles/Home.module.css";

export default function Home() {
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

        <TextSection
          heading="About Me"
          text="Hey there 👋🏻 ! I’m Parth, (aka @psrth) — a junior at BITS Pilani by day, and a developer+designer by night. I love building tech-based products, YOLO-ing all my money, debating, and travelling (in no particular order)."
        />

        {/* WORK SECTION */}
        <div className={styles.container__content}>
          <h2 className={styles.content__subheading}>Work</h2>
          <div className={styles.container__card}>
            <Link href="/">
              <div className={styles.work__card__1}>
                <p className={styles.work__card__text}>
                  building a stealth startup. <br></br>stay tuned, we're
                  launching soon :)
                </p>
              </div>
            </Link>

            <Link href="https://orangeyak.co/">
              <div className={styles.work__card__2}>
                <p className={styles.work__card__text}>
                  co-founder @orangeyak, a digital agency in India. all things
                  ops/design/tech.
                </p>
              </div>
            </Link>

            <Link href="https://conquest.org.in/">
              <div className={styles.work__card__3}>
                <p className={styles.work__card__text}>
                  design+tech lead @conquest, India’s largest student-run
                  startup accelerator
                </p>
              </div>
            </Link>
          </div>
          <div className={styles.container__card}>
            <Link href="https://fischerjordan.com/">
              <div className={styles.work__card__4}>
                <p className={styles.work__card__text}>
                  software development intern @FischerJordan, a NYC based
                  consulting firm
                </p>
              </div>
            </Link>

            <Link href="https://acm.org/">
              <div className={styles.work__card__5}>
                <p className={styles.work__card__text}>
                  frontend software developer @ the ACM charter at BITS Pilani
                </p>
              </div>
            </Link>
          </div>
        </div>

        <TextSection
          heading="Learning"
          text="Over the summer, I’ll probably be working on a couple of things — building out a few SaaS products @orangeyak, learning more about the web3 space and building with Selenium, backend arch in Node.js, and competitive coding for recruitments season."
        />

        <BookContainer heading="Reading" books={readingList} />

        {/* LINKS SECTION */}
        <div className={styles.container__content}>
          <h2 className={styles.content__subheading}>Links</h2>
          <p className={styles.content__text}>
            Here are all the places you can find me on the internet. If you want
            to contact me for work, grab a cup of coffee, or just chat about
            stuff, drop me a DM on Twitter.
          </p>

          <div className={styles.container__social}>
            <a href="https://github.com/psrth" target="_blank" rel="noreferrer">
              <div className={styles.card__social1}>
                <FaGithub color="white" size="20px" />
                <p className={styles.card__text}>Github</p>
              </div>
            </a>

            <a
              href="https://linkedin.com/in/psrth"
              target="_blank"
              rel="noreferrer"
            >
              <div className={styles.card__social2}>
                <FaLinkedin color="white" size="20px" />
                <p className={styles.card__text}>LinkedIn</p>
              </div>
            </a>

            <a
              href="https://twitter.com/psrthsharma"
              target="_blank"
              rel="noreferrer"
            >
              <div className={styles.card__social}>
                <FaTwitter color="white" size="20px" />
                <p className={styles.card__text}>Twitter</p>
              </div>
            </a>

            <a
              href="https://instagram.com/psrthsharma"
              target="_blank"
              rel="noreferrer"
            >
              <div className={styles.card__social3}>
                <FaInstagram color="white" size="20px" />
                <p className={styles.card__text}>Instagram</p>
              </div>
            </a>
          </div>

          <p className={styles.content__text}>
            or shoot me an email at <strong>psrth[at]proton[dot]me</strong>
          </p>
        </div>

        <Divider />
        <Footer />
      </div>
    </div>
  );
}
