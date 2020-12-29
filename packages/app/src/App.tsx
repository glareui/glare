import { Flex, Box } from "@chakra-ui/react";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ChakraProvider, theme as chakraTheme } from "@chakra-ui/react";

import { editorTheme } from "@glare/theme";

import { RenderProvider, chakraRenderConfig } from "@glare/utils";

import { componentsList, customItems, menuItems } from "./componentsList.ts";

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
    <RenderProvider components={{ chakra: chakraRenderConfig }}>
      <DndProvider backend={HTML5Backend}>
        <ChakraProvider theme={editorTheme}>
          <Header />
          <Flex h="calc(100vh - 3rem)">
            <Sidebar items={menuItems} />
            <TreeView />
            <Box bg="white" flex={1} position="relative">
              <ChakraProvider theme={chakraTheme}>
                <Editor acceptCustom={["Page"]} />
              </ChakraProvider>
            </Box>
            <Box
              maxH="calc(100vh - 3rem)"
              flex="0 0 18rem"
              boxShadow="md"
              overflowY="auto"
              overflowX="visible">
              <InspectorProvider>
                <Inspector />
              </InspectorProvider>
            </Box>
          </Flex>
        </ChakraProvider>
      </DndProvider>
    </RenderProviders>
  );
};
