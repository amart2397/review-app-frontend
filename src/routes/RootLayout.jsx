import { Outlet, useLoaderData } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import styles from "./RootLayout.module.css"
import Header from "../components/Header"
import { useAppStore } from "../stores/useAppStore"
import { useEffect } from "react"

const RootLayout = () => {
  const { csrfToken, user } = useLoaderData()
  const setUserData = useAppStore((state) => state.setUserData)

  useEffect(() => {
    const currentUser = useAppStore.getState().user
    const currentToken = useAppStore.getState().csrfToken

    if (user !== currentUser || csrfToken !== currentToken) {
      setUserData({ user, csrfToken })
    }
  }, [user, csrfToken, setUserData])

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
