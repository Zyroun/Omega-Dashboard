// File: src/context/OmegaContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const OmegaContext = createContext();

export function OmegaProvider({ children }) {
  const [shopifyKey, setShopifyKey] = useState(localStorage.getItem('shopifyKey') || '');
  const [executionLog, setExecutionLog] = useState([]);

  useEffect(() => {
    localStorage.setItem('shopifyKey', shopifyKey);
  }, [shopifyKey]);

  const logAgentExecution = (agentName) => {
    const timestamp = new Date().toLocaleString();
    setExecutionLog(prev => [...prev, `${timestamp} - ${agentName} executed`]);
  };

  return (
    <OmegaContext.Provider value={{
      shopifyKey,
      setShopifyKey,
      executionLog,
      logAgentExecution
    }}>
      {children}
    </OmegaContext.Provider>
  );
}

export function useOmega() {
  return useContext(OmegaContext);
}
