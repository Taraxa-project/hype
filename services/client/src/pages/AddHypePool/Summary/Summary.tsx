import { FC } from 'react';
import { HypePoolDetailsForm } from '../DetailsForm';
import { HypePoolRewardForm } from '../RewardForm';
import { Account, BlockiesContainer, PoolContent, RewardContent } from './Summary.styled';
import Text from '../../../components/styles/Text';
import Blockies from 'react-blockies';
import { useSummaryEffects } from './Summary.effects';
import Button from '../../../components/button/Button';
import Box from '../../../components/styles/Box';
import { FormColumn, Label, FormAction } from '../AddHypePool.styled';
import TitleText from '../../../components/titletext/TitleText';
import { networks } from '../../../utils';
import { LeaderboardBonus } from '../../../components/leaderboard-bonus/LeaderboardBonus';
import { BigNumber, ethers } from 'ethers';

export interface SummaryProps {
  createdPoolIndex: string;
  details: HypePoolDetailsForm;
  rewards: HypePoolRewardForm;
  successCallbackActivatePool: () => void;
  isCustomToken: boolean;
}

export const Summary: FC<SummaryProps> = ({
  details,
  rewards,
  createdPoolIndex,
  successCallbackActivatePool,
  isCustomToken,
}) => {
  const { fund, activate, isDeposited, account, authenticated } = useSummaryEffects(
    createdPoolIndex,
    successCallbackActivatePool,
    rewards,
    isCustomToken,
  );
  const leaderRewards: BigNumber[] = [];
  if (rewards.leaderRewards?.length > 0) {
    rewards.leaderRewards.map((leaderReward: { id: number; reward: number }) => {
      let formattedReward = ethers.utils.parseUnits(
        leaderReward.reward.toString().replace(',', '.'),
        rewards.tokenDecimals,
      );
      leaderRewards.push(formattedReward);
    });
  }

  return (
    <>
      {!isDeposited ? (
        <FormColumn>
          <TitleText>You're all set! Check submitted data:</TitleText>
          <PoolContent>
            <Text pt={4} fontSize="1.25rem" fontWeight="700" color="black">
              Taraxa's Hype App Launch!
            </Text>

            <Text pt={3} fontSize="0.875rem" fontWeight="700" color="greys.7">
              Creator
            </Text>
            <BlockiesContainer>
              <Blockies seed={account} />
              <Account>{account}</Account>
            </BlockiesContainer>

            <Text fontSize="0.875rem" fontWeight="700" color="greys.7">
              Hype pool tile:
            </Text>
            <Text fontSize="0.875rem" color="greys.7">
              {details.title}
            </Text>
            <Text fontSize="0.875rem" fontWeight="700" color="greys.7">
              Project name:
            </Text>
            <Text fontSize="0.875rem" color="greys.7">
              {details.projectName}
            </Text>
            <Text fontSize="0.875rem" fontWeight="700" color="greys.7">
              Token name:
            </Text>
            <Text fontSize="0.875rem" color="greys.7">
              {details.tokenName.toUpperCase()}
            </Text>
            <Text fontSize="0.875rem" fontWeight="700" color="greys.7">
              Brief project description:
            </Text>
            <Text fontSize="0.875rem" color="greys.7">
              {details.projectDescription}
            </Text>
            <Text fontSize="0.875rem" fontWeight="700" color="greys.7">
              What are you hyping:
            </Text>
            <Text fontSize="0.875rem" color="greys.7">
              {details.description}
            </Text>

            <Text fontSize="0.875rem" fontWeight="700" color="greys.7">
              Campaign word:
            </Text>
            <Text pb={3} fontSize="0.875rem" color="greys.7">
              {details.campaignWord}
            </Text>

            <RewardContent>
              <Text fontSize="0.875rem" fontWeight="700" color="greys.7">
                Network:
              </Text>
              <Text fontSize="0.875rem" color="greys.7">
                {networks[rewards.network].chainName}
              </Text>
            </RewardContent>
            <RewardContent>
              <Text fontSize="0.875rem" fontWeight="700" color="greys.7">
                Token:
              </Text>
              <Text fontSize="0.875rem" color="greys.7">
                {rewards.tokenSymbol}
              </Text>
            </RewardContent>
            <RewardContent>
              <Text fontSize="0.875rem" fontWeight="700" color="greys.7">
                Token decimals:
              </Text>
              <Text fontSize="0.875rem" color="greys.7">
                {rewards.tokenDecimals}
              </Text>
            </RewardContent>
            {rewards.tokenAddress &&
              rewards.tokenAddress !== '0x0000000000000000000000000000000000000000' && (
                <>
                  <Text fontSize="0.875rem" fontWeight="700" color="greys.7">
                    Token contract address:
                  </Text>
                  <BlockiesContainer>
                    <Blockies seed={rewards.tokenAddress} />
                    <Account>{rewards.tokenAddress}</Account>
                  </BlockiesContainer>
                </>
              )}
            <RewardContent>
              <Text fontSize="0.875rem" fontWeight="700" color="greys.7">
                Reward per 1,000 impressions:
              </Text>
              <Text fontSize="0.875rem" color="greys.7">
                {rewards.impressionReward}
              </Text>
            </RewardContent>
            <RewardContent>
              <Text fontSize="0.875rem" fontWeight="700" color="greys.7">
                Total rewards for the pool:
              </Text>
              <Text fontSize="0.875rem" color="greys.7">
                {rewards.cap}
              </Text>
            </RewardContent>
            {rewards.duration && (
              <RewardContent>
                <Text fontSize="0.875rem" fontWeight="700" color="greys.7">
                  Duration:
                </Text>
                <Text fontSize="0.875rem" color="greys.7">
                  {rewards.duration} days
                </Text>
              </RewardContent>
            )}
          </PoolContent>

          {leaderRewards?.length > 0 && (
            <LeaderboardBonus
              leaderRewards={leaderRewards}
              tokenDecimals={rewards.tokenDecimals}
              tokenSymbol={rewards.tokenSymbol}
            />
          )}

          <Box display="flex" flexDirection="row" gridGap="0.2rem" alignItems="center">
            <Label>
              Fund {rewards.cap} {rewards.tokenSymbol} into the pool.
            </Label>
          </Box>
          <FormAction>
            <Button disabled={!authenticated} size="full-width" type="submit" onClick={fund}>
              Fund the Pool
            </Button>
          </FormAction>
        </FormColumn>
      ) : (
        <FormColumn>
          <Button
            disabled={!authenticated}
            size="full-width"
            type="submit"
            variant="success"
            onClick={activate}
          >
            Activate the Pool
          </Button>
          <Text pt={4} fontSize="1.25rem" fontWeight="700" color="greys.7">
            You need to activate the pool for participating community members to be rewarded.
          </Text>
          <Text pt={4} fontSize="1.25rem" fontWeight="700" color="greys.7">
            You may activate the pool at any time, but once you activate the pool it cannot be
            deactivated.
          </Text>
        </FormColumn>
      )}
    </>
  );
};
