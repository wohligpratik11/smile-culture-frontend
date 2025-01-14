// context/UploadContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const UploadContext = createContext();

export const useUploadContext = () => useContext(UploadContext);

export const UploadProvider = ({ children }) => {
  const [uploadFileData, setUploadFileData] = useState(null); // Store uploaded file data
  const [selectedCharacterId, setSelectedCharacterId] = useState(null); // Store selected character id
  const [selectedUploadFile, setSelectedUploadFile] = useState(null); // Store selected character id

  useEffect(() => {
    console.log('Upload Data in context:', selectedUploadFile);
    console.log('Upload File Data in context:', uploadFileData);
    console.log('Selected Character ID in context:', selectedCharacterId);
  }, [uploadFileData, selectedCharacterId]);
  const setUploadDataFileState = (data) => {
    console.log('Data received in context:', data);
    setUploadFileData(data);
  };


  const setCharacterId = (id) => {
    setSelectedCharacterId(id);
  };

  return (
    <UploadContext.Provider
      value={{
        uploadFileData,
        setUploadDataFileState,
        selectedCharacterId,
        setCharacterId,
        selectedUploadFile,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};
