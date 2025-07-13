import { create } from "zustand"
import { createUserSlice } from "../features/auth/userSlice"
import { devtools } from "zustand/middleware"

export const useAppStore = create(
  devtools((set) => ({
    ...createUserSlice(set),
  }))
)
