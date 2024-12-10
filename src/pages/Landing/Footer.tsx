import { css } from "@emotion/react";

const ItemStyle = css({
  cursor: "pointer",
});

export function Footer() {
  return (
    <footer
      css={css({
        backgroundColor: "#ffffff",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontSize: "14px",
        color: "#333",
        borderTop: "1px solid #e0e0e0",
      })}
    >
      <div
        css={css({
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          maxWidth: "1200px",
          width: "100%",
          gap: "20px",
          marginBottom: "20px",
        })}
      >
        <div css={css({ flex: "1", minWidth: "200px" })}>
          <h3 css={css({ fontSize: "16px", marginBottom: "10px" })}>
            Why Fleet?
          </h3>
          <ul
            css={css({
              listStyle: "none",
              padding: 0,
              margin: 0,
              lineHeight: "1.8",
            })}
          >
            <li css={ItemStyle}>Simple to use</li>

            <li css={ItemStyle}>Privacy focused</li>
            <li css={ItemStyle}>Open source</li>
          </ul>
        </div>
        <div css={css({ flex: "1", minWidth: "200px" })}>
          <h3 css={css({ fontSize: "16px", marginBottom: "10px" })}>
            Community
          </h3>
          <ul
            css={css({
              listStyle: "none",
              padding: 0,
              margin: 0,
              lineHeight: "1.8",
            })}
          >
            <li
              css={ItemStyle}
              onClick={() => (location.href = "https://github.com/cartesiancs")}
            >
              GitHub
            </li>
            <li
              css={ItemStyle}
              onClick={() =>
                (location.href =
                  "https://www.linkedin.com/company/cartesiancs/")
              }
            >
              LinkedIn
            </li>
          </ul>
        </div>

        <div css={css({ flex: "1", minWidth: "200px" })}>
          <h3 css={css({ fontSize: "16px", marginBottom: "10px" })}>Company</h3>
          <ul
            css={css({
              listStyle: "none",
              padding: 0,
              margin: 0,
              lineHeight: "1.8",
            })}
          >
            <li
              css={ItemStyle}
              onClick={() => (location.href = "https://cartesiancs.com/")}
            >
              @cartesiancs
            </li>
            <li css={ItemStyle}>About</li>
            <li css={ItemStyle}>Privacy</li>
            <li css={ItemStyle}>Data policy</li>
            <li css={ItemStyle}>Terms</li>
          </ul>
        </div>
      </div>
      <p css={css({ textAlign: "center", color: "#666" })}>
        © {new Date().getFullYear()} cartesiancs.
      </p>
    </footer>
  );
}
