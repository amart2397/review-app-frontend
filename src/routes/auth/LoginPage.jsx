import { useLocation, useNavigate, useRevalidator } from "react-router-dom"
import LoginForm from "../../features/auth/LoginForm"
import styles from "./LoginPage.module.css"

const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { revalidate } = useRevalidator()

  const from = location.state?.from?.pathname || "/"

  const handleLogin = () => {
    revalidate()
    navigate(from, { replace: true })
  }
  return (
    <div className={`${styles.page} page flex-center`}>
      <LoginForm onLoginSuccess={handleLogin} />
    </div>
  )
}

export default LoginPage
