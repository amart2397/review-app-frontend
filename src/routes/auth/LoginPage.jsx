import { useNavigate, useRevalidator } from "react-router-dom"
import LoginForm from "../../features/auth/LoginForm"
import styles from "./LoginPage.module.css"

const LoginPage = () => {
  const navigate = useNavigate()
  const { revalidate } = useRevalidator()
  const handleLogin = () => {
    revalidate()
    navigate("/")
  }
  return (
    <div className={`${styles.page} flex-center`}>
      <LoginForm onLoginSuccess={handleLogin} />
    </div>
  )
}

export default LoginPage
