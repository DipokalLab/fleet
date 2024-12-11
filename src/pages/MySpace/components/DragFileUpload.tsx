import { useUpload } from "@/hooks/useUpload";
import { css } from "@emotion/react";
import React, { useState, useRef, useEffect } from "react";

export function DragAndDropFileUpload() {
  const [file, setFile] = useState(null);
  const { uploadFile } = useUpload();

  useEffect(() => {
    const handleDragOver = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    const handleDrop = (event) => {
      event.preventDefault();
      event.stopPropagation();

      const files = event.dataTransfer.files;
      if (files && files.length > 0) {
        setFile(files[0]);
        uploadFile(files[0]);
      }
    };

    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("drop", handleDrop);

    return () => {
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("drop", handleDrop);
    };
  }, []);

  // 파일 정보 렌더링
  const renderFileInfo = () => {
    if (file) {
      return (
        <div
          css={css({
            position: "fixed",
            top: 0,
            left: 0,
            height: "100%",
            width: "100vw",
            backgroundColor: "#ffffff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            transition: ".5s",
            zIndex: 900,
          })}
        >
          <h4>파일 정보:</h4>
          <p>파일 이름: {file.name}</p>
          <p>파일 크기: {(file.size / 1024).toFixed(2)} KB</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ padding: "20px", display: "none" }}>
      <h3>Body에 파일 드래그 앤 드롭</h3>
      <p>파일을 전체 페이지 아무 곳에나 드롭할 수 있습니다.</p>
      {renderFileInfo()}
    </div>
  );
}
