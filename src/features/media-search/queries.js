import MediaSearchAPI from "./api.js"
import { useInfiniteQuery } from "@tanstack/react-query"

export const useBookSearch = ({ title, author }) =>
  useInfiniteQuery({
    queryKey: ["books", title, author],
    queryFn: async ({ pageParam }) =>
      await MediaSearchAPI.searchBooks({ title, author, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1
      return nextPage <= 5 && lastPage.items?.length !== 0
        ? nextPage
        : undefined
    },
    enabled: !!title && title.length >= 3,
    gcTime: 1000 * 10, //cleanup unused selected queries after 10 seconds
  })

export const useMovieSearch = ({ title, year }) =>
  useInfiniteQuery({
    queryKey: ["movies", title, year],
    queryFn: async ({ pageParam }) =>
      await MediaSearchAPI.searchMovies({ title, year, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1
      return nextPage <= 5 && lastPage.items?.length !== 0
        ? nextPage
        : undefined
    },
    enabled: !!title && title.length >= 3,
    gcTime: 1000 * 10, //cleanup unused selected queries after 10 seconds
  })
