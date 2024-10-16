import { create } from "zustand";

type Store = {
  isPreview: boolean;
  isPhysicsDebug: boolean;
  switchIsPreview: (preview: boolean) => void;
  switchIsPhysicsDebug: (isPhysicsDebug: boolean) => void;
};

export const usePageStore = create<Store>()((set) => ({
  isPreview: false,
  isPhysicsDebug: false,

  switchIsPreview: (preview) => set((state) => ({ isPreview: preview })),
  switchIsPhysicsDebug: (isPhysicsDebug) =>
    set((state) => ({ isPhysicsDebug: isPhysicsDebug })),
}));
