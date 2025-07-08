import { createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello World</div>,
    children: [],
  },
])

export default router
