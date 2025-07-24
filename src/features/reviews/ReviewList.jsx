import ReviewCard from "./ReviewCard"
import { useReviews } from "./queries.js"

const ReviewList = () => {
  const { isPending, isError, data, error } = useReviews()
  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <>
      {data?.map((review) => (
        <ReviewCard data={review} key={review.id} />
      ))}
    </>
  )
}

export default ReviewList
