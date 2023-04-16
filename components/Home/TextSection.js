import styles from "../../styles/Home.module.css";

export default function TextSection(props) {
  return (
    <div className={styles.container__content}>
      <h2 className={styles.content__subheading}>{props.heading}</h2>
      <p className={styles.content__text}>{props.text}</p>
    </div>
  );
}
