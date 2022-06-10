import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { HypeThemeProvider } from './theme/HypeTheme';
import { MetaMaskProvider } from 'metamask-react';
import { ModalsProvider } from './context';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <HypeThemeProvider>
        <MetaMaskProvider>
          <ModalsProvider>
            <App />
          </ModalsProvider>
        </MetaMaskProvider>
      </HypeThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
