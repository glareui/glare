import React, { memo } from "react";

import AlertPreview from "./previews/AlertPreview";
import AvatarPreview, {
  AvatarBadgePreview,
  AvatarGroupPreview,
} from "./previews/AvatarPreview";
import AccordionPreview, {
  AccordionHeaderPreview,
  AccordionItemPreview,
  AccordionPanelPreview,
} from "./previews/AccordionPreview";

import * as Chakra from "@chakra-ui/react";
import { InputRightElementPreview } from "./previews/InputRightElement";
import { InputLeftElementPreview } from "./previews/InputLeftElement";
// import AspectRatioBoxPreview from "./previews/AspectRatioBoxPreview";
import PreviewContainer from "./PreviewContainer";
import WithChildrenPreviewContainer from "./WithChildrenPreviewContainer";

import { useTree } from "@glare/tree";

const ComponentPreview: React.FC<{
  componentName: string;
}> = ({ componentName, ...forwardedProps }) => {
  const component = useTree((state) => state.components[componentName]);

  if (!component) {
    console.error(
      `ComponentPreview unavailable for component ${componentName}`
    );
  }

  const type = (component && component.type) || null;

  switch (type) {
    // Simple components
    case "Badge":
    case "Button":
    case "IconButton":
    case "Image":
    case "Text":
    case "Link":
    case "Spinner":
    case "Checkbox":
    case "Textarea":
    case "CircularProgress":
    case "Heading":
    case "Switch":
    case "FormLabel":
    case "FormHelperText":
    case "FormErrorMessage":
    case "TabPanel":
    case "Tab":
    case "Input":
    case "Radio":
    case "ListItem":
    case "NumberInput":
    case "BreadcrumbLink":
    case "Select":
      return (
        <PreviewContainer
          component={component}
          type={Chakra[type]}
          {...forwardedProps}
        />
      );
    // Wrapped functional components (forward ref issue)
    case "AlertIcon":
    case "Progress":
    case "CloseButton":
    case "AccordionIcon":
    case "Code":
    case "Icon":
    case "ListIcon":
    case "Divider":
    case "AlertDescription":
    case "AlertTitle":
    case "InputRightAddon":
    case "InputLeftAddon":
    case "Tag":
      return (
        <PreviewContainer
          component={component}
          type={Chakra[type]}
          {...forwardedProps}
          isBoxWrapped
        />
      );
    // Components with childrens
    case "Box":
    case "SimpleGrid":
    case "Flex":
    case "FormControl":
    case "Tabs":
    case "List":
    case "TabList":
    case "TabPanels":
    case "Grid":
      return (
        <WithChildrenPreviewContainer
          enableVisualHelper
          component={component}
          type={Chakra[type]}
          {...forwardedProps}
        />
      );
    case "RadioGroup":
    case "Stack":
    case "Breadcrumb":
    case "InputGroup":
    case "BreadcrumbItem":
      return (
        <WithChildrenPreviewContainer
          enableVisualHelper
          component={component}
          type={Chakra[type]}
          {...forwardedProps}
          isBoxWrapped
        />
      );
    // More complex components
    case "InputRightElement":
      return <InputRightElementPreview component={component} />;
    case "InputLeftElement":
      return <InputLeftElementPreview component={component} />;
    case "Avatar":
      return <AvatarPreview component={component} />;
    case "AvatarBadge":
      return <AvatarBadgePreview component={component} />;
    case "AvatarGroup":
      return <AvatarGroupPreview component={component} />;
    case "Alert":
      return <AlertPreview component={component} />;
    case "Accordion":
      return <AccordionPreview component={component} />;
    case "AccordionHeader":
      return <AccordionHeaderPreview component={component} />;
    case "AccordionItem":
      return <AccordionItemPreview component={component} />;
    case "AccordionPanel":
      return <AccordionPanelPreview component={component} />;
    case "AspectRatioBox":
    // return <AspectRatioBoxPreview component={component} />;
    default:
      return null;
  }
};

export default memo(ComponentPreview);
