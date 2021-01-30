import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthUserProvider } from './contexts/AuthUserContext';
import { SidebarProvider } from './contexts/SidebarContext';
import { Windmill } from '@windmill/react-ui';
import './styles/main.css';

ReactDOM.render(
  <AuthUserProvider>
    <SidebarProvider>
      <Windmill>
        <App />
      </Windmill>
    </SidebarProvider>
  </AuthUserProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
