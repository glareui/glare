import React from "react";
import { Flex } from "@chakra-ui/react";

import Tree, {
  mutateTree,
  addItemToTree,
  moveItemOnTree,
  getItem,
} from "@atlaskit/tree";

import { useTree } from "@glare/tree";

const TreeNode = ({ draggingOver, children }) => {
  return (
    <Flex
      transition="background 0.25s ease-in-out"
      background={draggingOver ? "rgba(55, 53, 47, 0.1)" : null}
      _hover={{ background: "rgba(55, 53, 47, 0.1)" }}>
      {children}
    </Flex>
  );
};

const renderItem = ({ item, onExpand, onCollapse, provided, snapshot }) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.dragHandleProps}
      {...provided.draggableProps}>
      <TreeNode
        isDragging={snapshot.isDragging}
        dnd={{ dragHandleProps: provided.dragHandleProps }}>
        {item.type}
      </TreeNode>
    </div>
  );
};

export const TreeView: React.FC = React.memo(() => {
  const components = useTree((state) => state.components);

  console.log(components);

  const tree = { rootId: "comp-root", items: components };

  console.log(tree);

  return (
    <Flex
      maxH="calc(100vh - 3rem)"
      overflowY="auto"
      overflowX="visible"
      boxShadow="xl"
      flex="0 0 14rem"
      p={5}
      m={0}
      as="menu"
      backgroundColor="gray.100"
      width="15rem">
      <Tree
        tree={tree}
        renderItem={(item) => renderItem(item)}
        offsetPerLevel={4}
        isDragEnabled
        isNestingEnabled
      />
    </Flex>
  );
});
