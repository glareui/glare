import create from "zustand";
import shallow from "zustand/shallow";

type Overlay = undefined | { rect: DOMRect; id: string; type: ComponentType };

export type AppState = {
  showLayout: boolean;
  showCode: boolean;
  inputTextFocused: boolean;
  overlay: undefined | Overlay;
  toggleBuilderMode: () => void;
  toggleCodePanel: () => void;
  toggleInputText: () => void;
  setOverlay: () => void;
};

const INITIAL_APP_STATE = {
  showLayout: true,
  showCode: false,
  inputTextFocused: false,
  overlay: undefined,
} as AppState;

export const useApp = create<AppState>((set) => ({
  ...INITIAL_APP_STATE,
  toggleBuilderMode: () =>
    set((state: TreeState) => ({
      ...state,
      showLayout: !state.showLayout,
    })),
  toggleCodePanel: () =>
    set((state: TreeState) => ({
      ...state,
      showCode: !state.showCode,
    })),
  toggleInputText: () =>
    set((state: TreeState) => ({
      ...state,
      inputTextFocused: !state.inputTextFocused,
    })),
  setOverlay: (overlay: Overlay | undefined) =>
    set((state: TreeState) => ({
      ...state,
      overlay,
    })),
}));
