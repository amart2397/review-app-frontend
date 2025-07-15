import { Link } from "react-router-dom"
import styles from "./Header.module.css"
import LogoutButton from "../features/auth/LogoutButton"
import LoginButton from "../features/auth/LoginButton"
import { useAppStore } from "../stores/useAppStore"
import RegisterButton from "../features/auth/RegisterButton"

const Header = () => {
  const user = useAppStore((state) => state.user)
  const authButton = !user ? (
    <div className={styles.buttons}>
      <LoginButton /> <RegisterButton />
    </div>
  ) : (
    <div className={styles.buttons}>
      <LogoutButton />
    </div>
  )

  return (
    <div className={`${styles.header} flex-center`}>
      <div className={styles["header-content"]}>
        <Link to="/">
          <div className={`${styles.logo} flex-center surface`}>R8R Logo</div>
        </Link>
        <search className={`${styles.search} flex-center surface`}>
          search
        </search>
        {authButton}
      </div>
    </div>
  )
}

export default Header
