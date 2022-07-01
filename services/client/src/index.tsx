import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { HypeThemeProvider } from './theme/HypeTheme';
import { ModalsProvider } from './context';
import { WagmiConfig, createClient } from 'wagmi';
import { QueryClientProvider, QueryClient } from 'react-query';

const client = createClient({
  autoConnect: true,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: (error) => {
        console.error(error);
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <HypeThemeProvider>
      <WagmiConfig client={client}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <ModalsProvider>
              <App />
            </ModalsProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </WagmiConfig>
    </HypeThemeProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
