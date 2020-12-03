import React from "react";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { ChakraProvider } from "@chakra-ui/react";

import { useTree } from "@glare/tree";
import { ComponentPreview } from "@glare/render";

export const TreeView = () => {
  const components = useTree((state) => state.components);
  return (
    <ChakraProvider>
      <DndProvider backend={HTML5Backend}>
        <div>
          <h1>TreeViewer</h1>
          {components.root.children.map((name: string) => (
            <ComponentPreview key={name} componentName={name} />
          ))}
        </div>
      </DndProvider>
    </ChakraProvider>
  );
};
