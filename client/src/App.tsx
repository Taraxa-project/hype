import React from 'react';
import Header from './components/header/Header';
import { useMediaQuery } from 'react-responsive';
import useMetamask from './hooks/useMetamask';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MetaMaskProvider } from 'metamask-react';
import Home from './pages/Home/Home';
import Redeem from './pages/Redeem';
import { HypeThemeProvider } from './theme/HypeTheme';
import styled from 'styled-components';

const StyledAppContainer = styled.div`
  border-radius: 2rem;
  margin: 1.5rem 2rem 1.5rem;
  min-height: 100vh;
`;

const Root = () => {
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  const { status, connect, account } = useMetamask();

  return (
    <div className="App">
      <Header
        variant={isMobile ? 'mobile' : 'desktop'}
        status={status === 'initializing' || status === 'connecting' ? 'notConnected' : status}
        account={account}
        onConnect={connect}
        children={null}
      />
      <StyledAppContainer>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/redeem" component={Redeem} />
          </Switch>
        </Router>
      </StyledAppContainer>
    </div>
  );
};

const App = () => (
  <HypeThemeProvider>
    <MetaMaskProvider>
      <Root />
    </MetaMaskProvider>
  </HypeThemeProvider>
);

export default App;
