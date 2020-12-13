import React, { useState } from "react";
import {
  Box,
  Switch,
  Button,
  Flex,
  Link,
  Stack,
  FormLabel,
  FormControl,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  LightMode,
  PopoverFooter,
  Tooltip,
  HStack,
} from "@chakra-ui/react";

import { Hexagon, Layers } from "@geist-ui/react-icons";

import { ExternalLinkIcon, SmallCloseIcon, CheckIcon } from "@chakra-ui/icons";

import { HeaderMenu } from "./headerMenu/HeaderMenu";

import { useTree } from "@glare/tree";
import { useApp } from "./../store/app"; // FIXME

import { EditorContext } from "@glare/theme";

const CodeSandboxButton = () => {
  const components = useTree((state) => state.components);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Tooltip
      zIndex={100}
      hasArrow
      bg="yellow.100"
      aria-label="Builder mode help"
      label="Export in CodeSandbox">
      <Button
        onClick={async () => {
          setIsLoading(true);
        }}
        isLoading={isLoading}
        rightIcon={<ExternalLinkIcon path="" />}
        variant="ghost"
        size="xs">
        Export code
      </Button>
    </Tooltip>
  );
};

export const Header = React.memo(() => {
  const showCode = useApp((state) => state.showCode);
  const showLayout = useApp((state) => state.showLayout);

  const [toggleBuilderMode, toggleCodePanel] = useApp((state) => [
    state.toggleBuilderMode,
    state.toggleCodePanel,
  ]);

  return (
    <EditorContext>
      <Flex
        justifyContent="space-between"
        bg="white"
        as="header"
        height="3rem"
        px="1rem"
        color="black">
        <Flex
          width="14rem"
          height="100%"
          as="a"
          fontSize="xl"
          flexDirection="row"
          alignItems="center"
          aria-label="Chakra UI, Back to homepage">
          <Box fontSize="2xl" as={Layers} size={20} mr={2} color="black" />{" "}
          <Box fontWeight="bold">glare</Box>
        </Flex>

        <Flex flexGrow={1} justifyContent="space-between" alignItems="center">
          <HStack spacing={4} justify="center" align="center">
            <Box>
              <HeaderMenu />
            </Box>
            <FormControl flexDirection="row" display="flex" alignItems="center">
              <Tooltip
                zIndex={100}
                hasArrow
                bg="yellow.100"
                color="black"
                aria-label="Builder mode help"
                label="Builder mode adds extra padding/borders">
                <FormLabel
                  cursor="help"
                  color="black"
                  fontSize="xs"
                  htmlFor="preview"
                  pb={0}
                  mb={0}
                  mr={2}
                  whiteSpace="nowrap">
                  Builder mode
                </FormLabel>
              </Tooltip>
              <LightMode>
                <Switch
                  isChecked={showLayout}
                  colorScheme="gray"
                  size="sm"
                  onChange={() => toggleBuilderMode()}
                  id="preview"
                />
              </LightMode>
            </FormControl>

            <FormControl display="flex" flexDirection="row" alignItems="center">
              <FormLabel
                color="black"
                fontSize="xs"
                mr={2}
                mb={0}
                htmlFor="code"
                pb={0}
                whiteSpace="nowrap">
                Code panel
              </FormLabel>
              <LightMode>
                <Switch
                  isChecked={showCode}
                  id="code"
                  colorScheme="gray"
                  onChange={() => toggleCodePanel()}
                  size="sm"
                />
              </LightMode>
            </FormControl>
          </HStack>

          <Stack direction="row">
            <Popover>
              {({ onClose }) => (
                <>
                  <PopoverTrigger>
                    <Button
                      ml={4}
                      rightIcon={<SmallCloseIcon path="" />}
                      size="xs"
                      variant="ghost"
                      colorScheme="gray">
                      Clear
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent zIndex={100} bg="white">
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Are you sure?</PopoverHeader>
                    <PopoverBody fontSize="sm">
                      Do you really want to remove all components on the editor?
                    </PopoverBody>
                    <PopoverFooter display="flex" justifyContent="flex-end">
                      <Button
                        size="sm"
                        variant="ghost"
                        colorScheme="red"
                        rightIcon={<CheckIcon path="" />}
                        onClick={() => {
                          // FIXME - dispatch.components.reset();
                          if (onClose) {
                            onClose();
                          }
                        }}>
                        Yes, clear
                      </Button>
                    </PopoverFooter>
                  </PopoverContent>
                </>
              )}
            </Popover>
          </Stack>
        </Flex>

        <Stack
          justifyContent="flex-end"
          width="13rem"
          align="center"
          direction="row"
          spacing="2">
          <Link isExternal href="https://github.com/glareui/glare">
            <Box as={Hexagon} size={16} color="black" />
          </Link>
          <Box lineHeight="shorter" color="black" fontSize="xs">
            by{" "}
            <Link isExternal href="https://terminalkitten.com" color="black">
              tk
            </Link>
          </Box>
        </Stack>
      </Flex>
    </EditorContext>
  );
});
