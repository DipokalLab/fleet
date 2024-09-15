import { css } from "@emotion/react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";

export function BackButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };
  return (
    <div
      onClick={handleClick}
      css={css({
        position: "fixed",
        display: "flex",
        top: "0.5rem",
        left: "0.5rem",
        width: "2.5rem",
        height: "2.5rem",
        borderRadius: "100px",
        transition: "0.2s",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",

        ":hover": {
          backgroundColor: "#ededf2",
          width: "4.5rem",
        },
      })}
    >
      <ChevronLeft />
    </div>
  );
}
