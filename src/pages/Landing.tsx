import { css } from "@emotion/react";
import { Button } from "deventds2";
import { useNavigate } from "react-router";

export function LandingPage() {
  const navigate = useNavigate();
  return (
    <div
      css={css({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        flexDirection: "column",
      })}
    >
      <div
        css={css({
          display: "flex",
          padding: "1rem",
          maxWidth: "530px",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          flexDirection: "column",
          gap: "1rem",
        })}
      >
        <span
          css={css({
            fontSize: "3.75rem",
            fontWeight: "700",
          })}
        >
          FLEET
        </span>

        <span
          css={css({
            fontSize: "1.25rem",
            fontWeight: "300",
            color: "#5c5e63",
            textAlign: "center",
          })}
        >
          Everyone, Everyone has the right to have a glamorous and fabulous
          space. Now create a 3D portfolio to decorate your online space.
        </span>
        <div
          css={css({
            paddingTop: "1rem",
          })}
        >
          <Button color="blue" onClick={() => navigate("/app")}>
            Create Now
          </Button>
        </div>
      </div>
    </div>
  );
}
