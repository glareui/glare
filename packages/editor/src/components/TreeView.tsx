import React from "react";
import { Box, Flex } from "@chakra-ui/react";

import Tree from "@atlaskit/tree";

import { EditorContext } from "@glare/theme";
import { useTree, shallow } from "@glare/tree";

const TreeNodeTarget = ({ draggingOver, children, provided, ...rest }) => {
  return (
    <Flex
      ref={provided.innerRef}
      width="15rem"
      transition="background 0.25s ease-in-out"
      background={draggingOver ? "rgba(55, 53, 47, 0.1)" : null}
      _hover={{ background: "rgba(55, 53, 47, 0.1)" }}
      {...rest}>
      {children}
    </Flex>
  );
};

const TreeNode = ({ children }) => {
  return (
    <Flex p={2} fontSize="sm" width="100%" flexGrow={1}>
      {children}
    </Flex>
  );
};

const renderItem = ({ item, onExpand, onCollapse, provided, snapshot }) => {
  return (
    <TreeNodeTarget
      draggingOver={snapshot.draggingOver}
      provided={provided}
      {...provided.dragHandleProps}
      {...provided.draggableProps}>
      <TreeNode
        isDragging={snapshot.isDragging}
        dnd={{ dragHandleProps: provided.dragHandleProps }}>
        {item.type}
      </TreeNode>
    </TreeNodeTarget>
  );
};

export const TreeView: React.FC = React.memo(() => {
  const components = useTree((state) => state.components);
  const tree = { rootId: components.root.id, items: components };

  const [moveItem, moveItemChildren] = useTree(
    (state) => [state.moveItem, state.moveItemChildren],
    shallow
  );

  const onDragEnd = (source, destination) => {
    if (!destination) return;
    if ("index" in source && "index" in destination) {
      moveItemChildren({
        componentId: destination.parentId,
        fromIndex: source.index,
        toIndex: destination.index,
      });
    } else {
      const sourceItemId = components[source.parentId].children[source.index];
      const sourceItem = components[sourceItemId];
      moveItem({ parentId: destination.parentId, componentId: sourceItem.id });
    }
  };

  return (
    <EditorContext>
      <Flex
        maxH="calc(100vh - 3rem)"
        overflowY="auto"
        overflowX="visible"
        boxShadow="xl"
        m={0}
        p={0}
        backgroundColor="white"
        width="15rem">
        <Tree
          tree={tree}
          renderItem={(item) => renderItem(item)}
          offsetPerLevel={4}
          onDragEnd={onDragEnd}
          isDragEnabled
          isNestingEnabled
        />
      </Flex>
    </EditorContext>
  );
});
