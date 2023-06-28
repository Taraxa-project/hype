import styled from 'styled-components';
import Text from '../../components/styles/Text';
import { HypePool, RewardsDetails } from '../../models';
import CrownIcon from '../../assets/icons/Crown';
import Box from '../../components/styles/Box';
import { useTokenDetails } from '../../hooks';
import { transformFromWei } from '../../utils';
import { BigNumber } from 'ethers';

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const StyledRow = styled.tr``;

const StyledCell = styled.td`
  padding: 10px;
  text-align: left;
`;

interface ImpressionsListProps {
  impressions: RewardsDetails[];
  pool: HypePool;
}

interface GroupedImpressions {
  telegramGroup: string;
  totalImpressions: number;
  totalRewards: BigNumber;
}

export const ImpressionsList = ({ impressions, pool }: ImpressionsListProps) => {
  const { tokenDecimals, tokenSymbol } = useTokenDetails(pool);

  const groupedImpressions: GroupedImpressions[] = Object.values(
    impressions.reduce((result: { [group: string]: GroupedImpressions }, item: RewardsDetails) => {
      const { telegramGroup, impressions, rewards } = item;
      const impressionsNumber = parseFloat(impressions);
      const rewardsBigNumber = BigNumber.from(rewards);
      if (result.hasOwnProperty(telegramGroup)) {
        result[telegramGroup].totalImpressions += impressionsNumber;
        result[telegramGroup].totalRewards =
          result[telegramGroup].totalRewards.add(rewardsBigNumber);
      } else {
        result[telegramGroup] = {
          telegramGroup,
          totalImpressions: impressionsNumber,
          totalRewards: rewardsBigNumber,
        };
      }
      return result;
    }, {}),
  );

  return (
    <StyledTable>
      <thead>
        <StyledRow>
          <StyledCell>
            <Text fontWeight="700" fontSize="1rem">
              Group ID
            </Text>
          </StyledCell>
          <StyledCell>
            <Text fontWeight="700" fontSize="1rem">
              # Impressions
            </Text>
          </StyledCell>
          <StyledCell>
            <Text fontWeight="700" fontSize="1rem">
              Rewards earned
            </Text>
          </StyledCell>
        </StyledRow>
      </thead>
      <tbody>
        {/* <StyledRow>
          <StyledCell>
            <Box display="flex" alignItems="center">
              <CrownIcon />{' '}
              <Text fontWeight="400" fontSize="1rem" pl={3}>
                Leaderboard BONUS!
              </Text>
            </Box>
          </StyledCell>
          <StyledCell></StyledCell>
          <StyledCell>2000 TARA</StyledCell>
        </StyledRow> */}
        {groupedImpressions?.map((item) => (
          <StyledRow key={`${item.telegramGroup}-${item.totalImpressions}`}>
            <StyledCell>
              <Text fontWeight="400" fontSize="1rem">
                @{item.telegramGroup}
              </Text>
            </StyledCell>
            <StyledCell>
              <Text fontWeight="400" fontSize="1rem">
                {item.totalImpressions?.toFixed(2)}
              </Text>
            </StyledCell>
            <StyledCell>
              <Text fontWeight="400" fontSize="1rem">
                {Number(transformFromWei(item.totalRewards.toString(), tokenDecimals)).toFixed(2)}{' '}
                {tokenSymbol}
              </Text>
            </StyledCell>
          </StyledRow>
        ))}
      </tbody>
    </StyledTable>
  );
};
