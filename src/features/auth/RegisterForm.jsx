import { useState, useRef, useEffect } from "react"
import AuthAPI from "./api.js"
import styles from "./AuthForm.module.css"

const RegisterForm = ({ onRegisterSuccess }) => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const userRef = useRef()

  //Set focus to email input on load
  useEffect(() => {
    userRef.current?.focus()
  }, [])

  //When user change email or password clear error message since they should've read it already
  useEffect(() => {
    setError(null)
  }, [email, password])

  const handleFirstNameInput = (e) => setFirstName(e.target.value)
  const handleLastNameInput = (e) => setLastName(e.target.value)
  const handleEmailInput = (e) => setEmail(e.target.value)
  const handlePasswordInput = (e) => setPassword(e.target.value)
  const handleConfirmPasswordInput = (e) => setConfirmPassword(e.target.value)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError("Passwords must match")
      setLoading(false)
    } else {
      try {
        await AuthAPI.register(firstName, lastName, email, password)
        onRegisterSuccess()
      } catch (err) {
        setError(err?.message)
      } finally {
        setLoading(false)
      }
    }
  }

  const getErrorPosition = (message) => {
    if (
      (message?.includes("Password") || message?.includes("password")) &&
      !message?.includes("match")
    )
      return "password"
    if (message?.includes("match")) return "confirmPassword"
    return "email"
  }

  const errDisplay = error
    ? {
        position: getErrorPosition(error),
        content: (
          <div
            id="error"
            role="alert"
            className={styles["error-popup"]}
            aria-live="assertive"
          >
            {error}
          </div>
        ),
      }
    : null

  if (loading) return <p>Loading...</p>

  const form = (
    <form className={styles["user-form"]} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Register</h2>
      <div className={styles.name}>
        <div className={styles["first-name"]}>
          {errDisplay?.position === "firstName" ? errDisplay?.content : null}
          <label className={styles.label} htmlFor="given-name">
            First Name:
          </label>
          <input
            className={styles.input}
            type="text"
            id="given-name"
            ref={userRef}
            value={firstName}
            onChange={handleFirstNameInput}
            autoComplete="name"
            required
          />
        </div>
        <div className={styles["last-name"]}>
          {errDisplay?.position === "LastName" ? errDisplay?.content : null}
          <label className={styles.label} htmlFor="family-name">
            Last Name:
          </label>
          <input
            className={styles.input}
            type="text"
            id="family-name"
            value={lastName}
            onChange={handleLastNameInput}
            autoComplete="name"
            required
          />
        </div>
      </div>
      <div className={styles.email}>
        {errDisplay?.position === "email" ? errDisplay?.content : null}
        <label className={styles.label} htmlFor="email">
          Email:
        </label>
        <input
          className={styles.input}
          type="email"
          id="email"
          value={email}
          onChange={handleEmailInput}
          autoComplete="off"
          required
        />
      </div>
      <div className={styles.password}>
        {errDisplay?.position === "password" ? errDisplay?.content : null}
        <label htmlFor="password" className={styles.label}>
          Password:
        </label>
        <input
          className={styles.input}
          type="password"
          id="password"
          onChange={handlePasswordInput}
          value={password}
          required
        />
      </div>
      <div className={styles["confirm-password"]}>
        {errDisplay?.position === "confirmPassword"
          ? errDisplay?.content
          : null}
        <label htmlFor="confirmPassword" className={styles.label}>
          Confirm Password:
        </label>
        <input
          className={styles.input}
          type="password"
          id="confirmPassword"
          onChange={handleConfirmPasswordInput}
          value={confirmPassword}
          required
        />
      </div>
      <button className={`${styles.button} std-button`}>REGISTER</button>
    </form>
  )

  return form
}

export default RegisterForm
