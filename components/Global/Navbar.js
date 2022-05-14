import styles from '../../styles/Home.module.css'
import Link from 'next/link';

export default function Navbar (props) {
    return (
        <div className={styles.header}>
          <Link href="/">
            <div className={styles.header__main}>
              <img 
                src="https://avatars.githubusercontent.com/u/45586386?v=4" 
                className={styles.header__pp} 
              />
              <h1 className={styles.header__title}>Parth Sharma</h1>
            </div>
          </Link>

          <div className={styles.header__navbar}>
            <Link href="/blog">
              <div className={styles.header__navlink}>Blog</div>
            </Link>
            <Link href="https://drive.google.com/file/d/1Tf9pPPseQPO8gatYxUvc2sOf-tjXHR8R/view">
              <div className={styles.header__navlink}>Resume</div>
            </Link>
            <Link href="/portfolio">
              <div className={styles.header__navlink}>Portfolio</div>
            </Link>
          </div>
        </div>
    )
}