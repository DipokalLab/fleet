import { create } from "zustand";

export type ObjectMaterialsType = {
  type: "STANDARD" | "DEPTH" | "NORMAL";
  value: string;
};

type ObjectType = {
  id: string;
  url: string;
  isRemoved: boolean;
  enablePhysics: boolean;
  name: string;
  type: "MODEL" | "BOX" | "MESH";

  position: {
    x: number;
    y: number;
    z: number;
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

  shadow?: {
    cast: boolean;
    receive: boolean;
  };

  materials?: ObjectMaterialsType[];
};

type Store = {
  list: ObjectType[];
  createObject: (object: ObjectType) => void;
  updateObject: (objects: ObjectType[]) => void;
  deleteObject: (id: string) => void;
  clearObject: () => void;
};

const defaultObject: ObjectType = {
  id: String(Math.random()),
  url: "",
  isRemoved: false,
  enablePhysics: false,
  name: "",
  type: "MODEL",
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
  shadow: {
    cast: false,
    receive: false,
  },
  materials: [],
};

export const useObjectsStore = create<Store>()((set) => ({
  list: [],

  createObject: (object: ObjectType = defaultObject) =>
    set((state) => ({ list: [...state.list, object] })),

  updateObject: (objects: ObjectType[]) =>
    set((state) => ({ list: [...objects] })),

  clearObject: () => set((state) => ({ list: [] })),

  deleteObject: (id: string) =>
    set((state) => ({
      list: state.list.map((item) =>
        item.id === id ? { ...item, isRemoved: true } : item
      ),
    })),
}));
