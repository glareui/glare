import React, { useState, memo, useEffect, useMemo } from "react";
import {
  Link,
  Box,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
  ModalFooter,
  Button,
  useDisclosure,
  Text,
} from "@chakra-ui/react";

import { Copy, Delete. Edit2, RefreshCcw } from "@geist-ui/react-icons";

import Panels from "./panels/Panels";
import StylesPanel from "./panels/StylesPanel";
import ActionButton from "./ActionButton";
import { useInspectorUpdate } from "./../../contexts/InspectorContext";
import { componentsList } from "./../../components/componentsList";

import { useTree } from "@glare/tree";

const Inspector = () => {
  const selectedId = useTree((state) => state.selectedId);
  const component = useTree((state) => state.components[selectedId]);

  const [deleteItem] = useTree((state) => [state.deleteItem]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [componentName, onChangeComponentName] = useState("");

  const { clearActiveProps } = useInspectorUpdate();

  const { type, rootParentType, id, children } = component;

  const isRoot = id === "root";
  const parentIsRoot = component.parent === "root";

  const docType = rootParentType || type;
  const componentHasChildren = children.length > 0;

  useEffect(() => {
    clearActiveProps();
  }, [clearActiveProps]);

  return (
    <>
      <Box bg="white">
        <Box
          fontWeight="semibold"
          fontSize="md"
          color="blue.700"
          py={2}
          px={2}
          boxShadow="sm"
          bg="blue.50"
          display="flex"
          justifyContent="space-between"
          flexDir="column">
          {isRoot ? "Document" : type}
          {!!component.componentName && (
            <Text fontSize="xs" fontWeight="light">
              {component.componentName}
            </Text>
          )}
        </Box>
        {!isRoot && (
          <Stack
            direction="row"
            py={2}
            spacing={2}
            align="center"
            zIndex={99}
            px={2}
            flexWrap="wrap"
            justify="flex-end">
            {!component.componentName && (
              <ActionButton
                label="Name component"
                icon={<Edit2 size={16} />}
                onClick={() => null}
              />
            )}
            <ActionButton
              label="Duplicate"
              onClick={() => null}
              icon={<Copy size={16} />}
            />
            <ActionButton
              label="Reset props"
              icon={<RefreshCcw size={16} />}
              onClick={() => null}
            />
            <ActionButton
              label="Chakra UI Doc"
              as={Link}
              onClick={() => {
                window.open(
                  `https://chakra-ui.com/${docType.toLowerCase()}`,
                  "_blank"
                );
              }}
              icon={<Copy size={16} />}
            />
            <ActionButton
              bg="red.500"
              label="Remove"
              onClick={() => deleteItem(selectedId)}
              icon={<Delete size={16} />}
            />
          </Stack>
        )}
      </Box>

      <Box pb={1} bg="white" px={3}>
        <Panels component={component} isRoot={isRoot} />
      </Box>
      <StylesPanel
        isRoot={isRoot}
        showChildren={componentHasChildren}
        parentIsRoot={parentIsRoot}
      />
    </>
  );
};

export { Inspector };
