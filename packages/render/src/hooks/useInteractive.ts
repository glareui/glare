import { useRef, MouseEvent } from "react";

import { useDrag } from "react-dnd";
import { useTree, shallow } from "@glare/tree";

// import { getShowLayout, getFocusedComponent } from "../core/selectors/app";*/

export const useInteractive = (
  component: IComponent,
  enableVisualHelper = false
) => {
  const [select] = useTree((state) => [state.select], shallow);
  const [hover, unhover] = useTree(
    (state) => [state.hover, state.unhover],
    shallow
  );

  const showLayout = true; // useEditor((state) => state.getShowLayout);
  const isComponentSelected = useTree(
    (state) => state.selectedId === component.id
  );
  const isHovered = useTree((state) => state.hoveredId === component.id);

  const focusInput = false; //useTree(getFocusedComponent(component.id));

  const [, drag] = useDrag({
    item: { id: component.id, type: component.type, isMoved: true },
  });

  const ref = useRef<HTMLDivElement>(null);
  let props = {
    ...component.props,
    onMouseOver: (event: MouseEvent) => {
      event.stopPropagation();
      hover(component.id);
    },
    onMouseOut: () => {
      unhover();
    },
    onClick: (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      select(component.id);
    },
    onDoubleClick: (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      if (focusInput === false) {
        // dispatch.app.toggleInputText();
      }
    },
  };

  if (showLayout && enableVisualHelper) {
    props = {
      ...props,
      border: `1px dashed #718096`,
      padding: props.p || props.padding ? props.p || props.padding : 4,
    };
  }

  if (isHovered || isComponentSelected) {
    props = {
      ...props,
      boxShadow: `${focusInput ? "#ffc4c7" : "#4FD1C5"} 0px 0px 0px 2px inset`,
    };
  }

  return { props, ref: drag(ref), drag };
};
