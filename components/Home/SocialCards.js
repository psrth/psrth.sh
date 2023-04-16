import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";

import styles from "../../styles/Home.module.css";

export default function SocialCards() {
  return (
    <div className={styles.container__content}>
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
    </div>
  );
}
