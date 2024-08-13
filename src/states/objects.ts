import { create } from "zustand";

type ObjectType = {
  id: string;
  position?: {
    x?: number;
    y?: number;
    z?: number;
  };
  scale?: {
    x: number;
    y: number;
    z: number;
  };

  rotation?: {
    x: number;
    y: number;
    z: number;
  };
};

type Store = {
  list: ObjectType[];
  createObject: (object: ObjectType) => void;
};

const defaultObject: ObjectType = {
  id: String(Math.random()),
  position: {
    x: 0,
    y: 0,
    z: 0,
  },
  scale: {
    x: 1,
    y: 1,
    z: 1,
  },
  rotation: {
    x: 0,
    y: 0,
    z: 0,
  },
};

export const useObjectsStore = create<Store>()((set) => ({
  list: [defaultObject],

  createObject: (object: ObjectType = defaultObject) =>
    set((state) => ({ list: [...state.list, object] })),
}));
