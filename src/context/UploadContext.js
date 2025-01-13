// context/UploadContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const UploadContext = createContext();

export const useUploadContext = () => useContext(UploadContext);

export const UploadProvider = ({ children }) => {
  const [uploadData, setUploadData] = useState(null); // Store uploaded file data
  const [selectedCharacterId, setSelectedCharacterId] = useState(null); // Store selected character id

  useEffect(() => {
    console.log('Upload Data in context:', uploadData);
    console.log('Selected Character ID in context:', selectedCharacterId);
  }, [uploadData, selectedCharacterId]);
  const setUploadDataState = (data) => {
    setUploadData(data);
  };

  const setCharacterId = (id) => {
    setSelectedCharacterId(id);
  };

  return (
    <UploadContext.Provider
      value={{
        uploadData,
        setUploadDataState,
        selectedCharacterId,
        setCharacterId,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};
