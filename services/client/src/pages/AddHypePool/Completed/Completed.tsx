import { FC } from 'react';
import Text from '../../../components/styles/Text';
import TitleText from '../../../components/titletext/TitleText';
import Box from '../../../components/styles/Box';
import { Link } from '../../../components/styles/Link';
import { getExplorerFromNetwork } from '../../../utils';
import { SharePool } from '../../../components/share-pool/SharePool';

export interface CompletedProps {
  createdPoolIndex: string;
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
  const { text, href } = getExplorerFromNetwork(Number(network), transaction);

  return (
    <Box width={'100%'}>
      <Text fontWeight="700" fontSize="2rem" lineHeight="26px">
        {poolName} is active!
      </Text>
      <Box pb={4}>
        {text && href && (
          <Box display="flex">
            <Text fontSize="1rem" fontWeight="500" color="greys.7">
              View your transaction on
              <Link target="_blank" text={text} href={href} />
            </Text>
          </Box>
        )}
      </Box>
      <Text fontWeight="700" fontSize="2rem" lineHeight="26px">
        Hype your Hype Pool!
      </Text>
      <SharePool createdPoolIndex={createdPoolIndex} poolName={poolName} />
    </Box>
  );
};
