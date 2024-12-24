import { create } from "zustand";

type OptionsType = {
  backgroundColor: string;
  title: string;
  isPublic: string;
};

type Store = {
  options: OptionsType;
  changeBackgroundColor: (color: string) => void;
  setOptions: (options: OptionsType) => void;
};

export const useSpaceStore = create<Store>()((set) => ({
  options: {
    backgroundColor: "ffffff",
    title: "",
    isPublic: "false",
  },
  changeBackgroundColor: (color) =>
    set((state) => ({
      options: { ...state.options, ["backgroundColor"]: color },
    })),
  setOptions: (options) => set((state) => ({ options: { ...options } })),
}));
