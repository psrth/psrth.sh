import styles from "../../styles/Home.module.css";

export default function Footer(props) {
  return (
    <a
      href="https://github.com/psrth/psrth.io"
      target="_blank"
      rel="noreferrer"
    >
      <div className={styles.container__footer}>
        <p className={styles.footer__copyright}>© 2022 — All Rights Reserved</p>
        <p className={styles.footer__sign}>
          Built with ❤️ using Vercel & Next.js
        </p>
      </div>
    </a>
  );
}
