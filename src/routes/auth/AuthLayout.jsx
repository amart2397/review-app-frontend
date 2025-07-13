import { Outlet } from "react-router-dom"
import styles from "./AuthLayout.module.css"

const AuthLayout = () => {
  return (
    <div className={`${styles["root-container"]} flex-center`}>
      <Outlet />
    </div>
  )
}

export default AuthLayout
