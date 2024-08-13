import { createContext, useContext, useState } from "react";

export const OptionPanelContext = createContext(undefined);

export function OptionPanelProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [isOpenOptionPanel, setIsOpenOptionPanel] = useState(false);
  const [targetId, setTargetId] = useState("");

  const switchOpenOptionPanel = (isOpen: boolean, targetId: string) => {
    setIsOpenOptionPanel(isOpen);
    setTargetId(targetId);
  };

  const values: any = { isOpenOptionPanel, targetId, switchOpenOptionPanel };
  return (
    <OptionPanelContext.Provider value={values}>
      {children}
    </OptionPanelContext.Provider>
  );
}
