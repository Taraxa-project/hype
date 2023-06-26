import { FC } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { TelegramShareButton, TwitterShareButton } from 'react-share';
import Tippy from '@tippyjs/react';
import { ShareOnButtonContainer } from './SharePool.styled';
import Text from '../styles/Text';
import LinkIcon from '../../assets/icons/Link';
import TelegramIcon from '../../assets/icons/TelegramIcon';
import TwitterIcon from '../../assets/icons/TwitterIcon';

export interface SharePoolProps {
  createdPoolIndex: string;
  poolName: string;
}

const createPoolUrl = (poolIndex: string) => {
  const currentDomain = window.location.host;
  let url = `https://${currentDomain}/pool/`;
  if (poolIndex) {
    url += poolIndex;
  }
  return url;
};

export const SharePool: FC<SharePoolProps> = ({ createdPoolIndex, poolName }) => {
  const poolUrl = createPoolUrl(createdPoolIndex);

  return (
    <ShareOnButtonContainer>
      <Text fontWeight="500" fontSize="1.25rem" color="greys.6" lineHeight="26px">
        Share:
      </Text>
      <Tippy content={'Twitter'}>
        <TwitterShareButton
          title={`${poolName} is active!`}
          url={poolUrl}
          hashtags={['Hype App', `${poolName}`]}
        >
          <TwitterIcon />
        </TwitterShareButton>
      </Tippy>
      <Tippy content={'Telegram'}>
        <TelegramShareButton title={`${poolName} is active!`} url={poolUrl}>
          <TelegramIcon />
        </TelegramShareButton>
      </Tippy>
      <CopyToClipboard text={poolUrl}>
        <Tippy content={'Copy link'}>
          <div style={{ cursor: 'pointer' }}>
            <LinkIcon />
          </div>
        </Tippy>
      </CopyToClipboard>
    </ShareOnButtonContainer>
  );
};
