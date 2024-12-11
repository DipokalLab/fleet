import { css, Global, keyframes } from "@emotion/react";
import { Button, Collapse, CollapseItem, useColorMode } from "deventds2";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { Row } from "@/components/ui/common/Row";
import { useEffect } from "react";
import { Column } from "@/components/ui/common/Column";
import type { Properties } from "csstype";
import { ACTION_ICON_COLOR, BORDER_COLOR, SUBTITLE_COLOR } from "@/theme/color";
import {
  FileBox,
  FolderCode,
  Orbit,
  ScanEye,
  SquareChartGantt,
  Workflow,
} from "lucide-react";
import { Title } from "@/components/ui/common/Text";
import { Footer } from "@/components/landing/common/Footer";
import { Navbar } from "@/components/landing/common/Navbar";

const featIconStyle = css({
  width: "32px",
  height: "32px",
  marginTop: "0.5rem",
  fontSize: "1.25rem",
  color: "#2c5ddb",
});

const bannerAnimation = keyframes`
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(-200px * 10 - 10px * 10));
    }
`;

export function LandingPage() {
  const navigate = useNavigate();
  const { isLogin } = useAuth();
  const [colorMode, setColorMode] = useColorMode();

  useEffect(() => {
    setColorMode("light");
  }, []);

  return (
    <>
      <Navbar />
      <div
        css={css({
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          flexDirection: "column",
          touchAction: "auto",
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
          <HeadTitle>Powerful tool for space designer.</HeadTitle>

          <DescriptionCenter>
            3D Portfolio Platform for Designers and Makers. Expand the
            Dimensions of Your Dreams.
          </DescriptionCenter>

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

      <Section>
        <Column gap="1rem" justify="center">
          <SubTitle textAlign="center">Create Your Own Space</SubTitle>
          <Description textAlign="center">
            A 3D Spatial Design Platform for Designers
          </Description>
          <img
            src="/screenshot.png"
            alt="3D Design"
            style={{
              width: "100%",
              maxWidth: "680px",
              height: "auto",
              marginTop: "2rem",
              border: `1px solid #d9dade`,
              borderRadius: "1rem",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
        </Column>
      </Section>

      <Section>
        <Column gap="1rem" justify="center">
          <SubTitle textAlign="center">Features Overview</SubTitle>
          <Description textAlign="center">
            Discover the powerful features of our platform designed to enhance
            your 3D design experience.
          </Description>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "1rem",
              marginTop: "2rem",
            }}
          >
            <div
              style={{
                width: "300px",
                padding: "1rem",
                border: `1px solid #d9dade`,
                borderRadius: "1rem",
                textAlign: "center",
              }}
            >
              <FileBox css={featIconStyle} />
              <h3>Easy to add model</h3>
              <p css={css({ color: SUBTITLE_COLOR })}>
                Adding models has become easier. Quickly create prototypes and
                deploy them swiftly.
              </p>
            </div>
            <div
              style={{
                width: "300px",
                padding: "1rem",
                border: `1px solid #d9dade`,
                borderRadius: "1rem",
                textAlign: "center",
              }}
            >
              <Orbit css={featIconStyle} />
              <h3>Physics Engine</h3>
              <p css={css({ color: SUBTITLE_COLOR })}>
                Anyone can easily set up the physics engine with a simple
                toggle.
              </p>
            </div>
            <div
              style={{
                width: "300px",
                padding: "1rem",
                border: `1px solid #d9dade`,
                borderRadius: "1rem",
                textAlign: "center",
              }}
            >
              <SquareChartGantt css={featIconStyle} />
              <h3>Event Registration</h3>
              <p css={css({ color: SUBTITLE_COLOR })}>
                You can register events for each model. Through events, you can
                play audio or achieve remarkable things.
              </p>
            </div>
            <div
              style={{
                width: "300px",
                padding: "1rem",
                border: `1px solid #d9dade`,
                borderRadius: "1rem",
                textAlign: "center",
              }}
            >
              <Workflow css={featIconStyle} />
              <h3>Collaboration</h3>
              <p css={css({ color: SUBTITLE_COLOR })}>
                Enhance teamwork with seamless collaboration tools that allow
                multiple users to work on projects simultaneously.
              </p>
            </div>
            <div
              style={{
                width: "300px",
                padding: "1rem",
                border: `1px solid #d9dade`,
                borderRadius: "1rem",
                textAlign: "center",
              }}
            >
              <FolderCode css={featIconStyle} />
              <h3>Rapid Deployment</h3>
              <p css={css({ color: SUBTITLE_COLOR })}>
                Deploy your designs quickly and efficiently with our streamlined
                deployment process.
              </p>
            </div>
            <div
              style={{
                width: "300px",
                padding: "1rem",
                border: `1px solid #d9dade`,
                borderRadius: "1rem",
                textAlign: "center",
              }}
            >
              <ScanEye css={featIconStyle} />
              <h3>Preview</h3>
              <p css={css({ color: SUBTITLE_COLOR })}>
                Get a real-time preview of your designs to ensure everything
                looks perfect before finalizing.
              </p>
            </div>
          </div>
        </Column>
      </Section>

      <Section>
        <Column gap="1rem" justify="center">
          <SubTitle textAlign="center">User Reviews</SubTitle>
          <Description textAlign="center">
            See what our users are saying about our platform.
          </Description>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "1rem",
              marginTop: "2rem",
            }}
          >
            <div
              style={{
                width: "300px",
                padding: "1rem",
                border: `1px solid #d9dade`,
                borderRadius: "1rem",
                textAlign: "center",
              }}
            >
              <h3>@huh.hyeongjun</h3>
              <p css={css({ color: SUBTITLE_COLOR })}>
                "This platform has transformed the way I design. The 3D features
                are incredible!"
              </p>
            </div>
            <div
              style={{
                width: "300px",
                padding: "1rem",
                border: `1px solid #d9dade`,
                borderRadius: "1rem",
                textAlign: "center",
              }}
            >
              <h3>@anonymous</h3>
              <p css={css({ color: SUBTITLE_COLOR })}>
                "I love the collaboration tools. Working with my team has never
                been easier."
              </p>
            </div>
            <div
              style={{
                width: "300px",
                padding: "1rem",
                border: `1px solid #d9dade`,
                borderRadius: "1rem",
                textAlign: "center",
              }}
            >
              <h3>@anonymous</h3>
              <p css={css({ color: SUBTITLE_COLOR })}>
                "The rapid deployment feature is a game-changer. Highly
                recommend!"
              </p>
            </div>
          </div>
        </Column>
      </Section>

      <Section>
        <Column gap="1rem" justify="center">
          <SubTitle textAlign="center">Q&A</SubTitle>
          <Description textAlign="center">
            Find answers to the most frequently asked questions about our
            platform.
          </Description>
          <div
            css={css({
              margin: "0 auto",
              marginTop: "1rem",
            })}
          >
            <Collapse>
              <CollapseItem title={"Q. Who made this?"}>
                Created by Hyeongjun Huh, a software developer residing in S.
                Korea. I am currently 19 years old. If you are curious about the
                projects I have made, please visit my portfolio site at
                hhj.devent.kr
              </CollapseItem>

              <CollapseItem title={"Q. How much does it cost?"}>
                It's free for now, but the pricing policy can change at any
                time. We might open-source it and only charge for hosting costs.
                Nothing is decided yet, but one thing is certain: we want to
                create a product for developers.
              </CollapseItem>
            </Collapse>
          </div>
        </Column>
      </Section>

      <Footer />
    </>
  );
}

// const SubTitleFotterStyle = css({
//   fontSize: "0.9rem",
//   color: "#8f8f96",
//   cursor: "pointer",
// });

// function Footer() {
//   return (
//     <div
//       css={css({
//         backgroundColor: "#f1f2f4",
//         display: "flex",
//         padding: "1rem",
//         flexDirection: "column",
//         gap: "0.5rem",
//       })}
//     >
//       <Title>@ cartesiancs</Title>
//       <span
//         onClick={() => (location.href = "https://cartesiancs.com/")}
//         css={SubTitleFotterStyle}
//       >
//         company
//       </span>
//       <span
//         onClick={() =>
//           (location.href = "https://www.linkedin.com/company/cartesiancs/")
//         }
//         css={SubTitleFotterStyle}
//       >
//         linkedin
//       </span>
//       <span
//         onClick={() => (location.href = "https://github.com/cartesiancs")}
//         css={SubTitleFotterStyle}
//       >
//         github
//       </span>
//     </div>
//   );
// }

function BottomBox() {
  return (
    <div
      css={css({
        width: "100%",
        height: "100%",
        backgroundColor: "#000000",
        borderRadius: "0.5rem",
      })}
    ></div>
  );
}

function Center({ children }: { children?: React.ReactNode }) {
  return (
    <div
      css={css({
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
      })}
    >
      {children}
    </div>
  );
}

function Section({ children }: { children?: React.ReactNode }) {
  return (
    <div
      css={css({
        width: "100%",
        minHeight: "80vh",
        marginBottom: "2vh",
      })}
    >
      <div
        css={css({
          padding: "4rem 2rem",
          minHeight: "calc(80vh - 8rem)",
        })}
      >
        {children}
      </div>
    </div>
  );
}

function HeadTitle({ children }: { children?: React.ReactNode }) {
  return (
    <span
      css={css({
        fontSize: "3.75rem",
        fontWeight: "700",
        textAlign: "center",
      })}
    >
      {children}
    </span>
  );
}

function SubTitle({
  children,
  textAlign = "left",
}: {
  children?: React.ReactNode;
  textAlign?: Properties["textAlign"];
}) {
  return (
    <span
      css={css({
        fontSize: "2.175rem",
        fontWeight: "600",
        textAlign: textAlign,
      })}
    >
      {children}
    </span>
  );
}

function Description({
  children,
  textAlign = "left",
}: {
  children?: React.ReactNode;
  textAlign?: Properties["textAlign"];
}) {
  return (
    <span
      css={css({
        fontSize: "1.25rem",
        fontWeight: "300",
        color: "#5c5e63",
        textAlign: textAlign,
      })}
    >
      {children}
    </span>
  );
}

function DescriptionCenter({ children }: { children?: React.ReactNode }) {
  return (
    <span
      css={css({
        fontSize: "1.25rem",
        fontWeight: "300",
        color: "#5c5e63",
        textAlign: "center",
      })}
    >
      {children}
    </span>
  );
}
