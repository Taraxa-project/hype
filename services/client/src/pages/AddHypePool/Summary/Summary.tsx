import { FC } from 'react';
import { HypePoolDetailsForm } from '../DetailsForm';
import { HypePoolRewardForm } from '../RewardForm';
import { Account, BlockiesContainer, PoolContent, RewardContent } from './Summary.styled';
import Text from '../../../components/styles/Text';
import Blockies from 'react-blockies';
import { useSummaryEffects } from './Summary.effects';
import { BigNumber } from 'ethers';
import Button from '../../../components/button/Button';
import Box from '../../../components/styles/Box';
import { FormColumn, Label, FormAction } from '../AddHypePool.styled';
import TitleText from '../../../components/titletext/TitleText';

export interface SummaryProps {
  createdPoolIndex: BigNumber;
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
  const ageString = Math.round(
    (new Date(rewards.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
  );

  return (
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

        {details?.title && (
          <>
            <Text fontSize="0.875rem" fontWeight="700" color="greys.7">
              Hype pool tile:
            </Text>
            <Text fontSize="0.875rem" color="greys.7">
              {details?.title}
            </Text>
          </>
        )}
        {details?.projectName && (
          <>
            <Text fontSize="0.875rem" fontWeight="700" color="greys.7">
              Project name:
            </Text>
            <Text fontSize="0.875rem" color="greys.7">
              {details?.projectName}
            </Text>
          </>
        )}
        {details?.tokenName && (
          <>
            <Text fontSize="0.875rem" fontWeight="700" color="greys.7">
              Token name:
            </Text>
            <Text fontSize="0.875rem" color="greys.7">
              {details?.tokenName?.toUpperCase()}
            </Text>
          </>
        )}
        {details?.projectDescription && (
          <>
            <Text fontSize="0.875rem" fontWeight="700" color="greys.7">
              Brief project description:
            </Text>
            <Text fontSize="0.875rem" color="greys.7">
              {details?.projectDescription}
            </Text>
          </>
        )}
        {details?.description && (
          <>
            <Text fontSize="0.875rem" fontWeight="700" color="greys.7">
              What are you hyping:
            </Text>
            <Text fontSize="0.875rem" color="greys.7">
              {details?.description}
            </Text>
          </>
        )}

        {details?.word && (
          <>
            <Text fontSize="0.875rem" fontWeight="700" color="greys.7">
              Hype word:
            </Text>
            <Text pb={3} fontSize="0.875rem" color="greys.7">
              {details?.word}
            </Text>
          </>
        )}

        {rewards?.network && (
          <RewardContent>
            <Text fontSize="0.875rem" fontWeight="700" color="greys.7">
              Network:
            </Text>
            <Text fontSize="0.875rem" color="greys.7">
              {rewards?.network}
            </Text>
          </RewardContent>
        )}
        {rewards?.tokenName && (
          <RewardContent>
            <Text fontSize="0.875rem" fontWeight="700" color="greys.7">
              Token:
            </Text>
            <Text fontSize="0.875rem" color="greys.7">
              {rewards?.tokenName}
            </Text>
          </RewardContent>
        )}
        {rewards?.tokenDecimals && (
          <RewardContent>
            <Text fontSize="0.875rem" fontWeight="700" color="greys.7">
              Token decimals:
            </Text>
            <Text fontSize="0.875rem" color="greys.7">
              {rewards?.tokenDecimals}
            </Text>
          </RewardContent>
        )}
        {rewards?.tokenAddress && (
          <>
            <Text fontSize="0.875rem" fontWeight="700" color="greys.7">
              Token contract address:
            </Text>

            <BlockiesContainer>
              <Blockies seed={rewards?.tokenAddress} />
              <Account>{rewards?.tokenAddress}</Account>
            </BlockiesContainer>
          </>
        )}
        {rewards?.minReward && (
          <RewardContent>
            <Text fontSize="0.875rem" fontWeight="700" color="greys.7">
              Min reward per winner:
            </Text>
            <Text fontSize="0.875rem" color="greys.7">
              {rewards?.tokenName}
            </Text>
          </RewardContent>
        )}
        {rewards?.impressionReward && (
          <RewardContent>
            <Text fontSize="0.875rem" fontWeight="700" color="greys.7">
              Reward per 1,000 impressions:
            </Text>
            <Text fontSize="0.875rem" color="greys.7">
              {rewards?.impressionReward}
            </Text>
          </RewardContent>
        )}
        {rewards?.cap && (
          <RewardContent>
            <Text fontSize="0.875rem" fontWeight="700" color="greys.7">
              Total rewards for the pool:
            </Text>
            <Text fontSize="0.875rem" color="greys.7">
              {rewards?.cap}
            </Text>
          </RewardContent>
        )}
        {rewards?.endDate && ageString && (
          <RewardContent>
            <Text fontSize="0.875rem" fontWeight="700" color="greys.7">
              Duration:
            </Text>
            <Text fontSize="0.875rem" color="greys.7">
              {ageString}
            </Text>
          </RewardContent>
        )}
      </PoolContent>

      <Box display="flex" flexDirection="row" gridGap="0.2rem" alignItems="center">
        <Label>
          Deposit {rewards.cap} {rewards.tokenName} into the pool.
        </Label>
      </Box>
      <FormAction>
        {!isDeposited ? (
          <Button disabled={!authenticated} size="full-width" type="submit" onClick={fund}>
            Fund the Pool
          </Button>
        ) : (
          <Button disabled={!authenticated} size="full-width" type="submit" onClick={activate}>
            Activate the Pool
          </Button>
        )}
      </FormAction>
    </FormColumn>
  );
};
