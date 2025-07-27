import { useEditReview } from "./queries"
import ReviewFormBase from "./ReviewFormBase"

const ReviewFormEdit = ({ media, onSuccess, previousReview }) => {
  const {
    mutate: submitReview,
    isLoading,
    isError,
    error,
  } = useEditReview(onSuccess)

  const { title, text, rating, id } = previousReview || {}

  return (
    <ReviewFormBase
      media={media}
      reviewId={id}
      initialTitle={title}
      initialBody={text}
      initialRating={rating}
      onSubmit={submitReview}
      isLoading={isLoading}
      isError={isError}
      submitError={error}
      submitLabel="Update Review"
      mode="edit"
    />
  )
}

export default ReviewFormEdit
