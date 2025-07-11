import ReviewsAPI from "./api.js"
import { useQuery } from "@tanstack/react-query"

export const useReviews = () =>
  useQuery({
    queryKey: ["reviews"],
    queryFn: ReviewsAPI.getAllReviews,
    staleTime: 1000 * 60 * 5,
  })
