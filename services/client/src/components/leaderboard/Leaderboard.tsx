import { FC } from 'react';
import { StyledTable, StyledRow, StyledCell, RankWrapper } from './Leaderboard.styled';
import { Leaderboard as TopTelegramAccounts } from '../../models';
import Text from '../styles/Text';

interface LeaderboardProps {
  topAccounts: TopTelegramAccounts[];
}

export const Leaderboard: FC<LeaderboardProps> = ({ topAccounts }) => {
  return (
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
              Hyper TG Name
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
                <RankWrapper rank={item.rank}>{item.rank}</RankWrapper>
              </Text>
            </StyledCell>
            <StyledCell width="50%">
              <Text fontWeight="500" fontSize="1rem">
                @{item.telegramUsername}
              </Text>
            </StyledCell>
            <StyledCell width="25%">
              <Text fontWeight="500" fontSize="1rem">
                {Number(item.totalimpressions).toFixed(1)}
              </Text>
            </StyledCell>
          </StyledRow>
        ))}
      </tbody>
    </StyledTable>
  );
};
