import React, { createContext, useContext, useEffect, useState } from "react";

import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { BORDER_COLOR, DESC_COLOR, SUBTITLE_COLOR } from "@/theme/color";

export const DropdownContext = createContext(undefined);

function Dropdown({
  children,
  title,
  actionComponent,
}: {
  children?: any;
  title?: string;
  actionComponent?: any;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const ClickBackground = styled.div({
    display: !isOpen ? "none" : "",
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    zIndex: "30000",
  });

  const RelativePosition = styled.div({
    position: "relative",
  });

  const DropdownBody = styled.div({
    display: isOpen ? "flex" : "none",
    flexDirection: "column",
    position: "absolute",
    width: "6rem",
    padding: "0.3rem",
    gap: "0.3rem",
    borderRadius: "0.8rem",
    border: `0.1rem solid ${BORDER_COLOR}`,
    fontFamily: "'Noto Sans KR', sans-serif",
    fontSize: "0.9rem",
    backgroundColor: "#ffffff",
    boxShadow: "0 7px 20px #93949e20",
  });

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const values: any = { closeDropdown };

  return (
    <>
      <ClickBackground onClick={handleClick} />
      <DropdownContext.Provider value={values}>
        <RelativePosition>
          <div onClick={handleClick}>{actionComponent}</div>
          <DropdownBody>{children}</DropdownBody>
        </RelativePosition>
      </DropdownContext.Provider>
    </>
  );
}

function DropdownItem({ children }: { children?: any }) {
  return (
    <div
      css={css({
        zIndex: "40000",
      })}
    >
      {children}
    </div>
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClicked?: any;
}

export function DropdownButton(props: ButtonProps) {
  const { closeDropdown } = useContext(DropdownContext);

  const handleClick = () => {
    try {
      props.onClicked();
    } catch (error) {}
    try {
      closeDropdown();
    } catch (error) {}
  };

  return (
    <button
      onClick={handleClick}
      css={css({
        borderRadius: "0.5rem",
        outline: "none",
        border: "none",
        backgroundColor: "#ffffff",
        padding: "0.25rem 0.5rem",
        fontSize: "0.75rem",
        transition: "0.2s",
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        cursor: "pointer",
        color: SUBTITLE_COLOR,
        zIndex: "40000",

        ":hover": {
          backgroundColor: "#ededf2",
          color: "#000000",
        },
      })}
      {...props}
    >
      {props.children}
    </button>
  );
}

export { Dropdown, DropdownItem };
