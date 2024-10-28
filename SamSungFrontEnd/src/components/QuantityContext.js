
import React, { createContext, useState } from 'react';


export const QuantityContext = createContext();

export const QuantityProvider = ({ children }) => {
  const [iconQuantity, setIconQuantity] = useState(0);
  return (
    <QuantityContext.Provider value={{ iconQuantity, setIconQuantity }}>
      {children}
    </QuantityContext.Provider>
  );
};