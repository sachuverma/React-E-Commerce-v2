import React, { useState, useContext } from "react";

const ScanContext = React.createContext();
const ScanProvider = ({ children }) => {
  const [detectedItems, setDetectedItems] = useState([]);

  return (
    <ScanContext.Provider
      value={{
        detectedItems,
        setDetectedItems,
      }}
    >
      {children}
    </ScanContext.Provider>
  );
};

// custom hook
export const useGlobalContext = () => {
  return useContext(ScanContext);
};

export { ScanContext, ScanProvider };
