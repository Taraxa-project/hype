import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

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
  HypePool = '+ Hype Pool',
  Redeem = 'Redeem',
  None = 'none',
}

export const useHeaderEffects = (headerElements?: HeaderValues[]) => {
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<HeaderValues>(HeaderValues.HypeFarming);

  const onSelect = (e: HeaderValues) => {
    setSelected(e);
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

  const headerEntries: HeaderValues[] = headerElements || [
    HeaderValues.HypeFarming,
    HeaderValues.HypePool,
    HeaderValues.Redeem,
  ];

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
