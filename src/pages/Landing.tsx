import { css } from "@emotion/react";
import { Button, useColorMode } from "deventds2";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { Row } from "../components/ui/common/Row";
import { useEffect } from "react";

export function LandingPage() {
  const navigate = useNavigate();
  const { isLogin } = useAuth();
  const [colorMode, setColorMode] = useColorMode();

  useEffect(() => {
    setColorMode("light");
  }, []);

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
          3D Portfolio Platform for Designers and Makers. Expand the Dimensions
          of Your Dreams.
        </span>
        <div
          css={css({
            paddingTop: "1rem",
          })}
        >
          {isLogin() ? (
            <Row>
              <Button color="black" onClick={() => navigate("/dashboard")}>
                Dashboard
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
