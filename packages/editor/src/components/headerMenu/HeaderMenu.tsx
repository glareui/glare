import React from "react";

import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  LinkProps,
  MenuItemProps,
  MenuButtonProps,
  ButtonProps,
  Portal,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

import ExportMenuItem from "./ExportMenuItem";
import ImportMenuItem from "./ImportMenuItem";

type MenuItemLinkProps = MenuItemProps | LinkProps;

// Ignore because of AS typing issues
const MenuItemLink: React.FC<MenuItemLinkProps> = React.forwardRef(
  (props, ref: React.Ref<HTMLLinkElement>) => {
    return <MenuItem ref={ref} as="a" {...props} />;
  }
);

const CustomMenuButton: React.FC<
  MenuButtonProps | ButtonProps
> = React.forwardRef((props, ref: React.Ref<HTMLLinkElement>) => {
  return <MenuButton as={Button} ref={ref} {...props} />;
});

export const HeaderMenu = React.memo(() => {
  return (
    <Menu placement="bottom">
      <CustomMenuButton
        rightIcon={<CheckIcon path="" />}
        size="xs"
        variant="ghost"
        colorScheme="gray">
        Editor
      </CustomMenuButton>
      <Portal>
        <MenuList bg="white" zIndex={999}>
          <ExportMenuItem />
          <ImportMenuItem />

          <MenuDivider />

          <MenuItemLink isExternal href="https://chakra-ui.com/getting-started">
            <Box mr={2} as={CheckIcon} />
            Chakra UI Docs
          </MenuItemLink>
          <MenuItemLink href="https://github.com/premieroctet/openchakra/issues">
            <Box mr={2} as={CheckIcon} />
            Report issue
          </MenuItemLink>
        </MenuList>
      </Portal>
    </Menu>
  );
});
