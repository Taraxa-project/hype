import React from 'react';
import Header from './components/header/Header';
import { useMediaQuery } from 'react-responsive';
import useMetamask from './hooks/useMetamask';
import { Route, Routes } from 'react-router-dom';
import BackgroundHover from './components/background/HoverBackground.styled';
import { useModal } from './hooks/useModal';
import { Home, Redeem } from './pages';
import styled from 'styled-components';

const StyledAppContainer = styled.div`
  border-radius: 2rem;
  margin: 1.5rem 2rem 1.5rem;
  min-height: 100vh;
`;

const Root = () => {
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  const { status, connect, account } = useMetamask();
  const { isOpen } = useModal();
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
        <BackgroundHover show={isOpen} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/redeem" element={<Redeem />} />
        </Routes>
      </StyledAppContainer>
    </div>
  );
};

const App = () => <Root />;

export default App;
