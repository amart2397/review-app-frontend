import { useCallback, useEffect } from "react"
import styles from "./Modal.module.css"

const Modal = ({ onClose, children }) => {
  // Memoized Escape key handler
  const handleEsc = useCallback(
    (event) => {
      if (event.key === "Escape") {
        onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    document.addEventListener("keydown", handleEsc)
    return () => {
      document.removeEventListener("keydown", handleEsc)
    }
  }, [handleEsc])

  return (
    <div className={styles.backdrop} onMouseDown={onClose}>
      <div className={styles.modal} onMouseDown={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default Modal
