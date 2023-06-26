import { FC, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { TelegramShareButton, TwitterShareButton } from 'react-share';
import Tippy from '@tippyjs/react';
import { ShareOnButtonContainer } from './SharePool.styled';
import Text from '../styles/Text';
import LinkIcon from '../../assets/icons/Link';
import TelegramIcon from '../../assets/icons/TelegramIcon';
import TwitterIcon from '../../assets/icons/TwitterIcon';
import Box from '../styles/Box';
import CheckMarkIcon from '../../assets/icons/Check';

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
  const [isCopied, setIsCopied] = useState(false);

  const onCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

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
      <Tippy content={'Copy link'}>
        <Box>
          <CopyToClipboard text={poolUrl} onCopy={onCopy}>
            <Box style={{ cursor: 'pointer' }}>
              <LinkIcon />
            </Box>
          </CopyToClipboard>
        </Box>
      </Tippy>

      {isCopied ? (
        <CheckMarkIcon width="20" height="20" color="#3E7E5C" />
      ) : (
        <Box width="20px"></Box>
      )}
    </ShareOnButtonContainer>
  );
};
