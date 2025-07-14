import { useNavigate } from "react-router-dom"
import { useAppStore } from "../../stores/useAppStore"
import AuthAPI from "./api"
import { toast } from "react-toastify"

const LogoutButton = () => {
  const csrfToken = useAppStore((state) => state.csrfToken)
  const navigate = useNavigate()
  const clearUser = useAppStore((state) => state.clearUser)

  const handleLogout = async () => {
    try {
      await AuthAPI.logout(csrfToken)
      clearUser()
      navigate("/")
    } catch {
      toast.error("Logout failed. Pelase try again.")
    }
  }

  return (
    <button
      className={`header-button flex-center surface`}
      onClick={handleLogout}
    >
      Logout
    </button>
  )
}

export default LogoutButton
