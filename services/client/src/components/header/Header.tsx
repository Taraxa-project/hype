import React from 'react';
import { Link } from 'react-router-dom';

import HamburgerMenuIcon from '../../assets/icons/HamburgerMenu';
import { HypeIconSmall } from '../../assets/icons/HypeIcon';
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
} from './Header.styled';

const Header = React.memo(
  ({
    children,
    variant,
    headerElements,
    connected,
    onConnect,
    account,
  }: {
    children: React.ReactNode;
    variant: 'mobile' | 'desktop';
    headerElements?: HeaderLink[];
    connected: boolean;
    onConnect: () => void;
    account?: string | null;
  }) => {
    const {
      onSelect,
      onMenuOpen,
      onSidebarClick,
      onHoverClick,
      headerEntries,
      isMobile,
      menuOpen,
      selected,
    } = useHeaderEffects(headerElements);

    return (
      <>
        {(variant === 'mobile' || isMobile) && (
          <SidebarHover onClick={onHoverClick} show={menuOpen}>
            <Sidebar onClick={onSidebarClick} show={menuOpen}>
              <SidebarHeader>
                <MenuButton onClick={onMenuOpen}>
                  <HamburgerMenuIcon />
                </MenuButton>
                {connected && (
                  <Account>
                    <>
                      <GreenDot />
                      {shortenAddress(account)}
                    </>
                  </Account>
                )}
              </SidebarHeader>
              <SidebarMenu>
                {headerEntries.map((e: HeaderLink) => (
                  <SidebarMenuLink
                    key={`menu-link-${e.name}-${Date.now()}`}
                    selected={e.name === selected}
                    onClick={() => onSelect(e)}
                  >
                    {e.name}
                  </SidebarMenuLink>
                ))}
              </SidebarMenu>
              <SidebarFooter>{!connected && <ConnectWalletBtn size="regular" />}</SidebarFooter>
            </Sidebar>
          </SidebarHover>
        )}
        <StyledHeader variant={variant || isMobile ? 'mobile' : 'desktop'}>
          <div>
            <div className="header-left">
              <Link to="/">
                <HypeIconSmall />
              </Link>
            </div>

            <div className="header-right">
              {variant === 'mobile' ? (
                connected ? (
                  <>
                    {' '}
                    <Account className="margin-right">
                      <GreenDot />
                      {shortenAddress(account)}
                    </Account>
                    <MenuButton onClick={onMenuOpen}>
                      <HamburgerMenuIcon />
                    </MenuButton>
                  </>
                ) : (
                  <MenuButton onClick={onMenuOpen}>
                    <HamburgerMenuIcon />
                  </MenuButton>
                )
              ) : (
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  gridGap={{ sm: '0.5rem', md: '2rem', lg: '2.5rem', xl: '2.5rem' }}
                >
                  {headerEntries.map((e: HeaderLink) =>
                    e.name === selected ? (
                      <span key={`menu-link-${e.name}-${Date.now()}`} className="selected">
                        {e.name}
                        <p className="underline" />
                      </span>
                    ) : (
                      <span key={`menu-link-${e.name}-${Date.now()}`} onClick={() => onSelect(e)}>
                        {e.name}
                      </span>
                    ),
                  )}
                  {!connected ? (
                    <ConnectWalletBtn size="regular" />
                  ) : (
                    <Account>
                      <GreenDot />
                      <AddressContainer address={account} shortAddress={shortenAddress(account)} />
                    </Account>
                  )}
                </Box>
              )}
            </div>
          </div>
        </StyledHeader>
      </>
    );
  },
);

export default Header;
