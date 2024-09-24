import instance from "@/api/axios";
import { Column } from "@/components/ui/common/Column";
import { Input } from "@/components/ui/common/Input";
import { InputGroup } from "@/components/ui/common/InputGroup";
import { Row } from "@/components/ui/common/Row";
import { Title, Description } from "@/components/ui/common/Text";
import { OptionPanelContext } from "@/context/OptionPanelContext";
import { css } from "@emotion/react";
import { Button, Combobox, useToast } from "deventds2";
import { Plus } from "lucide-react";
import { useContext, useState } from "react";

export function EventModalContent({
  triggerId,
  onSended,
}: {
  triggerId: string;
  onSended?: () => void;
}) {
  const toast = useToast();

  const [value, setValue] = useState("");
  const [key, setKey] = useState("");

  const { targetId } = useContext(OptionPanelContext);

  const clearInputs = () => {
    setValue("");
    setKey("");
  };

  const handleChangeKey = (e) => {
    setKey(e.target.value.toUpperCase());
  };

  const handleChangeValue = (e) => {
    setValue(e.target.value);
  };

  const handleClickSend = async () => {
    try {
      const createEvent = await instance.post("event", {
        triggerId: triggerId,
        key: key,
        value: value,
      });

      onSended();
      clearInputs();
      toast.message({
        text: "Created!",
      });
    } catch (error) {}
  };

  return (
    <Column gap="1rem">
      <Column gap="0.5rem">
        <Title>Add Event</Title>
        <Description>KEY: "PLAY_SOUND" "MOVE_URL" "SHOW_DETAIL"</Description>

        <InputGroup>
          <Input
            placeholder="KEY"
            value={key}
            onInput={handleChangeKey}
            width={"100%"}
          />
          <Input
            placeholder="VALUE"
            value={value}
            onInput={handleChangeValue}
            width={"100%"}
          />
        </InputGroup>
        <Button color="white" size="sm" onClick={handleClickSend}>
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
