import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { worker } from './mocks/browsers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
if (process.env.NODE_ENV === 'development') {
  worker.start();
}

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>
);


