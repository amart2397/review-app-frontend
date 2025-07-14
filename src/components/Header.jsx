import { Link } from "react-router-dom"
import styles from "./Header.module.css"
import LogoutButton from "../features/auth/LogoutButton"
import LoginButton from "../features/auth/LoginButton"
import { useAppStore } from "../stores/useAppStore"

const Header = () => {
  const user = useAppStore((state) => state.user)
  const authButton = !user ? <LoginButton /> : <LogoutButton />

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
