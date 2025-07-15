import { Link, useLocation } from "react-router-dom"

const RegisterButton = () => {
  const location = useLocation()

  return (
    <Link
      to="/auth/register"
      state={{ from: location }}
      className={`header-button flex-center surface`}
    >
      Register
    </Link>
  )
}

export default RegisterButton
