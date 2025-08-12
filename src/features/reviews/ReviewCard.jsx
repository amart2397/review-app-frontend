import { useAppStore } from "../../stores/useAppStore"
import ReviewOptions from "./ReviewOptions"
import styles from "./ReviewCard.module.css"

const ReviewCard = ({ data }) => {
  const { title, text, rating, author, media } = data
  const user = useAppStore((s) => s.user)
  const permissions = {
    canEdit: user?.id === author.id,
    canDelete: user?.id === author.id,
  }

  return (
    <article className={styles.card}>
      <img
        className={styles.thumbnail}
        src={media.artSmall}
        alt={media.title}
      />

      <header className={styles.header}>
        <div className={styles["media-info"]}>
          <h2 className={styles["media-title"]}>{media.title}</h2>
          <p className={styles["media-secondary"]}>
            {media.mediaType === "book"
              ? media.authors
              : media.releaseDate.slice(0, 4)}
          </p>
        </div>
        <ReviewOptions review={data} permissions={permissions} />
      </header>

      <section className={styles["section-one"]}>
        <p className={styles.author}>{author.displayName}</p>
        <p className={styles.rating}>★ {rating} / 10</p>
      </section>

      <section className={styles["section-two"]}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.text}>{text}</p>
      </section>
    </article>
  )
}

export default ReviewCard
