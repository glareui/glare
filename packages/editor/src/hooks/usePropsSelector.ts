import { useInspectorUpdate } from "./../contexts/InspectorContext";
import { useEffect } from "react";

import { useTree, getDefaultFormProps } from "@glare/tree";

const usePropsSelector = (propsName: string) => {
  const { addActiveProps } = useInspectorUpdate();

  useEffect(() => {
    addActiveProps(propsName);
  }, [addActiveProps, propsName]);

  const selectedId = useTree((state) => state.selectedId);
  const component = useTree((state) => state.components[selectedId]);
  const propsValue = component.props[propsName];

  if (propsValue !== undefined) {
    return propsValue;
  }

  if (getDefaultFormProps(component.type)[propsName] !== undefined) {
    return getDefaultFormProps(component.type)[propsName];
  }

  return "";
};

export default usePropsSelector;
