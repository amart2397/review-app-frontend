import { useEffect, useRef, useState } from "react"
import { useMovieSearch } from "./queries"
import { useDebounce } from "../../hooks/useDebounce"
import styles from "./MediaSearch.module.css"
import { useAppStore } from "../../stores/useAppStore"
import MediaDisplaySmall from "../../components/MediaDisplaySmall"
import MediaSearchAPI from "./api"

const MovieSearch = () => {
  const [title, setTitle] = useState("")
  const debouncedTitle = useDebounce(title, 500)
  const [year, setYear] = useState(undefined)
  const debouncedYear = useDebounce(year, 500)
  const [loadingSelect, setLoadingSelect] = useState(false)
  const [selectError, setSelectError] = useState(null)
  const sentinelRef = useRef()

  const setSelectedMedia = useAppStore((s) => s.setSelectedMedia)

  const {
    isError,
    data,
    error,
    isFetching,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useMovieSearch({
    title: debouncedTitle,
    year: debouncedYear,
  })
  const canLoad = hasNextPage && !isFetchingNextPage

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && canLoad) {
          fetchNextPage()
        }
      },
      { root: document.getElementById("results-scroll"), rootMargin: "100px" }
    )

    if (sentinelRef.current) observer.observe(sentinelRef.current)

    return () => observer.disconnect()
  }, [canLoad, fetchNextPage])

  const handleSelected = async (e) => {
    const id = e.currentTarget.dataset.key
    setLoadingSelect(true)
    setSelectError(null)

    try {
      const media = await MediaSearchAPI.selectMovie({ id })
      setSelectedMedia(media)
    } catch (err) {
      setSelectError(err?.message)
    } finally {
      setLoadingSelect(false)
    }
  }

  if (loadingSelect) return <p>Loading...</p>

  return (
    <div>
      {selectError && <span>{selectError}</span>}
      <h2 className={styles.title}>Movie Search</h2>
      <div className={styles.inputs}>
        <label className={styles.label} htmlFor="title">
          Title:
        </label>
        <input
          type="text"
          value={title}
          className={styles["input-box"]}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className={styles.label} htmlFor="title">
          Release Year:
        </label>
        <input
          type="text"
          value={year}
          className={styles["input-box"]}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>
      <ul id="results-scroll" className={styles.results}>
        {data?.pages.flatMap((group, groupIndex) =>
          group.results.map((movie, movieIndex) => (
            <li
              key={`${groupIndex}-${movieIndex}`}
              data-key={movie.mediaKey}
              onClick={handleSelected}
              className={styles["result-item"]}
            >
              <MediaDisplaySmall data={movie} />
            </li>
          ))
        )}
        <li ref={sentinelRef} aria-hidden="true" />
        {isFetching && (
          <li
            aria-busy="true"
            style={{ fontStyle: "italic" }}
            className={styles["result-message"]}
          >
            Loading…
          </li>
        )}
        {isError && (
          <li style={{ color: "red" }} className={styles["result-message"]}>
            Error: {error?.message}
          </li>
        )}
        {!isFetching &&
          !isError &&
          data?.pages?.every((group) => group.results.length === 0) && (
            <li
              style={{ fontStyle: "italic" }}
              className={styles["result-message"]}
            >
              No results.
            </li>
          )}
        {!hasNextPage &&
          data?.pages &&
          !data.pages?.every((group) => group.results.length === 0) && (
            <li className={styles["result-message"]}>End of results</li>
          )}
      </ul>
    </div>
  )
}

export default MovieSearch
