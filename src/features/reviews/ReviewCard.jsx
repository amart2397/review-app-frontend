import { useAppStore } from "../../stores/useAppStore"
import styles from "./ReviewCard.module.css"
import ReviewOptions from "./ReviewOptions"

const ReviewCard = ({ data }) => {
  const { title, text, rating, author, media } = data
  const user = useAppStore((s) => s.user)
  const permissions = {
    canEdit: user?.id === author.id,
    canDelete: user?.id === author.id,
  }

  return (
    <article className={styles["review-card"]}>
      <img
        className={styles["cover-art"]}
        src={media?.artLarge}
        alt="cover art"
      />

      <header className={styles["review-header"]}>
        <div className={styles["title-group"]}>
          <h2 className={styles["review-title"]}>{title}</h2>
          <p className={styles["review-author"]}>
            by {author.firstName} {author.lastName}
          </p>
        </div>
        <ReviewOptions review={data} permissions={permissions} />
      </header>

      <section className={styles["review-content"]}>
        <p className={styles["review-text"]}>{text}</p>
      </section>

      <footer className={styles["review-footer"]}>
        <p className={styles["review-rating"]}>{rating} / 10</p>
      </footer>
    </article>
  )
}

export default ReviewCard
