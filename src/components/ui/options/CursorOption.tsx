import { Button } from "deventds2";
import { CursorType, useCursorStore } from "../../../states/cursor";
import { Row } from "../common/Row";
import { SubTitle } from "../common/Text";
import { MousePointer2, Move, Rotate3D, Scaling } from "lucide-react";
import { css } from "@emotion/react";

export function CursorOptions() {
  const cursorStore = useCursorStore();
  const IconSize = "0.95rem";

  const setButtonColor = (type: string): "light" | "black" => {
    if (cursorStore.type == type) {
      return "black";
    }
    return "light";
  };

  const handleClickButton = (type: CursorType) => {
    cursorStore.changeType(type);
  };

  return (
    <>
      <Row>
        <Button
          size="sm"
          color={setButtonColor("default")}
          onClick={() => handleClickButton("default")}
        >
          <MousePointer2
            css={css({
              width: IconSize,
              height: IconSize,
            })}
          />
        </Button>
        <Button
          size="sm"
          color={setButtonColor("positionChange")}
          onClick={() => handleClickButton("positionChange")}
        >
          <Move
            css={css({
              width: IconSize,
              height: IconSize,
            })}
          />
        </Button>
        <Button
          size="sm"
          color={setButtonColor("rotationChange")}
          onClick={() => handleClickButton("rotationChange")}
        >
          <Rotate3D
            css={css({
              width: IconSize,
              height: IconSize,
            })}
          />
        </Button>
        <Button
          size="sm"
          color={setButtonColor("scaleChange")}
          onClick={() => handleClickButton("scaleChange")}
        >
          <Scaling
            css={css({
              width: IconSize,
              height: IconSize,
            })}
          />
        </Button>
      </Row>
    </>
  );
}
