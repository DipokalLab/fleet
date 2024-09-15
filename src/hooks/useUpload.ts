import { useToast } from "deventds2";
import instance from "../api/axios";
import { useObject } from "./useObject";

export function useUpload() {
  const useObjectHooks = useObject();
  const toast = useToast();

  const uploadObject = () => {
    const input = document.createElement("input");
    input.type = "file";

    input.click();

    input.onchange = async function () {
      const file = input.files[0];
      if (file) {
        const blob = new Blob([file], { type: file.type });
        const blobUrl = URL.createObjectURL(blob);

        useObjectHooks.create(blobUrl);

        try {
          const formData = new FormData();

          formData.append("object", file);
          formData.append("title", "New Object");
          formData.append("description", "");

          const uploadFile = await instance.post("file", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          toast.message({
            text: uploadFile.data.msg,
          });
        } catch (error) {
          toast.message({
            text: "Fail to upload",
          });
        }
      } else {
        alert("No file selected!");
      }
    };
  };

  return { uploadObject };
}
