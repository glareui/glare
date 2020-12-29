import { useContext, createContext, useState } from "react";

type RenderProviderProps = { children: React.ReactNode; components: any };

const RenderStateContext = createContext<string[]>([]);

function RenderProvider({ children, components }: RenderProviderProps) {
  const [renderComponents] = useState<string[]>(components);
  return (
    <RenderStateContext.Provider value={renderComponents}>
      {children}
    </RenderStateContext.Provider>
  );
}

function useRenderState() {
  return useContext(RenderStateContext);
}

export { RenderProvider, useRenderState };
