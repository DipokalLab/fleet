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

export function Physics() {
  const { list, updateObject } = useObjectsStore();
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

  return (
    <Column>
      <div
        css={css({
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.25rem 0rem",
        })}
      >
        <SubTitle>Physics</SubTitle>
        {target && (
          <div
            css={css({
              display: "flex",
              alignItems: "end",
            })}
          >
            <Toggle
              checked={target.enablePhysics}
              onClick={handleClickToggle}
            ></Toggle>
          </div>
        )}
      </div>
    </Column>
  );
}
