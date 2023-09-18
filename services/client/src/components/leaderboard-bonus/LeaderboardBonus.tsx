import { BigNumber } from 'ethers';
import Box from '../styles/Box';
import Text from '../styles/Text';
import { prettifyNumber, transformFromWei } from '../../utils';
import Button from '../button/Button';
import { ModalsActionsEnum, useModalsDispatch } from '../../context';

export interface LeaderboardBonusProps {
  leaderRewards: BigNumber[];
  tokenDecimals: number;
  tokenSymbol: string;
}

export const LeaderboardBonus = ({
  leaderRewards,
  tokenDecimals,
  tokenSymbol,
}: LeaderboardBonusProps) => {
  const bonusContent = (
    <Box display="flex" flexDirection="column">
      {leaderRewards?.map((reward, index) => {
        let emoji;
        switch (index) {
          case 0:
            emoji = '1️⃣st';
            break;
          case 1:
            emoji = '2️⃣nd';
            break;
          case 2:
            emoji = '3️⃣rd';
            break;
          default:
            emoji = `${index + 1}th`;
        }

        return (
          <Text
            key={index}
            textAlign="left"
            fontSize="1.2rem"
            fontWeight="500"
            paddingBottom="2rem"
          >
            {emoji} place bonus:{' '}
            {prettifyNumber(Number(transformFromWei(reward.toString(), tokenDecimals)))}{' '}
            {tokenSymbol}
          </Text>
        );
      })}
      <Text textAlign="left" fontSize="1.2rem" fontWeight="500" paddingBottom="2rem">
        Bonuses settled at the end of each week
      </Text>
    </Box>
  );
  const dispatchModals = useModalsDispatch();

  const showBonuses = () => {
    dispatchModals({
      type: ModalsActionsEnum.SHOW_BASIC,
      payload: {
        open: true,
        title: 'Leaderboard bonuses',
        content: bonusContent,
      },
    });
  };

  return (
    <Box display="flex" justifyContent="center" mb={4}>
      <Button type="button" onClick={showBonuses} variant="info">
        Show leaderboard bonuses
      </Button>
    </Box>
  );
};
