import { useState, useRef, useEffect } from "react"
import AuthAPI from "./api.js"
import styles from "./LoginForm.module.css"

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const userRef = useRef()

  //Set focus to email input on load
  useEffect(() => {
    userRef.current?.focus()
  }, [])

  useEffect(() => {
    setError(null)
  }, [email, password])

  const handleEmailInput = (e) => setEmail(e.target.value)
  const handlePasswordInput = (e) => setPassword(e.target.value)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await AuthAPI.login(email, password)
      onLoginSuccess()
    } catch (err) {
      setError(err?.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <p>Loading...</p>

  const errDisplay = error ? <p aria-live="assertive">{error}</p> : null

  const form = (
    <>
      {errDisplay}
      <form className={styles["login-form"]} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Login</h2>
        <div className={styles.email}>
          <label className={styles.label} htmlFor="email">
            Email:
          </label>
          <input
            className={styles.input}
            type="email"
            id="username"
            ref={userRef}
            value={email}
            onChange={handleEmailInput}
            autoComplete="off"
            required
          />
        </div>
        <div className={styles.password}>
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
        <button className={`${styles.button} std-button`}>LOGIN</button>
      </form>
    </>
  )

  return form
}

export default LoginForm
