import * as React from "react";
import { InputLeftElement } from "@chakra-ui/react";

import { useInteractive } from "./../hooks/useInteractive";
import { useDropComponent } from "./../hooks/useDropComponent";
import ComponentPreview from "./../ComponentPreview";

export const InputLeftElementPreview: React.FC<{ component: IComponent }> = ({
  component,
}) => {
  const { drop, isOver } = useDropComponent(component.id);
  const { props, ref } = useInteractive(component, true);

  if (isOver) {
    props.bg = "teal.50";
  }

  return (
    <InputLeftElement top="10px" right="10px" {...props} ref={drop(ref)}>
      {component.children.map((key: string) => (
        <ComponentPreview componentName={key} />
      ))}
    </InputLeftElement>
  );
};
