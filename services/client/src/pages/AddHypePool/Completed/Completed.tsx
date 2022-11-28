import { FC, useState } from 'react';
import { BigNumber } from 'ethers';
import { FormColumn, FormInput } from '../AddHypePool.styled';
import Text from '../../../components/styles/Text';
import TitleText from '../../../components/titletext/TitleText';
import Box from '../../../components/styles/Box';
import { Link } from '../../../components/styles/Link';
import { networkOptions } from '../../../utils';
import Button from '../../../components/button/Button';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { TelegramShareButton, TwitterShareButton } from 'react-share';

export interface CompletedProps {
  createdPoolIndex: BigNumber;
  network: number;
  poolName: string;
  transaction: string;
}

export const Completed: FC<CompletedProps> = ({
  createdPoolIndex,
  poolName,
  transaction,
  network,
}) => {
  const poolUrl = `${window.location.href}/${createdPoolIndex}`;
  const [copyBtnText, setCopyBtnText] = useState<string>('Copy');

  const onCopy = () => {
    setCopyBtnText('✔️');
    setTimeout(() => {
      setCopyBtnText('Copy');
    }, 2000);
  };

  return (
    <FormColumn>
      <TitleText>{poolName} is active!</TitleText>
      <Box pb={4}>
        {network === networkOptions[0].value ? (
          <Box display="flex">
            <Text fontSize="1rem" fontWeight="500" color="greys.7" pr={2}>
              View your transaction on
              <Link
                target="_blank"
                text={` Etherscan🌐.`}
                href={`https://etherscan.io/tx/${transaction}`}
              />
            </Text>
          </Box>
        ) : (
          <Box display="flex">
            <Text fontSize="1rem" fontWeight="500" color="greys.7" pr={2}>
              View your transaction on the
              <Link
                target="_blank"
                text={` Taraxa Network Explorer🌐.`}
                href={`https://explorer.devnet.taraxa.io/tx/${transaction}`}
              />
            </Text>
          </Box>
        )}
      </Box>
      <TitleText>Hype your Hype Pool!</TitleText>
      <Box display="flex" gridGap="1rem" mt={2}>
        <FormInput
          disabled={true}
          placeholder="ERC20 Token address"
          name="tokenAddress"
          style={{ color: '#595959', width: '500px' }}
          value={poolUrl}
        />
        <CopyToClipboard text={poolUrl} onCopy={onCopy}>
          <Button size="regular" type="button" variant="primary">
            <Box width="50px" height="20px">
              {copyBtnText}
            </Box>
          </Button>
        </CopyToClipboard>
      </Box>
      <Box display="flex" gridGap="1rem" mt={5}>
        <TwitterShareButton
          title={`${poolName} is active!`}
          url={poolUrl}
          hashtags={['Hype App', `${poolName}`]}
        >
          <Button size="regular" type="button" variant="primary">
            Twitter
          </Button>
        </TwitterShareButton>
        <TelegramShareButton title={`${poolName} is active!`} url={poolUrl}>
          <Button size="regular" type="button" variant="primary">
            Telegram
          </Button>
        </TelegramShareButton>
      </Box>
    </FormColumn>
  );
};
