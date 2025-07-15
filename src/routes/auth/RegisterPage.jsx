import { useLocation, useNavigate, useRevalidator } from "react-router-dom"
import RegisterForm from "../../features/auth/RegisterForm"

const RegisterPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { revalidate } = useRevalidator()

  const from = location.state?.from?.pathname || "/"
  const handleRegister = () => {
    revalidate()
    if (from === "/auth/login") {
      navigate("/", { replace: true })
    } else {
      navigate(from, { replace: true })
    }
  }

  return (
    <div className="page flex-top">
      <RegisterForm onRegisterSuccess={handleRegister} />
    </div>
  )
}

export default RegisterPage
