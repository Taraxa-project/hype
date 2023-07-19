import styled from 'styled-components';
import Text from '../../components/styles/Text';
import { HypePool, RewardsDetails } from '../../models';
import { useTokenDetails } from '../../hooks';
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
  pool: HypePool;
}

export const ImpressionsList = ({ impressions, pool }: ImpressionsListProps) => {
  const { tokenDecimals, tokenSymbol } = useTokenDetails(pool);

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
        {impressions
          ?.sort((x, y) => (x.isBonus === y.isBonus ? 0 : x.isBonus ? -1 : 1))
          .map((item) => (
            <StyledRow key={`${item.telegramGroup}-${item.impressions}`}>
              <StyledCell>
                <Text fontWeight="400" fontSize="1rem">
                  {item.isBonus ? '👑 ' : '@'}
                  {item.telegramGroup}
                </Text>
              </StyledCell>
              <StyledCell>
                <Text fontWeight="400" fontSize="1rem">
                  {Number(item.impressions)?.toFixed(2)}
                </Text>
              </StyledCell>
              <StyledCell>
                <Text fontWeight="400" fontSize="1rem">
                  {Number(transformFromWei(item.rewards.toString(), tokenDecimals)).toFixed(2)}{' '}
                  {tokenSymbol}
                </Text>
              </StyledCell>
            </StyledRow>
          ))}
      </tbody>
    </StyledTable>
  );
};
