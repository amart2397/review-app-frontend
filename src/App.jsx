import { ToastContainer } from "react-toastify"
import router from "./routes"
import { RouterProvider } from "react-router-dom"

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App
