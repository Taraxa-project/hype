import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { HypeThemeProvider } from './theme/HypeTheme';
import { ModalsProvider } from './context';
import { QueryClientProvider, QueryClient } from 'react-query';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WagmiConfig, createClient, configureChains, chain, defaultChains } from 'wagmi';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AuthProvider } from './context/auth-context';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { taraxaChains } from './utils';
import { createClient as urqlCreatClient, Provider as UrqlProvider } from 'urql';
import { GRAPHQL_API } from './api/types';

const { provider, webSocketProvider } = configureChains(
  [...defaultChains, ...taraxaChains],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        // http: `https://rpc.${chain?.network}.taraxa.io`,
        http: chain.rpcUrls.default,
      }),
    }),
  ],
);

const metamaskConnector = new MetaMaskConnector({
  chains: [...defaultChains, ...taraxaChains],
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

export const graphQLClient = urqlCreatClient({
  url: GRAPHQL_API,
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <HypeThemeProvider>
      <WagmiConfig client={client}>
        <UrqlProvider value={graphQLClient}>
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
        </UrqlProvider>
      </WagmiConfig>
    </HypeThemeProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
