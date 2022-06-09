import React from 'react';

import HamburgerMenuIcon from '../../assets/icons/HambugerMenu';
import { HypeIconSmall } from '../../assets/icons/HypeIcon';
import Button from '../button/Button';
import { HeaderValues, useHeaderEffects } from './Header.effects';
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
} from './Header.styled';

const Header = React.memo(
  ({
    children,
    variant,
    headerElements,
    status,
    onConnect,
    account,
  }: {
    children: React.ReactNode;
    variant: 'mobile' | 'desktop';
    headerElements?: HeaderValues[];
    status: 'connected' | 'notConnected' | 'unavailable';
    onConnect: () => void;
    account?: string | null;
  }) => {
    const {
      onSelect,
      getShortAddress,
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
                {status !== 'notConnected' && (
                  <Account>
                    {status === 'connected' && (
                      <>
                        <GreenDot />
                        {getShortAddress(account)}
                      </>
                    )}
                    {status === 'unavailable' && 'Metamask is not available.'}
                  </Account>
                )}
              </SidebarHeader>
              <SidebarMenu>
                {headerEntries.map((e: HeaderValues) => (
                  <SidebarMenuLink
                    key={`menu-link-${e}-${Date.now()}`}
                    selected={e === selected}
                    onClick={() => onSelect(e)}
                  >
                    {e}
                  </SidebarMenuLink>
                ))}
              </SidebarMenu>
              <SidebarFooter>
                {status === 'notConnected' && (
                  <Button size="regular" onClick={onConnect}>
                    Connect Wallet
                  </Button>
                )}
              </SidebarFooter>
            </Sidebar>
          </SidebarHover>
        )}
        <StyledHeader variant={variant || isMobile ? 'mobile' : 'desktop'}>
          <div className="headerLeft">
            <HypeIconSmall />
          </div>

          <div className="headerRight">
            {variant === 'mobile' ? (
              status === 'connected' ? (
                <>
                  {' '}
                  <Account className="margin-right">
                    <GreenDot />
                    {getShortAddress(account)}
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
              <>
                {headerEntries.map((e: HeaderValues) =>
                  e === selected ? (
                    <span key={`menu-link-${e}-${Date.now()}`} className="selected">
                      + {e}
                      <p className="underline" />
                    </span>
                  ) : (
                    <span key={`menu-link-${e}-${Date.now()}`} onClick={() => onSelect(e)}>
                      {e}
                    </span>
                  ),
                )}
                {status === 'notConnected' ? (
                  <Button size="regular" onClick={onConnect}>
                    Connect Wallet
                  </Button>
                ) : status === 'connected' ? (
                  <Account>
                    <GreenDot />
                    {account}
                  </Account>
                ) : (
                  <Account>Metamask is not available.</Account>
                )}
              </>
            )}
          </div>
          {children}
        </StyledHeader>
      </>
    );
  },
);

export default Header;
