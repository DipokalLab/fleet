import { Column } from "@/components/ui/common/Column";
import { SubTitle } from "@/components/ui/common/Text";
import { OptionPanelContext } from "@/context/OptionPanelContext";
import { useCursorStore } from "@/states/cursor";
import { useObjectsStore } from "@/states/objects";
import { usePageStore } from "@/states/page";
import { DESC_COLOR, SUBTITLE_COLOR } from "@/theme/color";
import { css } from "@emotion/react";
import { useContext } from "react";

export function Tree() {
  const { list } = useObjectsStore();

  return (
    <Column>
      <SubTitle>Objects</SubTitle>

      <Column>
        {list.map((item) => (
          <Element objectId={item.id}>{item.name || "Unnamed Object"}</Element>
        ))}
      </Column>
    </Column>
  );
}

interface TreeElementProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  objectId: string;
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

  return (
    <div
      onClick={handleClick}
      css={css({
        borderRadius: "0.6rem",
        backgroundColor: "#ffffff",
        border: `0.1rem solid #F0F0F4`,
        padding: "0.5rem 0.5rem",
        fontSize: "0.8rem",
        color: SUBTITLE_COLOR,
        cursor: "pointer",
      })}
    >
      {props.children}
    </div>
  );
}
