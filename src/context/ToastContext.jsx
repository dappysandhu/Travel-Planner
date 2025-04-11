/* eslint-disable react/prop-types */
import React, { createContext, useContext, useState } from 'react';
import CustomToast from '../components/Toast'; // Using your existing Toast component

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'info'
  });

  const showToast = (message, severity = 'info') => {
    setToast({
      open: true,
      message,
      severity
    });
  };

  const hideToast = () => {
    setToast({
      ...toast,
      open: false
    });
  };

  // Helper methods for specific toast types
  const showSuccessToast = (message) => showToast(message, 'success');
  const showErrorToast = (message) => showToast(message, 'error');
  const showInfoToast = (message) => showToast(message, 'info');
  const showWarningToast = (message) => showToast(message, 'warning');

  return (
    <ToastContext.Provider 
      value={{ 
        showToast, 
        showSuccessToast, 
        showErrorToast,
        showInfoToast,
        showWarningToast
      }}
    >
      {children}
      <CustomToast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={hideToast}
      />
    </ToastContext.Provider>
  );
};
