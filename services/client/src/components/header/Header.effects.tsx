import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate, useLocation } from 'react-router-dom';

export interface CustomStyledProps {
  variant?: 'mobile' | 'desktop';
}

export interface SidebarProps extends React.HTMLProps<HTMLDivElement> {
  show?: boolean;
}

export interface SidebarMenuLinkProps extends React.HTMLProps<HTMLLIElement> {
  selected?: boolean;
}

export enum HeaderValues {
  HypeFarming = 'Hype Farming',
  HypePool = '+Hype Pool',
  Redeem = 'Redeem',
  None = 'none',
}

export interface HeaderLink {
  route: string;
  name: string;
}

const headerValues: HeaderLink[] = [
  {
    route: '/',
    name: HeaderValues.HypeFarming,
  },
  {
    route: '/pool',
    name: HeaderValues.HypePool,
  },
  {
    route: '/redeem',
    name: HeaderValues.Redeem,
  },
];

export const useHeaderEffects = (headerElements?: HeaderLink[]) => {
  let navigate = useNavigate();
  let location = useLocation();
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<HeaderValues>(
    headerValues.find((value) => value.route === location.pathname).name as HeaderValues,
  );

  useEffect(() => {
    setSelected(
      headerValues.find((value) => value.route === location.pathname).name as HeaderValues,
    );
  }, [location]);

  const onSelect = (e: HeaderLink) => {
    navigate(e.route);
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
    isMobile,
    menuOpen,
    selected,
  };
};
