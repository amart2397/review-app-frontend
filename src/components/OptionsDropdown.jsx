import { useEffect, useRef, useCallback } from "react"
import styles from "./OptionsDropdown.module.css"

const OptionsDropdown = ({ children, isOpen, onClose, dropdownRef }) => {
  const menuRef = useRef(null)
  const menuButtonsRef = useRef([])

  //Handle close when clicked outside
  const handleClickOutside = useCallback(
    (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose()
      }
    },
    [onClose, dropdownRef]
  )
  //Handle close when ESC clicked
  const handleEsc = useCallback(
    (event) => {
      if (event.key === "Escape") {
        onClose()
      }
    },
    [onClose]
  )
  // Handle arrow key navigation between buttons
  const handleKeyDown = useCallback(
    (event) => {
      if (!isOpen) return

      const buttons = menuButtonsRef.current
      const currentIndex = buttons.indexOf(document.activeElement)

      if (event.key === "ArrowDown") {
        event.preventDefault()
        const nextIndex = (currentIndex + 1) % buttons.length
        buttons[nextIndex]?.focus()
      }

      if (event.key === "ArrowUp") {
        event.preventDefault()
        const prevIndex = (currentIndex - 1 + buttons.length) % buttons.length
        buttons[prevIndex]?.focus()
      }
    },
    [isOpen]
  )

  useEffect(() => {
    if (isOpen) {
      // Gather and store buttons inside the dropdown
      const buttons = Array.from(
        menuRef.current?.querySelectorAll("button") || []
      )
      menuButtonsRef.current = buttons

      // Focus the first button
      buttons[0]?.focus()

      // Add global listeners
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleEsc)
      document.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEsc)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, handleClickOutside, handleEsc, handleKeyDown])

  return (
    <ul
      ref={menuRef}
      role="menu"
      className={`${styles.menu}`}
      tabIndex={-1}
      id="options-dropdown-menu"
    >
      {children}
    </ul>
  )
}

export default OptionsDropdown
