import React from "react";

const EditorContext = ({ children }: any) =>
  React.cloneElement(children, { className: "glare-editor-ui" });

export default EditorContext;
