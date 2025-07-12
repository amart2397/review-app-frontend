import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import styles from "./Root.module.css"
import Header from "../components/Header"

const RootLayout = () => {
  return (
    <div className={styles["root-container"]}>
      <Header />
      <div className={styles["content"]}>
        <Outlet />
      </div>
    </div>
  )
}

export default RootLayout
