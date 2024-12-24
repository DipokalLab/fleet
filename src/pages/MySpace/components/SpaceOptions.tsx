import instance from "@/api/axios";
import { Column } from "@/components/ui/common/Column";
import { SubTitle } from "@/components/ui/common/Text";
import { OptionPanelContext } from "@/context/OptionPanelContext";
import { useCursorStore } from "@/states/cursor";
import { useObjectsStore } from "@/states/objects";
import { usePageStore } from "@/states/page";
import { useSpaceStore } from "@/states/space";
import { DESC_COLOR, SUBTITLE_COLOR } from "@/theme/color";
import { css } from "@emotion/react";
import { useToast } from "deventds2";
import { Box, Boxes, Package } from "lucide-react";
import { useContext } from "react";
import { useDebouncedCallback } from "use-debounce";

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

export function SpaceOptions() {
  const { changeBackgroundColor, options } = useSpaceStore();
  const toast = useToast();

  const debouncedBackgroundColor = useDebouncedCallback((value) => {
    setSpaceBackgroundColor(value);
  }, 1000);

  const setSpaceBackgroundColor = async (color: string) => {
    try {
      const spaceId = location.pathname.split("/")[2];
      const updateSpace = await instance.put(`space`, {
        id: spaceId,
        title: options.title,
        isPublic: options.isPublic,
        backgroundColor: color,
      });

      toast.message({
        text: "Successfully update",
      });
    } catch (error) {}
  };

  const handleChangeColor = (e) => {
    console.log(e.target.value);

    changeBackgroundColor(e.target.value.split("#")[1]);

    debouncedBackgroundColor(e.target.value.split("#")[1]);
  };

  return (
    <Column>
      <div css={toggleRowStyle}>
        <SubTitle>Background</SubTitle>
        <div css={flexEndStyle}>
          <input
            type="color"
            id="head"
            name="head"
            value={`#${options.backgroundColor}`}
            onChange={(e) => handleChangeColor(e)}
          />
        </div>
      </div>
    </Column>
  );
}
