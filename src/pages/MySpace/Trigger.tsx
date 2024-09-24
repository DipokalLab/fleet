import instance from "@/api/axios";
import { Column } from "@/components/ui/common/Column";
import { Input } from "@/components/ui/common/Input";
import { Row } from "@/components/ui/common/Row";
import { Title, Description } from "@/components/ui/common/Text";
import { OptionPanelContext } from "@/context/OptionPanelContext";
import { BORDER_COLOR } from "@/theme/color";
import { css } from "@emotion/react";
import { Button, Modal } from "deventds2";
import { Ellipsis, Pencil, Plus } from "lucide-react";
import { useContext, useEffect, useState } from "react";

export function Trigger({
  list,
  onClickTrigger,
  onClickTriggerEdit,
}: {
  list: any;
  onClickTrigger?: () => void;
  onClickTriggerEdit?: (id: string) => void;
}) {
  const [triggers, setTriggers] = useState([""]);

  const handleClickAdd = () => {
    try {
      // 새로운 트리거 생성 모달 띄우기
      onClickTrigger();
    } catch (error) {}
  };

  const handleClickEdit = (id: string) => {
    try {
      // 기존 트리거 수정 모달 띄우기
      onClickTriggerEdit(id);
    } catch (error) {}
  };

  return (
    <>
      <Column>
        <div
          css={css({
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            marginBottom: "0.5rem",
          })}
        >
          {list.map((trigger) => (
            <Column>
              <Row>
                <Input
                  prefix={<b>WHEN</b>}
                  name="scale_x"
                  placeholder="1"
                  value={trigger.when}
                  disabled
                />
                <Button
                  onClick={() => handleClickEdit(trigger.id)}
                  color="white"
                  size="sm"
                >
                  <Ellipsis
                    css={css({
                      width: "14px",
                      height: "14px",
                    })}
                  />
                </Button>
              </Row>
              {trigger.event.length > 0 && (
                <>
                  {trigger.event.map((event) => (
                    <EventBody>
                      <Row>
                        <span
                          css={css({
                            fontSize: "0.85rem",
                          })}
                        >
                          {event.key}
                        </span>
                        <span
                          css={css({
                            fontSize: "0.75rem",
                          })}
                        >
                          {event.value}
                        </span>
                      </Row>
                    </EventBody>
                  ))}
                </>
              )}
            </Column>
          ))}
        </div>

        <Button onClick={handleClickAdd} color="white">
          <Plus
            css={css({
              width: "14px",
              height: "14px",
            })}
          />
        </Button>
      </Column>
    </>
  );
}

export function TriggerModalContent({ onSended }: { onSended?: () => void }) {
  const [value, setValue] = useState("");
  const { targetId } = useContext(OptionPanelContext);

  const handleChange = (e) => {
    setValue(e.target.value.toUpperCase());
  };

  const handleClickSend = async () => {
    try {
      const createTrigger = await instance.post("trigger", {
        spaceFileId: targetId,
        when: value,
      });

      onSended();
    } catch (error) {}
  };

  return (
    <Column gap="1rem">
      <Column gap="0.5rem">
        <Title>Add Trigger</Title>
        <Description>
          Only "CLICK", "HOVER", and "DBCLICK" are available.
        </Description>

        <Row justify="center">
          <Input
            prefix={<b css={css({ whiteSpace: "nowrap" })}>WHEN</b>}
            name="scale_x"
            placeholder="CLICK"
            value={value}
            onInput={handleChange}
            width={"100%"}
          />
          <Button color="white" size="sm" onClick={handleClickSend}>
            <Plus
              css={css({
                width: "14px",
                height: "14px",
              })}
            />
          </Button>
        </Row>
      </Column>
    </Column>
  );
}

function EventBody({ children }: { children?: React.ReactNode }) {
  return (
    <div
      css={css({
        marginLeft: "1rem",
        borderRadius: "0.6rem",
        backgroundColor: "#ffffff",
        border: `0.1rem solid #F0F0F4`,
        width: "calc(100% - 2rem)",
        padding: "0.5rem 0.5rem",
      })}
    >
      {children}
    </div>
  );
}
