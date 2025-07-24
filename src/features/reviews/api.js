import { useAppStore } from "../../stores/useAppStore"

class ReviewsAPI {
  constructor(baseUrl = "http://localhost:3000") {
    this.baseUrl = baseUrl
  }

  // @desc Retrieve all reviews
  // @route GET /reviews
  // @access Public
  getAllReviews = async () => {
    const res = await fetch(`${this.baseUrl}/reviews`)
    if (!res.ok) throw new Error("Failed to fetch reviews")
    return res.json()
  }

  submitReview = async (review) => {
    const csrfToken = useAppStore.getState().csrfToken

    const res = await fetch(`${this.baseUrl}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-csrf-token": csrfToken,
      },
      credentials: "include",
      body: JSON.stringify(review),
    })
    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.message || "Failed to submit review")
    }

    return await res.json()
  }
}

export default new ReviewsAPI()
