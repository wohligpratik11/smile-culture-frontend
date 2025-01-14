import { createContext, useState, useContext } from 'react';

// Create context
const UploadContext = createContext();

// Create a provider component
export const UploadProvider = ({ children }) => {
  const [formData, setFormData] = useState(null);
  const [characterId, setCharacterId] = useState(null);

  return (
    <UploadContext.Provider
      value={{ formData, setFormData, characterId, setCharacterId }}
    >
      {children}
    </UploadContext.Provider>
  );
};

// Custom hook to use the context
export const useUploadContext = () => useContext(UploadContext);
