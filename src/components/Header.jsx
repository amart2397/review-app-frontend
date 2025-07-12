import styles from "./Header.module.css"

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={`${styles.logo} flex-center surface`}>R8R Logo</div>
      <search className={`${styles.search} flex-center surface`}>search</search>
      <nav className={`${styles.nav} flex-center surface`}>Login</nav>
    </div>
  )
}

export default Header
