import { useDrop, DropTargetMonitor } from "react-dnd";
import { rootComponents } from "./../utils/editor";

import { useTree, builders, shallow } from "@glare/tree";

export const useDropComponent = (
  componentId: string,
  acceptCustom: (ComponentType | MetaComponentType)[] = [],
  accept: (ComponentType | MetaComponentType)[] = rootComponents,
  canDrop = true
) => {
  const [moveItem, addMetaItem, addItem] = useTree(
    (state) => [state.moveItem, state.addMetaItem, state.addItem],
    shallow
  );

  const [{ isOver }, drop] = useDrop({
    accept: accept.concat(acceptCustom),
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }) && monitor.canDrop(),
    }),
    drop: (item: ComponentItemProps, monitor: DropTargetMonitor) => {
      if (!monitor.isOver()) {
        return;
      }

      if (item.isMoved) {
        moveItem({
          parentId: componentId,
          componentId: item.id,
        });
      } else if (item.isMeta) {
        addMetaItem(builders[item.type](componentId));
      } else {
        addItem({
          parentId: componentId,
          type: item.type,
          rootParentType: item.rootParentType,
        });
      }
    },
    canDrop: () => canDrop,
  });

  return { drop, isOver };
};
