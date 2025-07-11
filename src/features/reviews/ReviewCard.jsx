import styles from "./ReviewCard.module.css"
const ReviewCard = ({ data }) => {
  const { title, text, rating, author, media } = data
  const card = (
    <article className={styles["review-card"]}>
      <img
        className={styles["cover-art"]}
        src={media?.artUrl}
        alt="cover art"
      />

      <header className={styles["review-header"]}>
        <h2 className={styles["review-title"]}>{title}</h2>
        <p className={styles["review-author"]}>
          by {author.firstName} {author.lastName}
        </p>
      </header>

      <section className={styles["review-content"]}>
        <p className={styles["review-text"]}>{text}</p>
      </section>

      <footer className={styles["review-footer"]}>
        <p className={styles["review-rating"]}>{rating} / 10</p>
      </footer>
    </article>
  )
  return card
}

export default ReviewCard
