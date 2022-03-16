import { createContext, useCallback, useContext, useState } from "react";

interface ISidebarContextData {
  isSidebarOpen: boolean;
  toggleSidebarOpen: () => void;
}

const SidebarContext = createContext({} as ISidebarContextData);

export const useSidebarContext = () => {
  return useContext(SidebarContext);
};

export const SidebarProvider: React.FC = ({ children }: any) => {
  const [isSidebarOpen, setIdSidebarOpen] = useState<boolean>(false);

  const toggleSidebarOpen = useCallback(() => {
    setIdSidebarOpen((oldSidebarOpen) => !oldSidebarOpen);
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebarOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};
