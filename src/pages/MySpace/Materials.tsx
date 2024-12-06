import instance from "@/api/axios";
import { Column } from "@/components/ui/common/Column";
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
} from "@/components/ui/common/Dropdown";
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
import { useContext, useEffect, useRef, useState } from "react";

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
      value: "#ffffff",
    });

    updateObject([...list]);
  };

  const handleChangeColor = (e, index) => {
    console.log(e.target.value);

    const targetIndex = list.findIndex((item) => {
      return item.id == targetId;
    });

    list[targetIndex]["materials"][index] = {
      type: list[targetIndex]["materials"][index].type,
      value: e.target.value,
    };

    updateObject([...list]);
  };

  const handleClickDropdownChange = (index, type, value) => {
    const targetIndex = list.findIndex((item) => {
      return item.id == targetId;
    });

    list[targetIndex]["materials"][index] = {
      type: type,
      value: value,
    };

    updateObject([...list]);
  };

  return (
    <Column>
      <SubTitle>Materials</SubTitle>
      <Column gap="0.25rem">
        <Column gap="0.25rem">
          {target && (
            <>
              {target.materials.map((item, index) => (
                <>
                  <div
                    css={css({
                      borderRadius: "0.6rem",
                      backgroundColor: "#ffffff",
                      border: `0.1rem solid #F0F0F4`,
                      padding: "0.25rem 0.5rem",
                    })}
                  >
                    <span
                      css={css({
                        color: SUBTITLE_COLOR,
                        fontSize: "14px",
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "0.5rem",
                      })}
                    >
                      <Dropdown
                        title="test"
                        actionComponent={
                          <MaterialsTypeTitle>{item.type}</MaterialsTypeTitle>
                        }
                      >
                        <DropdownItem>
                          <DropdownButton
                            onClicked={() => {
                              handleClickDropdownChange(
                                index,
                                "STANDARD",
                                item.value
                              );
                            }}
                          >
                            STANDARD
                          </DropdownButton>
                          <DropdownButton
                            onClicked={() => {
                              handleClickDropdownChange(
                                index,
                                "DEPTH",
                                item.value
                              );
                            }}
                          >
                            DEPTH
                          </DropdownButton>
                          <DropdownButton
                            onClicked={() => {
                              handleClickDropdownChange(
                                index,
                                "NORMAL",
                                item.value
                              );
                            }}
                          >
                            NORMAL
                          </DropdownButton>
                        </DropdownItem>
                      </Dropdown>
                      <div>
                        {item.type == "STANDARD" && (
                          <>
                            <input
                              type="color"
                              id="head"
                              name="head"
                              value={`${item.value}`}
                              onChange={(e) => handleChangeColor(e, index)}
                            />
                            <label htmlFor="head">{item.value}</label>
                          </>
                        )}
                      </div>
                    </span>
                  </div>
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
    </Column>
  );
}

function MaterialsTypeTitle({ children }: { children?: React.ReactNode }) {
  return <span>{children}</span>;
}
