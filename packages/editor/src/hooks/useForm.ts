import { ChangeEvent, useCallback } from "react";

import { useTree } from "@glare/tree";

export const useForm = () => {
  const componentId = useTree((state) => state.selectedId);
  const [updateProps] = useTree((state) => [state.updateProps]);

  const setValueFromEvent = ({
    target: { name, value },
  }: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setValue(name, value);
  };

  const setValue = useCallback(
    (name: string, value: any) => {
      updateProps({
        id: componentId,
        name,
        value,
      });
    },
    [componentId]
  );

  return { setValue, setValueFromEvent };
};
