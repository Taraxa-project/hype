import { FC } from 'react';
import { StyledTable, StyledRow, StyledCell, TableContainer } from './Leaderboard.styled';
import { Leaderboard as TopTelegramAccounts } from '../../models';
import Text from '../styles/Text';

interface LeaderboardProps {
  topAccounts: TopTelegramAccounts[];
}

export const Leaderboard: FC<LeaderboardProps> = ({ topAccounts }) => {
  const showRankIcon = (rank: number) => {
    switch (Number(rank)) {
      case 1:
        return `1️⃣`;
      case 2:
        return `2️⃣`;
      case 3:
        return `3️⃣`;
      default:
        return `${rank}`;
    }
  };
  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <StyledRow>
            <StyledCell>
              <Text fontWeight="700" fontSize="1.25rem">
                Rank
              </Text>
            </StyledCell>
            <StyledCell>
              <Text fontWeight="700" fontSize="1.25rem">
                Hyper TG Name / ID
              </Text>
            </StyledCell>
            <StyledCell>
              <Text fontWeight="700" fontSize="1.25rem">
                Impressions generated
              </Text>
            </StyledCell>
          </StyledRow>
        </thead>
        <tbody>
          {topAccounts.map((item) => (
            <StyledRow key={item.rank}>
              <StyledCell width="25%">
                <Text fontWeight="500" fontSize="1rem">
                  {showRankIcon(item.rank)}
                </Text>
              </StyledCell>
              <StyledCell width="50%">
                <Text fontWeight="500" fontSize="1rem">
                  {item.telegramUsername}
                </Text>
              </StyledCell>
              <StyledCell width="25%">
                <Text fontWeight="500" fontSize="1rem">
                  {Number(item.totalImpressions).toFixed(1)}
                </Text>
              </StyledCell>
            </StyledRow>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};
