import React from 'react';
import { Link } from 'react-router-dom';
import Megaphone from '../../assets/images/megaphone.png';
import Image from '../../components/image/Image';

import HamburgerMenuIcon from '../../assets/icons/HamburgerMenu';
import { shortenAddress } from '../../utils';
import { ConnectWalletBtn } from '../connect-wallet-btn/ConnectWalletBtn';
import Box from '../styles/Box';
import { HeaderLink, useHeaderEffects } from './Header.effects';
import {
  SidebarHover,
  Sidebar,
  SidebarHeader,
  MenuButton,
  Account,
  GreenDot,
  SidebarMenu,
  SidebarMenuLink,
  SidebarFooter,
  StyledHeader,
  AddressContainer,
  Logo,
  AccountContainer,
} from './Header.styled';
import LoadingSpinner from '../../assets/icons/Spinner';
import Text from '../styles/Text';
import { LogoText } from '../../pages/Home/Home.styled';

export interface HeaderProps {
  headerElements?: HeaderLink[];
  connected: boolean;
  authenticated: boolean;
  onConnect: () => void;
  account?: string | null;
  connectionLoading?: boolean;
}

const Header = React.memo(
  ({ headerElements, connected, authenticated, account, connectionLoading }: HeaderProps) => {
    const {
      onSelect,
      onMenuOpen,
      onSidebarClick,
      onHoverClick,
      headerEntries,
      menuOpen,
      selected,
      chain,
    } = useHeaderEffects(authenticated, headerElements);

    return (
      <>
        <SidebarHover onClick={onHoverClick} show={menuOpen}>
          <Sidebar onClick={onSidebarClick} show={menuOpen}>
            <SidebarHeader>
              <MenuButton onClick={onMenuOpen}>
                <HamburgerMenuIcon />
              </MenuButton>
              {connected && (
                <Account>
                  <Box display="flex" alignItems="center">
                    <GreenDot />
                    {shortenAddress(account)}
                  </Box>
                </Account>
              )}
            </SidebarHeader>
            <SidebarMenu>
              {headerEntries.map(
                (e: HeaderLink) =>
                  e.display && (
                    <SidebarMenuLink
                      key={`menu-link-${e.name}-${Date.now()}`}
                      selected={e.name === selected}
                      onClick={() => onSelect(e)}
                    >
                      {e.name}
                    </SidebarMenuLink>
                  ),
              )}
            </SidebarMenu>
            <SidebarFooter>{!connected && <ConnectWalletBtn size="full-width" />}</SidebarFooter>
          </Sidebar>
        </SidebarHover>
        <StyledHeader>
          <div>
            <div className="header-left">
              <Link to="/" style={{ textDecoration: 'none', display: 'flex' }}>
                <Logo>
                  <Image src={Megaphone} alt="Megaphone" width="50px" />
                  <Box display={{ _: 'none', xs: 'flex' }}>
                    <LogoText style={{ margin: '0 0 0 1rem' }}>Hype</LogoText>
                  </Box>
                </Logo>
              </Link>
            </div>

            <div className="header-right">
              <Box display={{ _: 'flex', sm: 'flex', md: 'none' }} m="0">
                {connected ? (
                  <>
                    <Box display="flex" alignItems="center">
                      {connectionLoading ? (
                        <Box
                          display="flex"
                          flex="1  1 auto"
                          alignItems="center"
                          justifyContent="center"
                          mr="2rem"
                        >
                          <LoadingSpinner />
                        </Box>
                      ) : (
                        <AccountContainer className="margin-right">
                          {chain && (
                            <Text>
                              Connected to <strong>{chain.name}</strong>
                            </Text>
                          )}
                          <Account>
                            <GreenDot />
                            {shortenAddress(account)}
                          </Account>
                        </AccountContainer>
                      )}
                    </Box>
                    <MenuButton onClick={onMenuOpen}>
                      <HamburgerMenuIcon />
                    </MenuButton>
                  </>
                ) : (
                  <MenuButton onClick={onMenuOpen}>
                    <HamburgerMenuIcon />
                  </MenuButton>
                )}
              </Box>
              <Box
                display={{ _: 'none', sm: 'none', md: 'flex' }}
                flexDirection="row"
                alignItems="center"
                gridGap={{ sm: '0.5rem', md: '2rem', lg: '2.5rem', xl: '2.5rem' }}
              >
                {headerEntries.map(
                  (e: HeaderLink) =>
                    e.display && (
                      <Box key={`menu-link-${e.name}-${Date.now()}`}>
                        {e.name === selected ? (
                          <span className="selected">
                            {e.name}
                            <p className="underline" />
                          </span>
                        ) : (
                          <span onClick={() => onSelect(e)}>{e.name}</span>
                        )}
                      </Box>
                    ),
                )}
                {!connected ? (
                  <ConnectWalletBtn size="regular" />
                ) : connectionLoading ? (
                  <Box
                    display="flex"
                    flex="1  1 auto"
                    alignItems="center"
                    justifyContent="center"
                    mr="2rem"
                  >
                    <LoadingSpinner />
                  </Box>
                ) : (
                  <AccountContainer className="margin-right">
                    {chain && (
                      <Text>
                        Connected to <strong>{chain.name}</strong>
                      </Text>
                    )}
                    <Account>
                      <GreenDot />
                      <AddressContainer address={account} shortAddress={shortenAddress(account)} />
                    </Account>
                  </AccountContainer>
                )}
              </Box>
            </div>
          </div>
        </StyledHeader>
      </>
    );
  },
);

export default Header;
