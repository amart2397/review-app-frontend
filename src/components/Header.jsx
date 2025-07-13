import { Link } from "react-router-dom"
import styles from "./Header.module.css"

const Header = () => {
  return (
    <div className={styles.header}>
      <Link to="/">
        <div className={`${styles.logo} flex-center surface`}>R8R Logo</div>
      </Link>
      <search className={`${styles.search} flex-center surface`}>search</search>
      <Link to="/auth/login">
        <nav className={`${styles.nav} flex-center surface`}>Login</nav>
      </Link>
    </div>
  )
}

export default Header
