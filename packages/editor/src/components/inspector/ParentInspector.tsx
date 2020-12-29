import ElementListItem from "./elements-list/ElementListItem";

import { useTree } from "@glare/tree";

const ParentInspector = () => {
  const selectedId = useTree((state) => state.selectedId);
  const parentComponent = useTree(
    (state) => state.components[state.components[selectedId].parent]
  );

  const [select, hover, unhover] = useTree((state) => [
    state.select,
    state.hover,
    state.unhover,
  ]);

  const onSelect = () => {
    select(parentComponent.id);
  };

  const onHover = () => {
    hover(parentComponent.id);
  };

  const onUnhover = () => {
    unhover();
  };

  return (
    <ElementListItem
      type={parentComponent.type}
      onMouseOver={onHover}
      onMouseOut={onUnhover}
      onSelect={onSelect}
    />
  );
};

export default ParentInspector;
