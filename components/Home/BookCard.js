import styles from '../../styles/Home.module.css'

export default function BookCard (props) {
    return (
        <div key={props.id} className={styles.read__card}>
            <h3 className={styles.read__card__h}>{props.title}</h3>
            <p className={styles.read__card__p}>{props.author}</p>
        </div>
    )
}