import { ObjectMaterialsType, useObjectsStore } from "../states/objects";

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
  const { list, createObject, deleteObject } = useObjectsStore();

  const create = (
    url: string,
    id: string,
    options?: {
      enablePhysics?: boolean;
      type?: "MODEL" | "BOX" | "MESH";
      name?: string;
      px?: number;
      py?: number;
      pz?: number;
      sx?: number;
      sy?: number;
      sz?: number;
      rx?: number;
      ry?: number;
      rz?: number;
      shadowCast?: boolean;
      shadowReceive?: boolean;
      materials?: ObjectMaterialsType[];
    }
  ) => {
    const {
      name = "",
      enablePhysics = false,
      type = "MODEL",
      px = 0,
      py = 0,
      pz = 0,
      sx = 1,
      sy = 1,
      sz = 1,
      rx = 0,
      ry = 0,
      rz = 0,
      shadowCast = false,
      shadowReceive = false,
      materials = [],
    } = options;

    createObject({
      id: id,
      url: url,
      isRemoved: false,
      enablePhysics: enablePhysics,
      name: name,
      type: type,
      position: {
        x: px,
        y: py,
        z: pz,
      },
      scale: {
        x: sx,
        y: sy,
        z: sz,
      },
      rotation: {
        x: rx,
        y: ry,
        z: rz,
      },
      shadow: {
        cast: shadowCast,
        receive: shadowReceive,
      },
      materials: materials,
    });
  };

  const remove = (id: string) => {
    const index = list.findIndex((object) => {
      return object.id == id;
    });

    deleteObject(id);
  };

  return { create, remove };
}
