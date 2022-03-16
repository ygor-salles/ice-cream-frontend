import { createContext, useCallback, useContext, useState } from "react";

interface ISidebarOption {
  icon: string;
  path: string;
  label: string;
}

interface ISidebarContextData {
  isSidebarOpen: boolean;
  toggleSidebarOpen: () => void;
  sidebarOptions: ISidebarOption[];
  setSidebarOptions: (newSidebarOptions: ISidebarOption[]) => void;
}

const SidebarContext = createContext({} as ISidebarContextData);

export const useSidebarContext = () => {
  return useContext(SidebarContext);
};

export const SidebarProvider: React.FC = ({ children }: any) => {
  const [isSidebarOpen, setIdSidebarOpen] = useState<boolean>(false);
  const [sidebarOptions, setSidebarOptions] = useState<ISidebarOption[]>([]);

  const toggleSidebarOpen = useCallback(() => {
    setIdSidebarOpen((oldSidebarOpen) => !oldSidebarOpen);
  }, []);

  const handleSetSidebarOptions = useCallback(
    (newSidebarOptions: ISidebarOption[]) => {
      setSidebarOptions(newSidebarOptions);
    },
    []
  );

  return (
    <SidebarContext.Provider
      value={{
        isSidebarOpen,
        sidebarOptions,
        toggleSidebarOpen,
        setSidebarOptions: handleSetSidebarOptions,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
