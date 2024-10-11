import { useToast } from "deventds2";
import instance from "../api/axios";
import { useObject } from "./useObject";
import { TopProgressContext } from "../context/TopProgress";
import { useContext } from "react";

export function useUpload() {
  const useObjectHooks = useObject();
  const toast = useToast();
  const { updateProgress } = useContext(TopProgressContext);

  const uploadFile = async (file) => {
    if (file) {
      const blob = new Blob([file], { type: file.type });
      const blobUrl = URL.createObjectURL(blob);

      const maxFileSize = 15 * 1024 * 1024;

      if (file && file.size > maxFileSize) {
        toast.message({
          text: "File size exceeded. The maximum allowed size is 15MB.",
        });

        return false;
      }

      const fileExtension = file.name.split(".").pop().toLowerCase();

      if (fileExtension != "glb") {
        toast.message({
          text: "Wrong File Type.",
        });

        return false;
      }

      try {
        const formData = new FormData();

        formData.append("object", file);
        formData.append("title", "New Object");
        formData.append("description", "");

        const requestUploadFile = await instance.post("file", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.lengthComputable) {
              const percentComplete =
                (progressEvent.loaded / progressEvent.total) * 100;
              updateProgress(Math.round(percentComplete));
              console.log(percentComplete);
            }
          },
        });

        const saveSpace = await instance.post("space/file", {
          spaceId: location.pathname.split("/")[2],
          fileId: requestUploadFile.data.fileId,
        });

        useObjectHooks.create(blobUrl, saveSpace.data.spaceFile.id, {
          px: 0,
          py: 0,
          pz: 0,
          sx: 1,
          sy: 1,
          sz: 1,
          rx: 0,
          ry: 0,
          rz: 0,
        });

        toast.message({
          text: requestUploadFile.data.msg,
        });
      } catch (error) {
        toast.message({
          text: "Fail to upload",
        });
      }
    } else {
      toast.message({
        text: "No file selected!",
      });
    }
  };

  const uploadObject = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".glb,.gltf";

    input.click();

    input.onchange = async function () {
      updateProgress(0);
      const file = input.files[0];
      uploadFile(file);
    };
  };

  return { uploadObject, uploadFile };
}
