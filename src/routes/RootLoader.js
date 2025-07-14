import AuthAPI from "../features/auth/api"

export const rootLoader = async () => {
  try {
    const userData = await AuthAPI.getCurrentUser()
    return userData
  } catch {
    return { csrfToken: null, user: null }
  }
}
