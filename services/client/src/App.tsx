import React from 'react';
import Header from './components/header/Header';
import { useMediaQuery } from 'react-responsive';
import useMetamask from './hooks/useMetamask';
import { Route, Routes, Navigate } from 'react-router-dom';
import BackgroundHover from './components/background/HoverBackground.styled';
import { useModal } from './hooks/useModal';
import { Home, Redeem, AddHypePool } from './pages';
import styled from 'styled-components';

const StyledAppContainer = styled.div`
  flex: 1 0 auto;
  background: #fafafa;
  border-radius: 2rem;
  margin: 1.5rem 2rem 1.5rem;

  @media (max-width: 1280px) {
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
  const { status, connect, account } = useMetamask();
  const { isOpen } = useModal();
  return (
    <AppWrapper>
      <Header
        variant={isMobile ? 'mobile' : 'desktop'}
        status={status === 'initializing' || status === 'connecting' ? 'notConnected' : status}
        account={account}
        onConnect={connect}
        children={null}
      />
      <StyledAppContainer>
        <BackgroundHover show={isOpen} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pool" element={<AddHypePool />} />
          <Route path="/redeem" element={<Redeem />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </StyledAppContainer>
    </AppWrapper>
  );
};

const App = () => <Root />;

export default App;
