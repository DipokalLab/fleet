import instance from "@/api/axios";
import { Column } from "@/components/ui/common/Column";
import { SubTitle } from "@/components/ui/common/Text";
import { OptionPanelContext } from "@/context/OptionPanelContext";
import { useObject } from "@/hooks/useObject";
import { useCursorStore } from "@/states/cursor";
import { useObjectsStore } from "@/states/objects";
import { usePageStore } from "@/states/page";
import { DESC_COLOR, SUBTITLE_COLOR } from "@/theme/color";
import { css } from "@emotion/react";
import axios from "axios";
import { Button, useToast } from "deventds2";
import { Asterisk, Box, Boxes, Circle, Package } from "lucide-react";
import { useContext } from "react";

interface TreeElementProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  objectId: string;
  objectType?: string;
}

export function Mesh() {
  const { list } = useObjectsStore();
  const useObjectHooks = useObject();
  const toast = useToast();

  const modelUrlToBlob = async (url: string) => {
    const response = await axios.get(url, { responseType: "blob" });
    const blob = new Blob([response.data]);

    return blob;
  };

  const sendMesh = async (blob, realUrl) => {
    const url = window.URL.createObjectURL(blob);

    try {
      const formData = new FormData();

      formData.append("object", blob, "box3d.glb");
      formData.append("title", "New Object");
      formData.append("description", "");
      formData.append("spaceId", location.pathname.split("/")[2]);

      const requestUploadFile = await instance.post(
        "space/file/mesh",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      useObjectHooks.create(realUrl, requestUploadFile.data.spaceFile.id, {
        name: "",
        type: "MESH",
        enablePhysics: false,
        shadowCast: false,
        shadowReceive: false,
        px: 0,
        py: 0,
        pz: 0,
        sx: 1,
        sy: 1,
        sz: 1,
        rx: 0,
        ry: 0,
        rz: 0,
        materials: [],
      });

      toast.message({
        text: "Created!",
      });
    } catch (error) {}
  };

  const createBox = async () => {
    const getBlob = await modelUrlToBlob("/model/box.glb");
    await sendMesh(getBlob, "/model/box.glb");
  };

  const createSphere = async () => {
    const getBlob = await modelUrlToBlob("/model/uvsphere.glb");
    await sendMesh(getBlob, "/model/uvsphere.glb");
  };

  const createCylinder = async () => {
    const getBlob = await modelUrlToBlob("/model/cylinder.glb");
    await sendMesh(getBlob, "/model/cylinder.glb");
  };

  const handleClickCreateBox3d = () => {
    createBox();
  };

  const handleClickCreateUVSphere = () => {
    createSphere();
  };

  const handleClickCreateCylinder = () => {
    createCylinder();
  };

  return (
    <Column>
      <SubTitle>Mesh</SubTitle>
      <Column gap="0.5rem">
        <Button onClick={handleClickCreateBox3d} color="white">
          <Box css={IconStyle} />
          Box3d
        </Button>
        <Button onClick={handleClickCreateUVSphere} color="white">
          <Circle css={IconStyle} />
          UVSphere
        </Button>
        <Button onClick={handleClickCreateCylinder} color="white">
          <Asterisk css={IconStyle} />
          Cylinder
        </Button>
      </Column>
    </Column>
  );
}

const IconStyle = css({
  width: "0.9rem",
  height: "0.9rem",
});
