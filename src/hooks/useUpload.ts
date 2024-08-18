import { useObject } from "./useObject";

export function useUpload() {
  const useObjectHooks = useObject();

  const uploadObject = () => {
    const input = document.createElement("input");
    input.type = "file";

    input.click();

    input.onchange = function () {
      const file = input.files[0];
      if (file) {
        const blob = new Blob([file], { type: file.type });
        const blobUrl = URL.createObjectURL(blob);

        useObjectHooks.create(blobUrl);
      } else {
        alert("No file selected!");
      }
    };
  };

  return { uploadObject };
}
