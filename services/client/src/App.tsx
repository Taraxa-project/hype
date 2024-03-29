import Header from './components/header/Header';
import { Route, Routes, Navigate } from 'react-router-dom';
import {
  Home,
  Redeem,
  AddHypePool,
  Profile,
  PoolDetails,
  Participate,
  Group,
  TC,
  PrivacyPolicy,
} from './pages';
import styled from 'styled-components';
import { ModalsCenter } from './containers/modals';
import { HypeThemeType } from './theme';
import useWallet from './hooks/useWallet';
import { useAuth, useAxiosInterceptors } from './hooks';
import { useGetMe } from './api/auth/useGetMe';
import ScrollToTop from './components/scrollToTop/ScrollToTop';
import Footer from './components/footer/Footer';

const StyledAppContainer = styled.div<{ theme: HypeThemeType }>`
  flex: 1 0 auto;
  margin: 1.5rem auto;
  margin-top: 6.5rem;
  width: ${({ theme }) => `calc(${theme.breakpoints.lg} - 30px)`};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin: 0 auto;
    margin-top: 6.5rem;
    width: unset;
    width: calc(100% - 4rem);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin: 0 auto;
    margin-top: 5.5rem;
    width: calc(100% - 2rem);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin: 0 auto;
    margin-top: 5.5rem;
    width: calc(100% - 1.5rem);
  }
`;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Root = () => {
  const { account, connect, isConnected } = useWallet();
  const { logout, authenticated, isSignatureLoading } = useAuth();
  useAxiosInterceptors(logout);
  useGetMe();

  return (
    <AppWrapper>
      <Header
        connected={isConnected}
        authenticated={authenticated}
        account={account}
        onConnect={connect}
        connectionLoading={isSignatureLoading}
      />
      <ScrollToTop />
      <StyledAppContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/participate" element={<Participate />} />
          <Route path="/pool" element={<AddHypePool />} />
          <Route path="/pool/:poolId" element={<PoolDetails />} />
          <Route path="/redeem" element={<Redeem />} />
          <Route path="/group" element={<Group />} />
          <Route path="/profile" element={isConnected && authenticated ? <Profile /> : <Home />} />
          <Route path="/terms-and-conditions" element={<TC />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ModalsCenter />
      </StyledAppContainer>
      <Footer />
    </AppWrapper>
  );
};

const App = () => <Root />;

export default App;
