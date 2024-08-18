import { useObjectsStore } from "../states/objects";

const INIT_OBJECT_VALUE = {
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

export function useObject() {
  const { list, createObject, updateObject } = useObjectsStore();

  const create = (url: string) => {
    const copyObject = JSON.parse(JSON.stringify(INIT_OBJECT_VALUE));
    createObject({
      id: String(Math.random()),
      url: url,
      ...copyObject,
    });
  };

  const remove = (id: string) => {
    const index = list.findIndex((object) => {
      return object.id == id;
    });

    list.splice(index, 1);

    updateObject([...list]);
  };

  return { create, remove };
}
