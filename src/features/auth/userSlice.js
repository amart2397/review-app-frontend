export const createUserSlice = (set) => ({
  user: null,
  csrfToken: null,

  setUser: (user) => set({ user }),
  setCsrfToken: (token) => set({ csrfToken: token }),
  setUserData: ({ user, csrfToken }) => set({ user, csrfToken }),

  clearUser: () => set({ user: null, csrfToken: null }),
})
