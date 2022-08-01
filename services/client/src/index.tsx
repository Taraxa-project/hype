import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { HypeThemeProvider } from './theme/HypeTheme';
import { ModalsProvider } from './context';
import { QueryClientProvider, QueryClient } from 'react-query';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WagmiConfig, createClient, configureChains, defaultChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AuthProvider } from './context/auth-context';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { taraxaChains } from './utils';

const { provider, webSocketProvider } = configureChains(
  [...taraxaChains, ...defaultChains],
  [
    publicProvider(),
    jsonRpcProvider({
      rpc: (network) => ({
        http: `https://rpc.${network?.network}.taraxa.io`,
      }),
    }),
  ],
);

const metamaskConnector = new MetaMaskConnector({
  chains: [...taraxaChains],
  options: {
    shimDisconnect: true,
  },
});

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
  connectors: [metamaskConnector],
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
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
              <AuthProvider>
                <App />
              </AuthProvider>
            </ModalsProvider>
          </BrowserRouter>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </WagmiConfig>
    </HypeThemeProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
