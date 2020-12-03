import React from "react";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ChakraProvider } from "@chakra-ui/react";

import Editor from "@glare/editor";

export const App = () => {
  return <Editor />;
};
