import React from 'react';
import Header from './components/header/Header';
import { useMediaQuery } from 'react-responsive';
import { shortenAddress, useEthers } from '@usedapp/core';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Home, Redeem, AddHypePool } from './pages';
import styled from 'styled-components';
import { ModalsCenter } from './containers/modals';
import { HypeThemeType } from './theme';

const StyledAppContainer = styled.div<{ theme: HypeThemeType }>`
  flex: 1 0 auto;
  background: ${({ theme }) => theme.colors.greys[1]};
  border-radius: 2rem;
  margin: 1.5rem 2rem 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin: 2rem 1rem;
  }
`;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Root = () => {
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  const { account, activateBrowserWallet } = useEthers();
  const isConnected = account !== undefined;

  return (
    <AppWrapper>
      <Header
        variant={isMobile ? 'mobile' : 'desktop'}
        status={isConnected ? 'notConnected' : 'connected'}
        account={account}
        onConnect={activateBrowserWallet}
        children={null}
      />
      <StyledAppContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pool" element={<AddHypePool />} />
          <Route path="/redeem" element={<Redeem />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ModalsCenter />
      </StyledAppContainer>
    </AppWrapper>
  );
};

const App = () => <Root />;

export default App;
