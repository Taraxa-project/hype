import styled from 'styled-components';
import Text from '../../components/styles/Text';
import { HypePool, RewardsDetails } from '../../models';
import CrownIcon from '../../assets/icons/Crown';
import Box from '../../components/styles/Box';
import { useTokenDecimals } from '../../hooks';
import { transformFromWei } from '../../utils';

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
  symbol: string;
  pool: HypePool;
}

export const ImpressionsList = ({ impressions, symbol, pool }: ImpressionsListProps) => {
  const { tokenDecimals } = useTokenDecimals(pool);
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
        {impressions?.map((item) => (
          <StyledRow key={`${item.telegramGroup}-${item.rewards}`}>
            <StyledCell>
              <Text fontWeight="400" fontSize="1rem">
                @{item.telegramGroup}
              </Text>
            </StyledCell>
            <StyledCell>
              <Text fontWeight="400" fontSize="1rem">
                {item.impressions}
              </Text>
            </StyledCell>
            <StyledCell>
              <Text fontWeight="400" fontSize="1rem">
                {transformFromWei(Number(item.rewards), tokenDecimals)} {symbol}
              </Text>
            </StyledCell>
          </StyledRow>
        ))}
      </tbody>
    </StyledTable>
  );
};
