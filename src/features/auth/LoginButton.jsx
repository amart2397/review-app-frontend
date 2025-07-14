import { Link, useLocation } from "react-router-dom"

const LoginButton = () => {
  const location = useLocation()

  return (
    <Link
      to="/auth/login"
      state={{ from: location }}
      className={`header-button flex-center surface`}
    >
      Login
    </Link>
  )
}

export default LoginButton
