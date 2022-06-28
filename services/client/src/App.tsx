import React from 'react';
import Header from './components/header/Header';
import { useMediaQuery } from 'react-responsive';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Home, Redeem, AddHypePool, Profile } from './pages';
import styled from 'styled-components';
import { ModalsCenter } from './containers/modals';
import { HypeThemeType } from './theme';
import useWallet from './hooks/useWallet';

const StyledAppContainer = styled.div<{ theme: HypeThemeType }>`
  flex: 1 0 auto;
  background: ${({ theme }) => theme.colors.greys[1]};
  border-radius: 2rem;
  margin: 1.5rem auto;
  width: ${({ theme }) => theme.breakpoints.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin: 2rem 1rem 1rem 2rem;
    width: unset;
  }
`;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Root = () => {
  const isMobile = useMediaQuery({ query: `(max-width: 950px)` });
  const { account, connect, isConnected } = useWallet();

  return (
    <AppWrapper>
      <Header
        variant={isMobile ? 'mobile' : 'desktop'}
        connected={isConnected}
        account={account}
        onConnect={connect}
        children={null}
      />
      <StyledAppContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pool" element={<AddHypePool />} />
          <Route path="/redeem" element={<Redeem />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ModalsCenter />
      </StyledAppContainer>
    </AppWrapper>
  );
};

const App = () => <Root />;

export default App;
