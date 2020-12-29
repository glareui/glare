import * as React from "react";

import {
  Box,
  Accordion,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";

import { useInteractive } from "./../hooks/useInteractive";
import { useDropComponent } from "./../hooks/useDropComponent";
import ComponentPreview from "./../ComponentPreview";
import { AccordionWhitelist } from "./../utils/editor";

const acceptedTypes: ComponentType[] = ["AccordionItem"];

const AccordionPreview: React.FC<IPreviewProps> = ({ component }) => {
  const { props, ref } = useInteractive(component, true);
  const { drop, isOver } = useDropComponent(component.id, acceptedTypes);

  const boxProps: any = {};

  if (isOver) {
    props.bg = "teal.50";
  }

  return (
    <Box ref={drop(ref)} {...boxProps}>
      <Accordion {...props}>
        {component.children.map((key: string) => (
          <ComponentPreview key={key} componentName={key} />
        ))}
      </Accordion>
    </Box>
  );
};

export const AccordionHeaderPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component, true);
  const { drop, isOver } = useDropComponent(component.id, AccordionWhitelist);

  if (isOver) {
    props.bg = "blue.50";
  }

  return (
    <Box ref={drop(ref)} {...props}>
      {component.children.map((key: string) => (
        <ComponentPreview key={key} componentName={key} />
      ))}
    </Box>
  );
};

export const AccordionItemPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component, true);
  const { drop, isOver } = useDropComponent(component.id, AccordionWhitelist);

  const boxProps: any = {};

  if (isOver) {
    props.bg = "teal.50";
  }

  return (
    <Box ref={drop(ref)} {...boxProps}>
      <AccordionItem {...props}>
        {component.children.map((key: string) => (
          <ComponentPreview key={key} componentName={key} />
        ))}
      </AccordionItem>
    </Box>
  );
};

export const AccordionPanelPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component, true);
  const { drop, isOver } = useDropComponent(component.id, AccordionWhitelist);

  const boxProps: any = {};

  if (isOver) {
    props.bg = "teal.50";
  }

  return (
    <Box ref={drop(ref)} {...boxProps}>
      <AccordionPanel {...props}>
        {component.children.map((key: string) => (
          <ComponentPreview key={key} componentName={key} />
        ))}
      </AccordionPanel>
    </Box>
  );
};

export default AccordionPreview;
