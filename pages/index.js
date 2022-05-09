import Head from 'next/head'
import styles from '../styles/Home.module.css'

import { readingList } from '../data/home';

import { 
  FaLinkedin, 
  FaGithub,
  FaTwitter,
  FaInstagram
} from "react-icons/fa";
import Link from 'next/link';



export default function Home() {
  return (
    <div className={styles.master}>
      <Head>
        <title>Parth Sharma</title>
        <meta name="description" content="The website and blog of Parth Sharma, a developer, designer, builder and sophomore at BITS Pilani." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.card}>

        {/* HEADER SECTION */}
        <div className={styles.header}>
          <div className={styles.header__main}>
            <img 
              src="https://avatars.githubusercontent.com/u/45586386?v=4" 
              className={styles.header__pp} 
            />
            <h1 className={styles.header__title}>Parth Sharma</h1>
          </div>

          <div className={styles.header__navbar}>
            <Link href="/blog">
              <div className={styles.header__navlink}>Blog</div>
            </Link>
            <Link href="/resume">
              <div className={styles.header__navlink}>Resume</div>
            </Link>
            <Link href="/portfolio">
              <div className={styles.header__navlink}>Portfolio</div>
            </Link>
          </div>
        </div>




        {/* DIVIDER */}
        <div className={styles.divider} />




        {/* CONTENT SECTION */}
        <div className={styles.container__content}>
          <h2 className={styles.content__subheading}>About Me</h2>
          <p className={styles.content__text}>
            Hey there 👋🏻 ! I’m Parth, (aka @psrth) — a sophomore at BITS Pilani by day, and a developer+designer by night. I love building tech-based products, YOLO-ing all my money, debating, and travelling (in no particular order).
          </p>
        </div>




        {/* WORK SECTION */}
        <div className={styles.container__content}>
          <h2 className={styles.content__subheading}>Work</h2>
          <div className={styles.container__card}>
            <Link href="http://raisehq.co/">
              <div className={styles.work__card__1}>
                <p className={styles.work__card__text}>working on a stealth startup based in the crypto/web3 space.</p>
              </div>
            </Link>

            <Link href="http://orangeyak.co/">
              <div className={styles.work__card__2}>
                <p className={styles.work__card__text}>co-founder @orangeyak, a digital agency in India. all things ops/design/tech.</p>
              </div>
            </Link>

            <Link href="http://conquest.org.in/">
              <div className={styles.work__card__3}>
                <p className={styles.work__card__text}>design+tech lead @conquest, India’s largest student-run startup accelerator</p>
              </div>
            </Link>
          </div>
        </div>




        {/* LEARNING SECTION */}
        <div className={styles.container__content}>
          <h2 className={styles.content__subheading}>Learning</h2>
          <p className={styles.content__text}>
            Over the summer, I’ll probably be working on a couple of things — building out a few SaaS products @orangeyak, learning more about the web3 space and building with Selenium, backend arch in Node.js, and competitive coding for recruitments season.
          </p>
        </div>



        {/* READING SECTION */}
        <div className={styles.container__content}>
          <h2 className={styles.content__subheading}>Reading</h2>
          <div className={styles.container__card__reading}>

            {readingList.map((book, id) => (
              <div key={book.id} className={styles.read__card}>
                <h3 className={styles.read__card__h}>{book.title}</h3>
                <p className={styles.read__card__p}>{book.author}</p>
              </div>
            ))}
            
          </div>
        </div>




        {/* LINKS SECTION */}
        <div className={styles.container__content}>
          <h2 className={styles.content__subheading}>Links</h2>
          <p className={styles.content__text}>
            Here are all the places you can find me on the internet. If you want to contact me for work, grab a cup of coffee, or just chat about stuff, drop me a DM on Twitter.
          </p>
          
          <div className={styles.container__social}>

            <a href="https://github.com/psrth" target="_blank" rel="noreferrer">
              <div className={styles.card__social1}>
                <FaGithub color="white" size="20px" />
                <p className={styles.card__text}>Github</p>
              </div>
            </a>

            <a href="https://linkedin.com/in/psrth" target="_blank" rel="noreferrer">
              <div className={styles.card__social2}>
                <FaLinkedin color="white" size="20px" />
                <p className={styles.card__text}>LinkedIn</p>
              </div>
            </a>

            <a href="https://twitter.com/psrthsharma" target="_blank" rel="noreferrer">
              <div className={styles.card__social}>
                <FaTwitter color="white" size="20px" />
                <p className={styles.card__text}>Twitter</p>
              </div>
            </a>

            <a href="https://instagram.com/psrthsharma" target="_blank" rel="noreferrer">
              <div className={styles.card__social3}>
                <FaInstagram color="white" size="20px" />
                <p className={styles.card__text}>Instagram</p>
              </div>
            </a>

          </div>

          <p className={styles.content__text}>
            or shoot me an email at  <strong>psrth[at]proton[dot]me</strong>
          </p>
        </div>





         {/* DIVIDER */}
         <div className={styles.divider} />



         {/* FOOTER SECTION*/}
         <a href="https://github.com/psrth/psrth.io" target="_blank" rel="noreferrer">
          <div className={styles.container__footer}>
              <p className={styles.footer__copyright}>© 2022 — All Rights Reserved</p>
              <p className={styles.footer__sign}>Built with ❤️ using Vercel & Next.js</p>
          </div>
         </a>
      
      </div>
    </div>
  )
}
