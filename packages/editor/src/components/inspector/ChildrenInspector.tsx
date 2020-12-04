import React from "react";
import ElementsList from "./elements-list/ElementsList";

import { useTree } from "@glare/tree";

const ChildrenInspector = () => {
  const components = useTree((state) => state.components);
  const selectedId = useTree((state) => state.selectedId);
  const component = useTree((state) => state.components[selectedId]);

  const [
    moveSelectedItemChildren,
    select,
    hover,
    unhover,
  ] = useTree((state) => [
    state.moveSelectedItemChildren,
    state.select,
    state.hover,
    state.unhover,
  ]);

  const childrenComponent = component.children.map(
    (child) => components[child]
  );

  const moveChildren = (fromIndex: number, toIndex: number) => {
    moveSelectedItemChildren({
      fromIndex,
      toIndex,
    });
  };

  const onSelectChild = (id: IComponent["id"]) => {
    select(id);
  };

  const onHoverChild = (id: IComponent["id"]) => {
    hover(id);
  };

  const onUnhoverChild = () => {
    unhover();
  };

  return (
    <ElementsList
      elements={childrenComponent}
      moveItem={moveChildren}
      onSelect={onSelectChild}
      onHover={onHoverChild}
      onUnhover={onUnhoverChild}
    />
  );
};

export default ChildrenInspector;
