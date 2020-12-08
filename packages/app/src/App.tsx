import React from "react";
import { Flex, Box } from "@chakra-ui/react";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ChakraProvider, theme as chakraTheme } from "@chakra-ui/react";

import theme from "@glare/theme";

import {
  InspectorProvider,
  Editor,
  Header,
  Sidebar,
  TreeView,
  Inspector,
} from "@glare/editor";

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <DndProvider backend={HTML5Backend}>
        <Header />
        <Flex h="calc(100vh - 3rem)">
          <TreeView />
          <Box bg="white" flex={1} position="relative">
            <Editor />
          </Box>
          <Box
            maxH="calc(100vh - 3rem)"
            flex="0 0 15rem"
            bg="#f7fafc"
            overflowY="auto"
            overflowX="visible"
            borderLeft="1px solid #cad5de">
            <InspectorProvider>
              <Inspector />
            </InspectorProvider>
          </Box>
        </Flex>
      </DndProvider>
    </ChakraProvider>
  );
};
