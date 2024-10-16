import instance from "@/api/axios";
import { Column } from "@/components/ui/common/Column";
import { Row } from "@/components/ui/common/Row";
import { SubTitle } from "@/components/ui/common/Text";
import { OptionPanelContext } from "@/context/OptionPanelContext";
import { useCursorStore } from "@/states/cursor";
import { useObjectsStore } from "@/states/objects";
import { usePageStore } from "@/states/page";
import { DESC_COLOR, SUBTITLE_COLOR } from "@/theme/color";
import { css } from "@emotion/react";
import { Toggle } from "deventds2";
import { Package } from "lucide-react";
import { useContext, useState } from "react";

const toggleRowStyle = css({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0.25rem 0rem",
});

const flexEndStyle = css({
  display: "flex",
  alignItems: "end",
});

export function Physics() {
  const { list, updateObject } = useObjectsStore();
  const { isPhysicsDebug, switchIsPhysicsDebug } = usePageStore();
  const [isOpen, setIsOpen] = useState(false);
  const { targetId } = useContext(OptionPanelContext);

  const target =
    list[
      list.findIndex((item) => {
        return item.id == targetId;
      })
    ];

  const handleClickToggle = async () => {
    try {
      const targetIndex = list.findIndex((item) => {
        return item.id == targetId;
      });

      const updateSpaceFile = await instance.put("space/file/physics", {
        id: targetId,
        enablePhysics: !list[targetIndex]["enablePhysics"],
      });

      list[targetIndex]["enablePhysics"] = !list[targetIndex]["enablePhysics"];

      updateObject([...list]);
    } catch (error) {}
  };

  const handleClickDebugToggle = () => {
    switchIsPhysicsDebug(!isPhysicsDebug);
  };

  return (
    <Column>
      <div css={toggleRowStyle}>
        <SubTitle>Physics</SubTitle>
        {target && (
          <div css={flexEndStyle}>
            <Toggle
              checked={target.enablePhysics}
              onClick={handleClickToggle}
            ></Toggle>
          </div>
        )}
      </div>
      <div css={toggleRowStyle}>
        <SubTitle>Physics Debug</SubTitle>
        {target && (
          <div css={flexEndStyle}>
            <Toggle
              checked={isPhysicsDebug}
              onClick={handleClickDebugToggle}
            ></Toggle>
          </div>
        )}
      </div>
    </Column>
  );
}
