import { create } from "zustand";

type Store = {
  isPreview: boolean;
  switchIsPreview: (preview: boolean) => void;
};

export const usePageStore = create<Store>()((set) => ({
  isPreview: false,

  switchIsPreview: (preview) => set((state) => ({ isPreview: preview })),
}));
