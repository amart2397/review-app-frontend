import { useAppStore } from "../../stores/useAppStore"

class MediaSearchAPI {
  constructor(baseUrl = "http://localhost:3000") {
    this.baseUrl = baseUrl
  }

  // @desc Search books using title and author queries
  // @route GET /media-search/books
  // @access Private
  searchBooks = async ({ title, author, page = 1 }) => {
    const params = new URLSearchParams()
    if (title) params.append("title", title)
    if (author) params.append("author", author)
    params.append("page", page)

    const csrfToken = useAppStore.getState().csrfToken

    const res = await fetch(
      `${this.baseUrl}/media-search/books?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken,
        },
        credentials: "include",
      }
    )
    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData?.message || "Failed to fetch search query")
    }
    return res.json()
  }

  // @desc Get full book details
  // @route GET /media-search/books/:id
  // @access Private
  selectBook = async ({ id }) => {
    const csrfToken = useAppStore.getState().csrfToken

    const res = await fetch(
      `${this.baseUrl}/media-search/books/${encodeURIComponent(id)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken,
        },
        credentials: "include",
      }
    )
    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData?.message || "Failed to fetch search query")
    }
    return res.json()
  }

  // @desc Search movies using title and release year queries
  // @route GET /media-search/movies
  // @access Private
  searchMovies = async ({ title, year, page = 1 }) => {
    const params = new URLSearchParams()
    if (title) params.append("title", title)
    if (year) params.append("year", year)
    params.append("page", page)

    const csrfToken = useAppStore.getState().csrfToken

    const res = await fetch(
      `${this.baseUrl}/media-search/movies?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken,
        },
        credentials: "include",
      }
    )
    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData?.message || "Failed to fetch search query")
    }
    return res.json()
  }

  // @desc Get full movie details
  // @route GET /media-search/movies/:id
  // @access Private
  selectMovie = async ({ id }) => {
    const csrfToken = useAppStore.getState().csrfToken
    console.log("📚 Calling selectBook with ID:", id)
    const res = await fetch(
      `${this.baseUrl}/media-search/movies/${encodeURIComponent(id)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken,
        },
        credentials: "include",
      }
    )
    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData?.message || "Failed to fetch search query")
    }
    return res.json()
  }
}

export default new MediaSearchAPI()
