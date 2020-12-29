export const keyMap = {
  DELETE_NODE: ["backspace", "del"],
  TOGGLE_BUILDER_MODE: "b",
  TOGGLE_CODE_PANEL: "c",
  UNDO: ["ctrl+z", "cmd+z"],
  REDO: ["ctrl+y", "cmd+y"],
  UNSELECT: ["Escape"],
  PARENT: "p",
  DUPLICATE: ["ctrl+d", "cmd+d"],
};

const hasNoSpecialKeyPressed = (event: KeyboardEvent | undefined) =>
  !event?.metaKey && !event?.shiftKey && !event?.ctrlKey && !event?.altKey;

const useShortcuts = () => {
  const dispatch = useDispatch();
  const selected = useSelector(getSelectedComponent);

  const deleteNode = (event: KeyboardEvent | undefined) => {
    if (event) {
      event.preventDefault();
    }
    dispatch.components.deleteComponent(selected.id);
  };

  const toggleBuilderMode = (event: KeyboardEvent | undefined) => {
    if (event && hasNoSpecialKeyPressed(event)) {
      event.preventDefault();
      dispatch.app.toggleBuilderMode();
    }
  };

  const toggleCodePanel = (event: KeyboardEvent | undefined) => {
    if (event && hasNoSpecialKeyPressed(event)) {
      event.preventDefault();
      dispatch.app.toggleCodePanel();
    }
  };

  const undo = (event: KeyboardEvent | undefined) => {
    if (event) {
      event.preventDefault();
    }

    dispatch(UndoActionCreators.undo());
  };

  const redo = (event: KeyboardEvent | undefined) => {
    if (event) {
      event.preventDefault();
    }

    dispatch(UndoActionCreators.redo());
  };

  const onUnselect = () => {
    dispatch.components.unselect();
  };

  const onSelectParent = (event: KeyboardEvent | undefined) => {
    if (event && hasNoSpecialKeyPressed(event)) {
      event.preventDefault();
      dispatch.components.selectParent();
    }
  };

  const onDuplicate = (event: KeyboardEvent | undefined) => {
    if (event) {
      event.preventDefault();
    }

    dispatch.components.duplicate();
  };

  const handlers = {
    DELETE_NODE: deleteNode,
    TOGGLE_BUILDER_MODE: toggleBuilderMode,
    TOGGLE_CODE_PANEL: toggleCodePanel,
    UNDO: undo,
    REDO: redo,
    UNSELECT: onUnselect,
    PARENT: onSelectParent,
    DUPLICATE: onDuplicate,
  };

  return { handlers };
};

export default useShortcuts;
