import styles from '../../styles/Home.module.css'
import BookCard from './BookCard'

export default function BookContainer (props) {
    return (
        <div className={styles.container__content}>
          <h2 className={styles.content__subheading}>{props.heading}</h2>
          <div className={styles.container__card__reading}>
            {props.books.map((book, id) => 
              <BookCard id={id} title={book.title} author={book.author} />
            )}
          </div>
        </div>
    )
}