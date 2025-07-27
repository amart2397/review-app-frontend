import Modal from "../../components/Modal"
import styles from "./ConfirmDeleteReview.module.css"
import { useDeleteReview } from "./queries"

const ConfirmDeleteReview = ({ onClose, reviewId }) => {
  const {
    mutateAsync: deleteReview,
    isLoading,
    isError,
    error,
  } = useDeleteReview()

  const handleConfirm = async () => {
    try {
      await deleteReview({ id: reviewId })
      onClose()
    } catch (err) {
      console.error("Failed to delete review:", err)
    }
  }

  return (
    <Modal onClose={onClose}>
      <div className="flex-center flex-column">
        <h3 className="no-margins no-padding">Delete Review?</h3>
        <p>Are you sure you want to delete this review?</p>
        {isError && <p>{error?.message || "Something went wrong."}</p>}
      </div>
      <div className={`flex-center ${styles.options}`}>
        <button
          onClick={handleConfirm}
          disabled={isLoading}
          className={`std-button ${styles.confirm}`}
        >
          {isLoading ? "Deleting..." : "YES, DELETE"}
        </button>
        <button
          onClick={onClose}
          disabled={isLoading}
          className={`std-button ${styles.cancel}`}
        >
          NO, CANCEL
        </button>
      </div>
    </Modal>
  )
}

export default ConfirmDeleteReview
