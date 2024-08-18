import { useObjectsStore } from "../states/objects";

export function useObject() {
  const { list, createObject } = useObjectsStore();

  const create = (url: string) => {
    createObject({
      id: String(Math.random()),
      url: url,
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
    });
  };

  return { create };
}
