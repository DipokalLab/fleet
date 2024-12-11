import { css } from "@emotion/react";
import Markdown from "marked-react";

export function MarkdownContent({ content }: { content?: string }) {
  return (
    <div
      css={css({
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100%",
      })}
    >
      <div
        css={css({
          display: "flex",
          padding: "1rem",
          maxWidth: "530px",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100%",
          flexDirection: "column",
          paddingTop: "2rem",
          gap: "1rem",
        })}
      >
        <div
          css={css({
            paddingTop: "1rem",
            minHeight: "100%",
          })}
        >
          <Markdown>{content}</Markdown>
        </div>
      </div>
    </div>
  );
}
