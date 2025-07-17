import React, { createContext, useContext, useState } from 'react';

const DrawerContext = createContext();

export const DrawerProvider = ({ children }) => {
  const [miniDrawer, setMiniDrawer] = useState(false);

  const toggleMiniDrawer = () => {
    setMiniDrawer((prev) => !prev);
  };

  return (
    <DrawerContext.Provider value={{ miniDrawer, setMiniDrawer, toggleMiniDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
};

// Hook customizado renomeado pra deixar claro que é do mini drawer
export const useMiniDrawer = () => useContext(DrawerContext);
