import React from "react";
import { Box } from "@chakra-ui/react";
import { useInteractive } from "./../hooks/useInteractive";
import { useDropComponent } from "./../hooks/useDropComponent";
import ComponentPreview from "./../ComponentPreview";

const AspectRatioBoxPreview: React.FC<{ component: IComponent }> = ({
  component,
}) => {
  const { props, ref } = useInteractive(component, true);
  const { drop, isOver } = useDropComponent(
    component.id,
    undefined,
    component.children.length === 0
  );
  const children = component.children;

  const boxProps: any = {};

  if (isOver) {
    props.bg = "teal.50";
  }

  return (
    <Box {...boxProps} ref={drop(ref)}>
      <Boxs {...props}>
        {!children.length ? (
          /*
           * We need at least one children because of the implementation
           * of AspectRatioBox
           */
          <Box />
        ) : (
          <Box>
            <ComponentPreview componentName={children[0]} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AspectRatioBoxPreview;
