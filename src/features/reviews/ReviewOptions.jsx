import { useRef, useState } from "react"
import OptionsDropdown from "../../components/OptionsDropdown"
import ReviewFormEdit from "./ReviewFormEdit"
import Modal from "../../components/Modal"
import ConfirmDeleteReview from "./ConfirmDeleteReview"

const ReviewOptions = ({ review, permissions }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeletePopup, setShowDeletePopup] = useState(false)
  const wrapperRef = useRef(null)

  const toggleDropdown = () => setIsOpen((prev) => !prev)
  const closeDropdown = () => setIsOpen(false)

  const handleEditClick = () => {
    setShowEditModal(true)
    closeDropdown()
  }
  const handleEditClose = () => {
    setShowEditModal(false)
  }

  const handleDeleteClick = () => {
    setShowDeletePopup(true)
    closeDropdown()
  }
  const handleDeleteClose = () => {
    setShowDeletePopup(false)
  }
  const options = (
    <>
      {permissions?.canEdit && (
        <button
          onClick={handleEditClick}
          aria-haspopup="dialog"
          className="dropdown-option"
        >
          Edit Review
        </button>
      )}
      {permissions?.canDelete && (
        <button
          onClick={handleDeleteClick}
          aria-haspopup="dialog"
          className="dropdown-option"
        >
          Delete Review
        </button>
      )}
    </>
  )

  return (
    <>
      {/* Option Dropdown */}
      <div ref={wrapperRef} style={{ position: "relative" }}>
        <button
          onClick={toggleDropdown}
          aria-haspopup="menu"
          aria-expanded={isOpen}
          aria-controls="options-dropdown-menu"
          className="options-button"
        >
          ⋅ ⋅ ⋅
        </button>

        {isOpen && (
          <OptionsDropdown
            isOpen={isOpen}
            onClose={closeDropdown}
            dropdownRef={wrapperRef}
          >
            {options}
          </OptionsDropdown>
        )}
      </div>

      {/* Modals & Popups */}
      {showEditModal && (
        <Modal onClose={handleEditClose}>
          <ReviewFormEdit
            previousReview={review}
            onSuccess={handleEditClose}
            media={review?.media}
          />
        </Modal>
      )}
      {showDeletePopup && (
        <ConfirmDeleteReview
          onClose={handleDeleteClose}
          reviewId={review?.id}
        />
      )}
    </>
  )
}

export default ReviewOptions
