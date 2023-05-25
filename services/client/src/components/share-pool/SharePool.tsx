import { FC, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { TelegramShareButton, TwitterShareButton } from 'react-share';
import { FormInput, ShareOnButtonContainer, ShareUrl, SocialButton } from './SharePool.styled';
import Button from '../button/Button';
import Box from '../styles/Box';
import Text from '../styles/Text';
import TitleText from '../titletext/TitleText';

export interface SharePoolProps {
  title: string;
  createdPoolIndex: string;
  poolName: string;
}

export const SharePool: FC<SharePoolProps> = ({ title, createdPoolIndex, poolName }) => {
  const poolUrl = `${window.location.href}`;
  const [copyBtnText, setCopyBtnText] = useState<string>('Copy');

  const onCopy = () => {
    setCopyBtnText('✔️');
    setTimeout(() => {
      setCopyBtnText('Copy');
    }, 2000);
  };

  return (
    <Box my={4}>
      <TitleText>{title}</TitleText>
      <ShareUrl>
        <FormInput
          disabled={true}
          placeholder="ERC20 Token address"
          name="tokenAddress"
          style={{ color: '#595959', width: '100%' }}
          value={poolUrl}
        />
        <CopyToClipboard text={poolUrl} onCopy={onCopy}>
          <Button size="regular" type="button" variant="primary">
            <Box width="50px" height="20px">
              {copyBtnText}
            </Box>
          </Button>
        </CopyToClipboard>
      </ShareUrl>
      <ShareOnButtonContainer>
        <Text
          fontWeight="700"
          fontSize="1.25rem"
          color="greys.6"
          lineHeight="26px"
        >
          Share on:
        </Text>
        <TwitterShareButton
          title={`${poolName} is active!`}
          url={poolUrl}
          hashtags={['Hype App', `${poolName}`]}
        >
          <SocialButton>Twitter</SocialButton>
        </TwitterShareButton>
        <TelegramShareButton title={`${poolName} is active!`} url={poolUrl}>
          <SocialButton>Telegram</SocialButton>
        </TelegramShareButton>
      </ShareOnButtonContainer>
    </Box>
  );
};
