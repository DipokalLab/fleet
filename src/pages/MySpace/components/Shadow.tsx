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
  padding: "0rem 0rem",
});

const flexEndStyle = css({
  display: "flex",
  alignItems: "end",
});

export function Shadow() {
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

  const handleClickToggleCast = async () => {
    try {
      const targetIndex = list.findIndex((item) => {
        return item.id == targetId;
      });

      const updateSpaceFile = await instance.put("space/file/shadow", {
        id: targetId,
        cast: !list[targetIndex]["shadow"]["cast"],
        receive: list[targetIndex]["shadow"]["receive"],
      });

      list[targetIndex]["shadow"]["cast"] =
        !list[targetIndex]["shadow"]["cast"];

      updateObject([...list]);
    } catch (error) {}
  };

  const handleClickToggleReceive = async () => {
    try {
      const targetIndex = list.findIndex((item) => {
        return item.id == targetId;
      });

      const updateSpaceFile = await instance.put("space/file/shadow", {
        id: targetId,
        cast: list[targetIndex]["shadow"]["cast"],
        receive: !list[targetIndex]["shadow"]["receive"],
      });

      list[targetIndex]["shadow"]["receive"] =
        !list[targetIndex]["shadow"]["receive"];

      updateObject([...list]);
    } catch (error) {}
  };

  const handleClickDebugToggle = () => {
    switchIsPhysicsDebug(!isPhysicsDebug);
  };

  return (
    <Column>
      <SubTitle>Shadow</SubTitle>

      <div css={toggleRowStyle}>
        <SubTitle>cast</SubTitle>

        {target && (
          <div css={flexEndStyle}>
            <Toggle
              checked={target.shadow.cast}
              onClick={handleClickToggleCast}
            ></Toggle>
          </div>
        )}
      </div>
      <div css={toggleRowStyle}>
        <SubTitle>receive</SubTitle>
        {target && (
          <div css={flexEndStyle}>
            <Toggle
              checked={target.shadow.receive}
              onClick={handleClickToggleReceive}
            ></Toggle>
          </div>
        )}
      </div>
    </Column>
  );
}
