import { css } from "@emotion/react";
import { Button } from "deventds2";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { Row } from "../components/ui/common/Row";

export function LandingPage() {
  const navigate = useNavigate();
  const { isLogin } = useAuth();
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
          Everyone has the right to have a glamorous and fabulous space. Now
          create a 3D portfolio to decorate your online space.
        </span>
        <div
          css={css({
            paddingTop: "1rem",
          })}
        >
          {isLogin() ? (
            <Row>
              <Button color="black" onClick={() => navigate("/app")}>
                Create Now
              </Button>
              <Button color="white" onClick={() => navigate("/profile")}>
                Profile
              </Button>
            </Row>
          ) : (
            <Button color="blue" onClick={() => navigate("/auth")}>
              Get Started
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
