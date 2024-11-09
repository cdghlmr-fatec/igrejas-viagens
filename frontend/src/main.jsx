import React from 'react';
import ReactDOM from 'react-dom/client';
import Rotas from './rotas';
import { AuthProvider } from './context/AuthContext';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
      <AuthProvider>
            <Rotas />
      </AuthProvider>
);
