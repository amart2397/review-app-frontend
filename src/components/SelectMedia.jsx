import styles from "./SelectMedia.module.css"

const SelectMedia = ({ handleSelection }) => {
  return (
    <div className="flex-center flex-column">
      <h2>Choose Media Type...</h2>
      <div className={`flex-column flex-center ${styles["media-list"]}`}>
        <button
          data-type="book"
          onClick={handleSelection}
          className={`std-button ${styles["media-button"]}`}
        >
          Book
        </button>
        <button
          data-type="movie"
          onClick={handleSelection}
          className={`std-button ${styles["media-button"]}`}
        >
          Movie
        </button>
      </div>
    </div>
  )
}

export default SelectMedia
