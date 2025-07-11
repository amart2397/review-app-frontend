import ReviewCard from "./ReviewCard"
import styles from "./ReviewList.module.css"
import { useReviews } from "./queries.js"

const ReviewList = () => {
  const { isPending, isError, data, error } = useReviews()
  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  console.log(data)
  return (
    <div className={styles["review-list"]}>
      {data?.map((review) => (
        <ReviewCard data={review} key={review.id} />
      ))}
    </div>
  )
}

export default ReviewList
