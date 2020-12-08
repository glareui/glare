import React from "react";
import { Flex } from "@chakra-ui/react";

const EditorContext = ({ children }) =>
  React.cloneElement(children, { className: "glare-editor-ui" });

export default EditorContext;
