import ReviewsAPI from "./ReviewsAPI.js"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useReviews = () =>
  useQuery({
    queryKey: ["reviews"],
    queryFn: ReviewsAPI.getAllReviews,
    staleTime: 1000 * 60 * 5,
  })

export const useSubmitReview = (onSuccess) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ review }) => {
      const res = await ReviewsAPI.submitReview(review)
      return res
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"])
      onSuccess()
    },
  })
}

export const useEditReview = (onSuccess) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ review, id }) => {
      const res = await ReviewsAPI.editReview({ review, id })
      return res
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"])
      onSuccess()
    },
  })
}

export const useDeleteReview = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id }) => {
      const res = await ReviewsAPI.deleteReview({ id })
      return res
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"])
    },
  })
}
