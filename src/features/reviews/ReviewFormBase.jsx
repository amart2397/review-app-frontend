import { useState } from "react"
import MediaDisplaySmall from "../../components/MediaDisplaySmall"
import { useAppStore } from "../../stores/useAppStore"
import styles from "./ReviewForm.module.css"

const ReviewFormBase = ({
  media,
  reviewId,
  initialTitle = "",
  initialBody = "",
  initialRating = 0,
  onSubmit,
  isLoading,
  isError,
  submitError,
  submitLabel = "Submit Review",
  mode,
}) => {
  const [rating, setRating] = useState(parseFloat(initialRating))
  const [title, setTitle] = useState(initialTitle)
  const [body, setBody] = useState(initialBody)
  const [isExpanded, setIsExpanded] = useState(
    Boolean(initialTitle || initialBody)
  )

  const clearSelectedMedia = useAppStore((s) => s.clearSelectedMedia)

  const handleEdit = () => clearSelectedMedia()

  const handleRating = (e) => {
    const value = parseFloat(e.target.value)
    if (!isNaN(value) && value >= 0 && value <= 10) {
      setRating(value)
    }
  }
  const handleTitle = (e) => setTitle(e.target.value)
  const handleBody = (e) => setBody(e.target.value)
  const handleExpand = (e) => {
    e.preventDefault()
    setIsExpanded((prev) => !prev)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
      review: {
        reviewTitle: isExpanded ? title : "",
        reviewText: isExpanded ? body : "",
        reviewRating: rating,
        ...(mode === "edit" ? { mediaId: media.id } : { media }),
      },
    }
    if (mode === "edit") payload.id = reviewId
    console.log(payload)
    onSubmit(payload)
  }

  const expandSymbol = isExpanded ? "▲" : "▼"

  return (
    <div>
      <div className={styles.media}>
        <MediaDisplaySmall data={media} />
        {mode === "new" && (
          <button onClick={handleEdit} className={`std-button ${styles.edit}`}>
            Edit Selection
          </button>
        )}
      </div>

      <form className={styles.review} onSubmit={handleSubmit}>
        <div className={styles.rating}>
          <label htmlFor="rating">Rating:</label>
          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={rating}
            onChange={handleRating}
            className={styles.slider}
          />
          <input
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={rating}
            onChange={handleRating}
            className={styles["input-box"]}
          />
          <span>/ 10</span>
        </div>

        {isExpanded && (
          <div className={`flex-column ${styles["full-review"]}`}>
            <label htmlFor="title">Review Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitle}
              autoComplete="off"
              required
              className={`input ${styles["title-input"]}`}
            />
            <label htmlFor="body">Review Body:</label>
            <textarea
              id="body"
              value={body}
              onChange={handleBody}
              required
              rows={6}
              placeholder="Share your thoughts about this media..."
              className={`input ${styles["body-input"]}`}
            />
          </div>
        )}

        <span
          onClick={handleExpand}
          className={styles["expand-button"]}
          role="button"
          tabIndex={0}
        >
          <span>{expandSymbol}</span>
          {!isExpanded ? " Add detailed review" : " Remove detailed review"}
        </span>

        <button
          className={`${styles.button} std-button`}
          disabled={isLoading || (isExpanded && !title && !body)}
        >
          {submitLabel}
        </button>
      </form>

      {isLoading && <div>Submitting...</div>}
      {isError && <div>Error: {submitError.message}</div>}
    </div>
  )
}

export default ReviewFormBase
