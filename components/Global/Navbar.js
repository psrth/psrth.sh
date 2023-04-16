import styles from "../../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";
import psrth from "../../public/psrth.jpg";

export default function Navbar(props) {
  return (
    <div className={styles.header}>
      <Link href="/">
        <div className={styles.header__main}>
          <div className={styles.header__pp}>
            <Image
              src={psrth}
              height="60px"
              width="60px"
              placeholder="blur"
              alt="parth sharma with a mountain dog"
            />
          </div>
          <h1 className={styles.header__title}>Parth Sharma</h1>
        </div>
      </Link>

      {/* <div className={styles.header__navbar}>
        <Link href="/blog">
          <div className={styles.header__navlink}>Blog</div>
        </Link>
        <Link href="https://drive.google.com/file/d/1Tf9pPPseQPO8gatYxUvc2sOf-tjXHR8R/view">
          <div className={styles.header__navlink}>Resume</div>
        </Link>
        <Link href="/portfolio">
          <div className={styles.header__navlink}>Portfolio</div>
        </Link>
      </div> */}
    </div>
  );
}
