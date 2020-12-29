import create from "zustand";

export type ConfigState = {
  packages: Array;
  addPackage: () => void;
};

const INITIAL_CONFIG_STATE = {
  packages: {},
} as ConfigState;

export const useConfig = create<ConfigState>((set) => ({
  ...INITIAL_CONFIG_STATE,
  addPackage: (pkgs: IComponents) =>
    set((state: ConfigState) => ({
      ...state,
      packages: { ...state.packages, pkgs },
    })),
}));
