import React, { createContext, useState, useContext } from 'react';

const UploadContext = createContext();

export const UploadProvider = ({ children }) => {
  const [characterId, setCharacterId] = useState([]);

  return (
    <UploadContext.Provider value={{ characterId, setCharacterId }}>
      {children}
    </UploadContext.Provider>
  );
};

export const useUploadContext = () => useContext(UploadContext);
