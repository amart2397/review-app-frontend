export const createSelectedMediaSlice = (set) => ({
  selectedMedia: null,
  setSelectedMedia: (media) => set({ selectedMedia: media }),
  clearSelectedMedia: () => set({ selectedMedia: null }),
})
