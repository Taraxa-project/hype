import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useNetwork } from 'wagmi';

export interface CustomStyledProps {
  variant?: 'mobile' | 'desktop';
}

export interface SidebarProps extends React.HTMLProps<HTMLDivElement> {
  show?: boolean;
}

export interface SidebarMenuLinkProps extends React.HTMLProps<HTMLLIElement> {
  selected?: boolean;
}

export interface AddressContainerProps extends React.HTMLProps<HTMLSpanElement> {
  address: string;
  shortAddress: string;
}

export enum HeaderValues {
  HypeFarming = 'Hype Farming',
  HypePool = '+Hype Pool',
  Redeem = 'Redeem',
  Profile = 'My Account',
  None = 'none',
}

export interface HeaderLink {
  route: string;
  name: string;
  display: boolean;
}

export const useHeaderEffects = (authenticated: boolean, headerElements?: HeaderLink[]) => {
  let navigate = useNavigate();
  let location = useLocation();
  const { chain } = useNetwork();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const headerValues: HeaderLink[] = [
    {
      route: '/',
      name: HeaderValues.HypeFarming,
      display: true,
    },
    {
      route: '/pool',
      name: HeaderValues.HypePool,
      display: true,
    },
    {
      route: '/redeem',
      name: HeaderValues.Redeem,
      display: true,
    },
    {
      route: '/profile',
      name: HeaderValues.Profile,
      display: authenticated,
    },
  ];

  const [selected, setSelected] = useState<HeaderValues>(
    headerValues.find((value) => value.route === location.pathname)?.name as HeaderValues,
  );

  useEffect(() => {
    setSelected(
      headerValues.find((value) => value.route === location.pathname)?.name as HeaderValues,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const onSelect = (e: HeaderLink) => {
    navigate(e.route);
    setMenuOpen(false);
  };

  const getShortAddress = (addr: string | null | undefined): string =>
    addr ? addr.slice(0, 5) + '...' + addr.slice(-4) : '';

  const onMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setMenuOpen(!menuOpen);
  };

  const onSidebarClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  const onHoverClick = (e: React.MouseEvent<HTMLElement>) => {
    setMenuOpen(false);
  };

  const headerEntries: HeaderLink[] = headerElements || headerValues;

  return {
    onSelect,
    getShortAddress,
    onMenuOpen,
    onSidebarClick,
    onHoverClick,
    headerEntries,
    menuOpen,
    selected,
    chain,
  };
};
