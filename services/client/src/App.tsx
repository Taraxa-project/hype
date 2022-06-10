import React from 'react';
import Header from './components/header/Header';
import { useMediaQuery } from 'react-responsive';
import useMetamask from './hooks/useMetamask';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Home, Redeem } from './pages';
import styled from 'styled-components';
import { HypeModalsCenter } from './containers/modals';

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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/redeem" element={<Redeem />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <HypeModalsCenter />
      </StyledAppContainer>
    </div>
  );
};

const App = () => <Root />;

export default App;
