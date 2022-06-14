import Button from '../button/Button';
import { useConnectWalletEffects } from './ConnectWallet.effects';

export interface ConnectWalletBtnProps {
  size?: 'small' | 'regular' | 'full-width';
}

export const ConnectWalletBtn = ({ size }: ConnectWalletBtnProps) => {
  const { onConnect } = useConnectWalletEffects();

  return (
    <Button size={size || 'full-width'} onClick={onConnect}>
      Connect Wallet
    </Button>
  );
};
