import { Link } from "react-router-dom"
import styles from "./Header.module.css"
import LogoutButton from "../features/auth/LogoutButton"
import { useAppStore } from "../stores/useAppStore"

const Header = () => {
  const user = useAppStore((state) => state.user)
  const authButton = !user ? (
    <Link to="/auth/login" className={`header-button flex-center surface`}>
      Login
    </Link>
  ) : (
    <LogoutButton />
  )

  return (
    <div className={styles.header}>
      <Link to="/">
        <div className={`${styles.logo} flex-center surface`}>R8R Logo</div>
      </Link>
      <search className={`${styles.search} flex-center surface`}>search</search>
      {authButton}
    </div>
  )
}

export default Header
