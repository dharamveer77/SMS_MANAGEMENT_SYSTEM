import React, { createContext, useState } from "react";
export const TitleContext = createContext();

const ContextProvider = ({ children }) => {
  const [title, setTitle] = useState("");
  const [session, setSession] = useState([]);

  return (
    <TitleContext.Provider value={{ title, setTitle, session, setSession }}>
      {children}
    </TitleContext.Provider>
  );
};

export default ContextProvider;
