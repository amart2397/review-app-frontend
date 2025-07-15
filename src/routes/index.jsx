import { createBrowserRouter } from "react-router-dom"
import RootLayout from "./RootLayout"
import AuthLayout from "./auth/AuthLayout"
import HomePage from "./home/HomePage"
import LoginPage from "./auth/LoginPage"
import RegisterPage from "./auth/RegisterPage"
import { rootLoader } from "./RootLoader"

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    loader: rootLoader,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "auth",
        Component: AuthLayout,
        children: [
          { path: "login", Component: LoginPage },
          { path: "register", Component: RegisterPage },
        ],
      },
    ],
  },
])

export default router
