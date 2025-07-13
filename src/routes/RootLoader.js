import AuthAPI from "../features/auth/api"

export const rootLoader = async () => {
  try {
    const userData = await AuthAPI.getCurrentUser()
    const { csrfToken, ...user } = userData
    return { csrfToken, user }
  } catch {
    return { csrfToken: null, user: null }
  }
}
