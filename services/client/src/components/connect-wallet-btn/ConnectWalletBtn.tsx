import { SpaceProps } from 'styled-system';
import Button from '../button/Button';
import Box from '../styles/Box';
import { useConnectWalletEffects } from './ConnectWallet.effects';

export interface ConnectWalletBtnProps {
  size?: 'small' | 'regular' | 'full-width';
}

export const ConnectWalletBtn = ({ ...props }: ConnectWalletBtnProps & SpaceProps) => {
  const { onConnect } = useConnectWalletEffects();

  return (
    <Box {...props}>
      <Button size={props.size || 'full-width'} type="button" onClick={onConnect}>
        Connect Wallet
      </Button>
    </Box>
  );
};
