import React, { createContext, useState, useContext } from 'react';

// Create a context for the spinner
const SpinnerContext = createContext();

export const useSpinner = () => {
  return useContext(SpinnerContext);
};

export const SpinnerProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const showSpinner = () => setLoading(true);
  const hideSpinner = () => setLoading(false);

  return (
    <SpinnerContext.Provider value={{ showSpinner, hideSpinner }}>
      {children}

      {loading && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-transparent"
          aria-live="assertive"
          role="status"
        >
          <div className="loader"></div>
        </div>
      )}
    </SpinnerContext.Provider>
  );
};
