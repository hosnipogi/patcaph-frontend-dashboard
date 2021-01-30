import React, { useState, useMemo } from 'react';

export const SidebarContext = React.createContext();

export const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function closeSidebar() {
    setIsSidebarOpen(false);
  }

  const value = useMemo(() => {
    function toggleSidebar() {
      setIsSidebarOpen(!isSidebarOpen);
    }
    return {
      isSidebarOpen,
      toggleSidebar,
      closeSidebar,
    };
  }, [isSidebarOpen]);

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};
