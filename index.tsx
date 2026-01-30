import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

if (container) {
  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error: any) {
    console.error("Failed to mount React application:", error);
    const crashDiv = document.getElementById('crash-screen');
    if (crashDiv) {
      crashDiv.style.display = 'block';
      crashDiv.innerText = "Failed to mount React: " + error.message;
    }
  }
} else {
  console.error("Root element not found");
}