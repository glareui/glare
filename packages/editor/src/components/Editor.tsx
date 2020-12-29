import * as React from "react";
import { Box, Text } from "@chakra-ui/react";

import SplitPane from "react-split-pane";
// import CodePanel from "./components/CodePanel";
import { ComponentPreview, useDropComponent } from "@glare/render";

import { useTree } from "@glare/tree";
import { useApp } from "./../store/app"; // FIXME

export const gridStyles = {
  backgroundImage:
    "linear-gradient(to right, #d9e2e9 1px, transparent 1px),linear-gradient(to bottom, #d9e2e9 1px, transparent 1px);",
  backgroundSize: "20px 20px",
  bgColor: "#edf2f6",
  p: 10,
};

export const Editor: React.FC = React.memo(() => {
  const showCode = useApp((state) => state.showCode);
  const showLayout = useApp((state) => state.showLayout);
  const components = useTree((state) => state.components);
  const [unselect] = useTree((state) => [state.unselect]);

  const { drop } = useDropComponent("root");
  const isEmpty = !components.root.children.length;
  const rootProps = components.root.props;

  let editorBackgroundProps = {};

  const onSelectBackground = () => {
    unselect();
  };

  if (showLayout) {
    editorBackgroundProps = gridStyles;
  }

  editorBackgroundProps = {
    ...editorBackgroundProps,
    ...rootProps,
  };

  const Playground = (
    <Box
      p={2}
      {...editorBackgroundProps}
      height="100%"
      minWidth="10rem"
      width="100%"
      display={isEmpty ? "flex" : "block"}
      justifyContent="center"
      alignItems="center"
      overflow="auto"
      ref={drop}
      position="relative"
      flexDirection="column"
      onClick={onSelectBackground}>
      {isEmpty && (
        <Text maxWidth="md" color="gray.400" fontSize="xl" textAlign="center">
          Drag some component to start.
        </Text>
      )}

      {components.root.children.map((name: string) => (
        <ComponentPreview key={name} componentName={name} />
      ))}
    </Box>
  );

  if (!showCode) {
    return Playground;
  }

  return (
    <SplitPane
      style={{ overflow: "auto" }}
      defaultSize="50%"
      resizerStyle={{
        border: "3px solid rgba(1, 22, 39, 0.21)",
        zIndex: 20,
        cursor: "row-resize",
      }}
      split="horizontal">
      {Playground}
      {/* <CodePanel /> */}
    </SplitPane>
  );
});
