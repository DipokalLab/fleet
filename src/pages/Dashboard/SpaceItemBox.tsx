import { css, keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

interface BoxType
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  index?: number;
}

export function Box(props: BoxType) {
  const { children }: { children?: React.ReactNode } = props;

  return (
    <div
      {...props}
      css={css({
        display: "flex",
        width: "120px",
        height: "120px",
        borderRadius: "0.5rem",
        justifyContent: "center",
        alignItems: "center",
        border: `1px solid #ededf2`,
        transition: "0.2s",
        cursor: "pointer",
        animation: `${fadeIn} 0.4s ease-in-out`,
        animationDelay: `0.${props.index}s`,
        ":hover": {
          backgroundColor: "#ededf2",
        },
      })}
    >
      {children}
    </div>
  );
}
