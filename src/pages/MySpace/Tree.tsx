import { Column } from "@/components/ui/common/Column";
import { SubTitle } from "@/components/ui/common/Text";
import { OptionPanelContext } from "@/context/OptionPanelContext";
import { useCursorStore } from "@/states/cursor";
import { useObjectsStore } from "@/states/objects";
import { usePageStore } from "@/states/page";
import { DESC_COLOR, SUBTITLE_COLOR } from "@/theme/color";
import { css } from "@emotion/react";
import { Package } from "lucide-react";
import { useContext } from "react";

interface TreeElementProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  objectId: string;
}

export function Tree() {
  const { list } = useObjectsStore();

  return (
    <Column>
      <SubTitle>Objects</SubTitle>

      <div
        css={css({
          display: "flex",
          overflow: "scroll",
          flexDirection: "column",
          gap: "0.25rem",
          height: "70vh",
        })}
      >
        {list.map((item) => (
          <Element objectId={item.id}>{item.name || "Unnamed Object"}</Element>
        ))}
      </div>
    </Column>
  );
}

function Element(props: TreeElementProps) {
  const { isPreview } = usePageStore();
  const cursorStore = useCursorStore();
  const { isOpenOptionPanel, switchOpenOptionPanel, targetId } =
    useContext(OptionPanelContext);

  const handleClick = () => {
    if (isPreview) {
      return false;
    }

    cursorStore.changeType("positionChange");
    switchOpenOptionPanel(true, props.objectId);
  };

  const boxStyle = css({
    borderRadius: "0.6rem",
    backgroundColor: "#ffffff",
    border:
      props.objectId == targetId
        ? "0.1rem solid #3b82f6"
        : `0.1rem solid #F0F0F4`,
    padding: "0.5rem 0.5rem",
    fontSize: "0.8rem",
    color: SUBTITLE_COLOR,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  });

  const iconStyle = css({
    width: "16px",
    height: "16px",
  });

  return (
    <div onClick={handleClick} css={boxStyle}>
      <Package css={iconStyle} />
      {props.children}
    </div>
  );
}
