class AuthAPI {
  constructor(baseUrl = "http://localhost:3000") {
    this.baseUrl = baseUrl
  }

  // @desc Login user with email and password
  // @route POST /auth/login
  // @access Public
  login = async (email, password) => {
    const res = await fetch(`${this.baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    })
    if (!res.ok) {
      const errData = await res.json().catch(() => null)
      throw new Error(errData?.message || "Login Failed")
    }
    return
  }

  // @desc Logout user
  // @route POST /auth/logout
  // @access Private
  logout = async (csrfToken) => {
    const res = await fetch(`${this.baseUrl}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-csrf-token": csrfToken,
      },
      credentials: "include",
    })
    if (!res.ok) {
      const errData = await res.json().catch(() => null)
      throw new Error(errData?.message || "Login Failed")
    }
    return
  }

  // @desc Register new user with email and password
  // @route POST /auth/register
  // @access Public
  register = async (firstName, lastName, email, password) => {
    const res = await fetch(`${this.baseUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
      credentials: "include",
    })
    if (!res.ok) {
      const errData = await res.json().catch(() => null)
      throw new Error(errData?.message || "Login Failed")
    }
    return
  }

  // @desc   Get current user info (after acquiring CSRF token)
  // @api    GET /api/auth/me
  // @csrf   Required (fetched and stored first)
  // @access Private (session cookie)
  getCurrentUser = async () => {
    // Step 1: Fetch the CSRF token
    const csrfRes = await fetch(`${this.baseUrl}/auth/csrf-token`, {
      credentials: "include",
    })

    if (!csrfRes.ok) throw new Error("Failed to fetch CSRF token")

    const { token: csrfToken } = await csrfRes.json()

    // Step 2: Fetch the user info, including CSRF token in headers
    const userRes = await fetch(`${this.baseUrl}/auth/me`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "x-csrf-token": csrfToken,
      },
    })

    if (!userRes.ok) throw new Error("Failed to fetch user")
    const user = await userRes.json()

    return { csrfToken, user }
  }
}

export default new AuthAPI()
