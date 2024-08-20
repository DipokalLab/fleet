import { create } from "zustand";

export type CursorType =
  | "default"
  | "positionChange"
  | "rotationChange"
  | "scaleChange";

type Store = {
  type: CursorType;
  lockVector: {
    x: boolean;
    y: boolean;
    z: boolean;
  };
  changeType: (type: CursorType) => void;
};

export const useCursorStore = create<Store>()((set) => ({
  type: "default",
  lockVector: {
    x: true,
    y: true,
    z: true,
  },

  changeType: (type: CursorType) => set((state) => ({ type: type })),
}));
