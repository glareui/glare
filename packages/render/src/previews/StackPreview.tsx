import * as React from "react";
import { Stack, Box } from "@chakra-ui/react";
import { useInteractive } from "./../hooks/useInteractive";
import { useDropComponent } from "./../hooks/useDropComponent";
import ComponentPreview from "./../ComponentPreview";

const StackPreview: React.FC<{ component: IComponent }> = ({ component }) => {
  const { drop, isOver } = useDropComponent(component.id);
  const { props, ref } = useInteractive(component, true);

  const boxProps: any = {};

  if (isOver) {
    props.bg = "teal.50";
  }

  return (
    <Box {...boxProps} ref={drop(ref)}>
      <Stack {...props}>
        {component.children.map((key: string) => (
          <ComponentPreview key={key} componentName={key} />
        ))}
      </Stack>
    </Box>
  );
};

export default StackPreview;
