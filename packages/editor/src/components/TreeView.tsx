import * as React from "react";
import { Flex, Text } from "@chakra-ui/react";
import Tree from "@atlaskit/tree";

import { ChevronRight, ChevronDown } from "@geist-ui/react-icons";

import { EditorContext } from "@glare/theme";
import { useTree, shallow } from "@glare/tree";

const TreeNodeTarget = ({ draggingOver, children, provided, ...rest }) => {
  return (
    <Flex
      ref={provided.innerRef}
      width="15rem"
      color="black"
      transition="background 0.25s ease-in-out"
      backgound={draggingOver ? "blackAlpha.100" : null}
      _hover={{ background: "#F8F9FA" }}
      {...rest}>
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
      <Flex
        p={2}
        fontSize="sm"
        width="100%"
        flexGrow={1}
        alignItems="center"
        isDragging={snapshot.isDragging}
        dnd={{ dragHandleProps: provided.dragHandleProps }}>
        {item.children.length && item.isExpanded ? (
          <ChevronDown size={16} onClick={() => onCollapse(item.id)} />
        ) : (
          <ChevronRight size={16} onClick={() => onExpand(item.id)} />
        )}
        <Text letterSpacing="wide" fontSize="sm" textTransform="capitalize">
          {item.type}
        </Text>
      </Flex>
    </TreeNodeTarget>
  );
};

export const TreeView: React.FC = React.memo(() => {
  // define state
  const components = useTree((state) => state.components);
  const tree = { rootId: components.root.id, items: components };

  const [moveItem, moveItemChildren, updateMetaProps] = useTree(
    (state) => [state.moveItem, state.moveItemChildren, state.updateMetaProps],
    shallow
  );

  const onExpand = (itemId) => {
    if (itemId) {
      updateMetaProps({ id: itemId, name: "isExpanded", value: true });
    }
  };

  const onCollapse = (itemId) => {
    if (itemId) {
      updateMetaProps({ id: itemId, name: "isExpanded", value: false });
    }
  };

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
          onCollapse={onCollapse}
          onExpand={onExpand}
          isDragEnabled
          isNestingEnabled
        />
      </Flex>
    </EditorContext>
  );
});
