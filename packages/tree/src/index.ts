import "./tree.d";

import create from "zustand";
import shallow from "zustand/shallow";

import produce from "immer";
import omit from "lodash/omit";

import { builders } from "./composer";
import { generateId, duplicateComponent, deleteComponent } from "./utils";

const DEFAULT_ID = "root";

type TreeAddPayload = {
  parentId: string;
  type: ComponentType;
  rootParentType?: ComponentType;
  testId?: string;
};

type TreeAddMetaPayload = {
  components: IComponents;
  root: string;
  parent: string;
};

type TreeComponentNamePayload = { componentId: IComponent["id"]; name: string };
type TreeMovePayload = {
  parentId: IComponent["parentId"];
  componentId: IComponent["id"];
};
type TreeMoveSelectedChildrenPayload = { fromIndex: number; toIndex: number };
type TreeMoveChildrenPayload = {
  componentId: IComponent["id"];
  fromIndex: number;
  toIndex: number;
};

type UpdateMetaPropsPayload = { id: string; name: string; value: string };
type UpdatePropsPayload = { id: string; name: string; value: string };
type DeletePropsPayload = { id: string; name: string };

type TreeState = {
  // Tree
  components: IComponents;
  selectedId: IComponent["id"];
  hoveredId?: IComponent["id"];
  // Mutations
  select: (selectedId: IComponent["id"]) => void;
  unselect: () => void;
  selectParent: () => void;
  hover: (componentId: IComponent["id"]) => void;
  unhover: () => void;
  setComponentName: (payload: TreeComponentNamePayload) => void;
  duplicate: () => void;
  updateMetaProps: (payload: UpdateMetaPropsPayload) => void;
  resetProps: (componentId: IComponent["id"]) => void;
  updateProps: (payload: UpdatePropsPayload) => void;
  deleteProps: (payload: DeletePropsPayload) => void;
  addItem: (payload: TreeAddPayload) => void;
  addMetaItem: (payload: TreeAddMetaPayload) => void;
  moveItem: (payload: TreeMovePayload) => void;
  moveSelectedItemChildren: (payload: TreeMoveSelectedChildrenPayload) => void;
  moveItemChildren: (payload: TreeMoveChildrenPayload) => void;
  deleteItem: (componentId: string) => void;
};

export const INITIAL_COMPONENTS: IComponents = {
  root: {
    id: DEFAULT_ID,
    parent: DEFAULT_ID,
    type: "Box" as ComponentType,
    children: [],
    props: {},
  },
};

const useTree = create<TreeState>((set) => ({
  components: INITIAL_COMPONENTS,
  selectedId: DEFAULT_ID,
  select: (selectedId) =>
    set((state: TreeState) => ({
      ...state,
      selectedId,
    })),
  unselect: () =>
    set((state: TreeState) => ({
      ...state,
      selectedId: DEFAULT_ID,
    })),
  selectParent: () =>
    set((state: TreeState) => {
      const selectedComponent = state.components[state.selectedId];
      return {
        ...state,
        selectedId: state.components[selectedComponent.parent].id,
      };
    }),
  hover: (componentId) =>
    set((state: TreeState) => ({
      ...state,
      componentId,
    })),
  unhover: () =>
    set((state: TreeState) => ({
      ...state,
      hoveredId: undefined,
    })),
  setComponentName: () =>
    set((state: TreeState) => {
      return produce(state, (draftState) => {
        const component = draftState.components[payload.componentId];
        component.componentName = payload.name;
      });
    }),
  duplicate: () =>
    set((state: TreeState) => {
      return produce(state, (draftState: ComponentsState) => {
        const selectedComponent = draftState.components[draftState.selectedId];
        if (selectedComponent.id !== DEFAULT_ID) {
          const parentElement = draftState.components[selectedComponent.parent];

          const { newId, clonedComponents } = duplicateComponent(
            selectedComponent,
            draftState.components
          );

          draftState.components = {
            ...draftState.components,
            ...clonedComponents,
          };
          draftState.components[parentElement.id].children.push(newId);
        }
      });
    }),
  updateMetaProps: (payload) =>
    set((state: TreeState) => {
      return produce(state, (draftState: ComponentsState) => {
        draftState.components[payload.id][payload.name] = payload.value;
      });
    }),
  resetProps: (componentId) =>
    set((state: TreeState) => {
      return produce(state, (draftState: ComponentsState) => {
        const component = draftState.components[componentId];
        const { form, ...defaultProps } = DEFAULT_PROPS[component.type] || {};

        draftState.components[componentId].props = defaultProps || {};
      });
    }),
  updateProps: (payload) =>
    set((state: TreeState) => {
      return produce(state, (draftState: ComponentsState) => {
        draftState.components[payload.id].props[payload.name] = payload.value;
      });
    }),
  deleteProps: (payload) =>
    set((state: TreeState) => {
      return {
        ...state,
        components: {
          ...state.components,
          [payload.id]: {
            ...state.components[payload.id],
            props: omit(state.components[payload.id].props, payload.name),
          },
        },
      };
    }),

  addItem: (payload) =>
    set((state: TreeState) =>
      produce(state, (draftState: TreeState) => {
        const id = payload.testId || generateId();
        draftState.selectedId = id;
        draftState.components[payload.parentId].children.push(id);
        draftState.components[id] = {
          id,
          props: {},
          children: [],
          type: payload.type,
          parent: payload.parentId,
          rootParentType: payload.rootParentType || payload.type,
        };
      })
    ),
  addMetaItem: (payload) =>
    set((state: TreeState) =>
      produce(state, (draftState: ComponentsState) => {
        draftState.selectedId = payload.root;
        draftState.components[payload.parent].children.push(payload.root);

        draftState.components = {
          ...draftState.components,
          ...payload.components,
        };
      })
    ),
  moveItem: (payload) =>
    set((state: TreeState) => {
      if (
        state.components[payload.componentId].parent === payload.parentId ||
        payload.parentId === payload.componentId
      ) {
        return state;
      }
      return produce(state, (draftState: TreeState) => {
        const previousParentId =
          draftState.components[payload.componentId].parent;

        const children = draftState.components[
          previousParentId
        ].children.filter((id: string) => id !== payload.componentId);

        draftState.components[previousParentId].children = children;
        draftState.components[payload.componentId].parent = payload.parentId;
        draftState.components[payload.parentId].children.push(
          payload.componentId
        );
      });
    }),
  moveSelectedItemChildren: (payload) =>
    set((state: TreeState) => {
      return produce(state, (draftState: TreeState) => {
        const selectedComponent = draftState.components[draftState.selectedId];

        selectedComponent.children.splice(
          payload.toIndex,
          0,
          selectedComponent.children.splice(payload.fromIndex, 1)[0]
        );
      });
    }),
  moveItemChildren: (payload) =>
    set((state: TreeState) => {
      return produce(state, (draftState: TreeState) => {
        const selectedComponent = draftState.components[payload.componentId];

        selectedComponent.children.splice(
          payload.toIndex,
          0,
          selectedComponent.children.splice(payload.fromIndex, 1)[0]
        );
      });
    }),
  deleteItem: (componentId) =>
    set((state: TreeState) => {
      if (componentId === "root") {
        return state;
      }

      return produce(state, (draftState: TreeState) => {
        const component = draftState.components[componentId];

        // Remove self
        if (component && component.parent) {
          const children = draftState.components[
            component.parent
          ].children.filter((id: string) => id !== componentId);

          draftState.components[component.parent].children = children;
        }

        draftState.selectedId = DEFAULT_ID;
        draftState.components = deleteComponent(
          component,
          draftState.components
        );
      });
    }),
}));

export { useTree, builders, shallow };
