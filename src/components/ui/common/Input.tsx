import { css } from "@emotion/react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  prefix?: any;
}

export function Input(props: InputProps) {
  const height = "2.5rem";
  const FlexBody = css({
    display: "flex",
    flexDirection: "column",
    height: height,
    width: "100%",
  });

  const InputBody = css({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",

    height: height,
  });

  const InputStyle = css({
    borderRadius: props.prefix ? "0 0.6rem 0.6rem 0" : "0.6rem",
    borderLeft: props.prefix ? "none !important" : "",

    border: `0.1rem solid #F0F0F4`,
    backgroundColor: "#ffffff",
    transition: "0.3s",
    color: "#000000",
    fontSize: "0.85rem",
    outline: "none",
    width: "100%",
    padding: "0 0.25rem",

    height: height,
  });

  const Prefix = css({
    backgroundColor: "#ffffff",
    border: `0.1rem solid #F0F0F4`,
    borderRadius: "0.6rem 0 0 0.6rem",
    borderRight: "none",
    fontSize: "0.85rem",
    alignItems: "center",
    display: "flex",
    padding: "0 0.5rem",
    height: height,
  });

  return (
    <div css={FlexBody}>
      <div css={InputBody}>
        {props.prefix && <div css={Prefix}>{props.prefix}</div>}

        <input {...props} css={InputStyle} />
      </div>
    </div>
  );
}
