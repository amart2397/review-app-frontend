import { useState } from "react"
import Modal from "../../components/Modal"
import BookSearch from "../media-search/BookSearch"
import MovieSearch from "../media-search/MovieSearch"
import SelectMedia from "../../components/SelectMedia"
import { useAppStore } from "../../stores/useAppStore"
import NewReviewForm from "./NewReviewForm"
import styles from "./NewReviewButton.module.css"

const NewReviewButton = () => {
  const [stage, setStage] = useState("idle")
  const clearSelectedMedia = useAppStore((s) => s.clearSelectedMedia)
  const selectedMedia = useAppStore((s) => s.selectedMedia)

  //handlers
  const handleClick = () => {
    setStage("mediaType")
  }
  const handleClose = () => {
    clearSelectedMedia()
    setStage("idle")
  }
  const handleMediaTypeSelection = (e) => {
    setStage(e.currentTarget.dataset.type)
  }

  //display logic
  const showModal = stage !== "idle"
  const showBook = stage === "book"
  const showMovie = stage === "movie"
  const choosingMedia = stage === "mediaType"

  return (
    <>
      <button
        onClick={handleClick}
        aria-haspopup="dialog"
        className={`std-button ${styles.button}`}
      >
        Create new review...
      </button>
      {showModal && (
        <Modal onClose={handleClose}>
          {choosingMedia && (
            <SelectMedia handleSelection={handleMediaTypeSelection} />
          )}
          {showBook && !selectedMedia && <BookSearch />}
          {showMovie && !selectedMedia && <MovieSearch />}
          {selectedMedia && (
            <NewReviewForm media={selectedMedia} onSuccess={handleClose} />
          )}
        </Modal>
      )}
    </>
  )
}

export default NewReviewButton
