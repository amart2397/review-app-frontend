import { useSubmitReview } from "./queries"
import ReviewFormBase from "./ReviewFormBase"

const ReviewFormNew = ({ media, onSuccess }) => {
  const {
    mutate: submitReview,
    isLoading,
    isError,
    error,
  } = useSubmitReview(onSuccess)

  return (
    <ReviewFormBase
      media={media}
      onSubmit={submitReview}
      isLoading={isLoading}
      isError={isError}
      submitError={error}
      submitLabel="Submit Review"
      mode="new"
    />
  )
}

export default ReviewFormNew
