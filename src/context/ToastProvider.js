// components/ToastProvider.js
'use client';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastProvider = ({ children }) => (
  <>
    {children}
    <ToastContainer />
  </>
);

export default ToastProvider;
