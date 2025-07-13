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
}

export default new ReviewsAPI()
