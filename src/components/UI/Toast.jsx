// src/components/UI/Toast.jsx
import React, { useEffect, useState } from 'react';
import './Toast.css';

const Toast = ({ type = 'info', message, duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  useEffect(() => {
    if (!isVisible) {
      // Add a small delay to allow for animation
      const timer = setTimeout(() => {
        onClose && onClose();
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <div className={`toast ${type} ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="toast-message">{message}</div>
      <button className="toast-close" onClick={handleClose}>×</button>
    </div>
  );
};

export default Toast;