import { Button } from "deventds2";
import { CursorType, useCursorStore } from "../../../states/cursor";
import { Row } from "../common/Row";
import { SubTitle } from "../common/Text";

export function CursorOptions() {
  const cursorStore = useCursorStore();

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
          D
        </Button>
        <Button
          size="sm"
          color={setButtonColor("positionChange")}
          onClick={() => handleClickButton("positionChange")}
        >
          P
        </Button>
        <Button
          size="sm"
          color={setButtonColor("rotationChange")}
          onClick={() => handleClickButton("rotationChange")}
        >
          R
        </Button>
        <Button
          size="sm"
          color={setButtonColor("scaleChange")}
          onClick={() => handleClickButton("scaleChange")}
        >
          S
        </Button>
      </Row>
    </>
  );
}
