import React from 'react';
import './App.css';
import Header from './components/header/Header';
import { useMediaQuery } from 'react-responsive';
import useMetamask from './hooks/useMetamask';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MetaMaskProvider } from 'metamask-react';
import Home from './pages/Home/Home';
import AddHypePool from './pages/AddHypePool/AddHypePool';
import styled from 'styled-components';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Container = styled.div`
  flex: 1 0 auto;
  background: #fafafa;
  border-radius: 2rem;
  margin: 1.5rem 2rem 1.5rem;
`;

function Root() {
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  const { status, connect, account } = useMetamask();

  return (
    <AppWrapper>
      <Router>
        <Header
          variant={isMobile ? 'mobile' : 'desktop'}
          status={status === 'initializing' || status === 'connecting' ? 'notConnected' : status}
          account={account}
          onConnect={connect}
          children={null}
        />
        <Container>
          <Switch>
            <Route path="/add-hype-pool" component={AddHypePool} />
            <Route exact path="/" component={Home} />
          </Switch>
        </Container>
      </Router>
    </AppWrapper>
  );
}

function App() {
  return (
    <MetaMaskProvider>
      <Root />
    </MetaMaskProvider>
  );
}

export default App;
