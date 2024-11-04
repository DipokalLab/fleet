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
import { Button, Toggle } from "deventds2";
import { Package, Plus } from "lucide-react";
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

export function Materials() {
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

  const handleClickAdd = () => {
    const targetIndex = list.findIndex((item) => {
      return item.id == targetId;
    });
    list[targetIndex]["materials"].push({
      type: "STANDARD",
      color: "#ffffff",
    });

    updateObject([...list]);
  };

  return (
    <Column>
      <SubTitle>Materials</SubTitle>
      <Column>
        {target && (
          <>
            {target.materials.map((item) => (
              <>
                <div>{item.type}</div>
              </>
            ))}
          </>
        )}
      </Column>

      <Button onClick={handleClickAdd} color="white">
        <Plus
          css={css({
            width: "14px",
            height: "14px",
          })}
        />
      </Button>
    </Column>
  );
}
