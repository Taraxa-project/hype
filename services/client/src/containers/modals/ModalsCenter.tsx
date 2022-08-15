import { CardDetails } from './card-details';
import { DisconnectTelegram } from './disconnect-telegram';
import { LoadingModal } from './loading';
import { MetamaskInfo } from './metamask-info';
import { TelegramInfo } from './telegram-info';
import { Notification } from './notification';
import { PoolCreated } from './pool-created';

export const ModalsCenter = () => {
  return (
    <>
      <CardDetails />
      <LoadingModal />
      <MetamaskInfo />
      <TelegramInfo />
      <DisconnectTelegram />
      <Notification />
      <PoolCreated />
    </>
  );
};
