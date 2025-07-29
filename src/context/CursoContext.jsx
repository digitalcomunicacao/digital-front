// src/context/CursoContext.tsx
import { createContext, useContext, useState } from "react";

const CursoContext = createContext(null);

export const CursoProvider = ({ children }) => {
  const [quantidadeCursos, setQuantidadeCursos] = useState(0);

  return (
    <CursoContext.Provider value={{ quantidadeCursos, setQuantidadeCursos }}>
      {children}
    </CursoContext.Provider>
  );
};

export const useCursoContext = () => useContext(CursoContext);
