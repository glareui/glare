import { cloneElement } from "react";

const EditorContext = ({ children }: any) =>
  cloneElement(children, { className: "glare-editor-ui" });

export default EditorContext;
