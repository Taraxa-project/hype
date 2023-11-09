import TitleText from '../../../components/titletext/TitleText';
import Button from '../../../components/button/Button';
import { ConnectWalletBtn } from '../../../components/connect-wallet-btn/ConnectWalletBtn';
import Text from '../../../components/styles/Text';

import {
  FormColumn,
  Example,
  Label,
  FormInput,
  FormAction,
  FormElement,
  FormSelect,
  InfoCard,
} from '../AddHypePool.styled';
import Box from '../../../components/styles/Box';
import { HypePoolRewardForm, useRewardFormEffects } from './RewardForm.effects';

export interface RewardFormProps {
  defaultValues: HypePoolRewardForm;
  onSubmit: (data: HypePoolRewardForm) => void;
  onBack: () => void;
  setIsCustomToken: (val: boolean) => void;
}

export const RewardForm = ({
  defaultValues,
  onSubmit,
  onBack,
  setIsCustomToken,
}: RewardFormProps) => {
  const {
    register,
    handleSubmit,
    errors,
    authenticated,
    networkOptions,
    handleNetworkSelect,
    tokensOptions,
    handleTokenSelect,
    showToken,
    debouncedResults,
    isEthNetwork,
    getValues,
    fields,
    append,
    remove,
  } = useRewardFormEffects(defaultValues, setIsCustomToken);

  const MAX_NO_REWARDS = 3;

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <FormColumn>
        {/* Network */}
        <FormElement>
          <TitleText>How do you want to reward the community?</TitleText>
          <Box display="flex" flexDirection="row" gridGap="0.2rem" alignItems="center">
            <Label>Rewards are on this network:</Label>
          </Box>
          <Example>
            Identify which blockchain network the reward tokens reside on, e.g., Taraxa, Ethereum
          </Example>
          <FormSelect
            disabled={!authenticated}
            name="network"
            {...register('network')}
            onChange={handleNetworkSelect}
          >
            <option disabled defaultValue="" value="">
              Please select your network
            </option>
            {networkOptions.map(
              (option) =>
                option.show && (
                  <option key={`${option.value}-${option.name}`} value={option.value}>
                    {option.name}
                  </option>
                ),
            )}
          </FormSelect>
          {errors.network && (
            <Text color="danger" fontSize="0.8rem">
              {errors.network.message}
            </Text>
          )}
        </FormElement>

        {/* Token */}
        <FormElement>
          <Box display="flex" flexDirection="row" gridGap="0.2rem" alignItems="center">
            <Label>Rewards are in this token:</Label>
          </Box>
          <Example>
            Enter the smart contract address for the reward tokens. Currently Hype supports native
            TARA, ETH, and ERC-20 tokens.
          </Example>
          <FormSelect
            disabled={!authenticated}
            name="token"
            {...register('token')}
            onChange={handleTokenSelect}
          >
            <option disabled defaultValue="" value="">
              Please select your token
            </option>
            {tokensOptions.map((option) => (
              <option
                key={`${option.value}-${option.name}`}
                value={option.name}
                disabled={
                  // if ETH network block only TARA
                  (option.name === tokensOptions[1].name && isEthNetwork) ||
                  // if not ETH network block everything else except TARA
                  (option.name !== tokensOptions[1].name && !isEthNetwork)
                }
              >
                {option.name}
              </option>
            ))}
            {+getValues('network') === networkOptions[0].value}
            {tokensOptions[1].value}
          </FormSelect>
          {errors.token && (
            <Text color="danger" fontSize="0.8rem">
              {errors.token.message}
            </Text>
          )}
        </FormElement>

        {/* Custom token address */}
        {showToken && (
          <FormElement>
            <Box display="flex" flexDirection="row" gridGap="0.2rem" alignItems="center">
              <Label>Address for ERC20 token:</Label>
            </Box>
            <FormInput
              disabled={!authenticated}
              placeholder="ERC20 Token address"
              name="tokenAddress"
              {...register('tokenAddress')}
              onChange={debouncedResults}
            />
            {errors.tokenAddress && (
              <Text color="danger" fontSize="0.8rem">
                {errors.tokenAddress.message}
              </Text>
            )}
          </FormElement>
        )}

        {/* Custom token symbol */}
        {showToken && (
          <FormElement>
            <Box display="flex" flexDirection="row" gridGap="0.2rem" alignItems="center">
              <Label>Name for ERC20 token:</Label>
            </Box>
            <FormInput
              disabled
              placeholder="ERC20 Token name"
              name="tokenSymbol"
              style={{ color: '#595959' }}
              {...register('tokenSymbol')}
            />
            {errors.tokenSymbol && (
              <Text color="danger" fontSize="0.8rem">
                {errors.tokenSymbol.message}
              </Text>
            )}
          </FormElement>
        )}

        {/* Impression Reward */}
        <FormElement>
          <Box display="flex" flexDirection="row" gridGap="0.2rem" alignItems="center">
            <Label>Reward per 1 impression:</Label>
          </Box>
          <Example>
            How much reward to give for every 1 impression (or view) of effective social mentions in
            support of your hype?
          </Example>
          <FormInput
            disabled={!authenticated}
            placeholder="ex: 0.2"
            name="impressionReward"
            {...register('impressionReward')}
          />
          {errors.impressionReward && (
            <Text color="danger" fontSize="0.8rem">
              {errors.impressionReward.message}
            </Text>
          )}
        </FormElement>

        {/* Pool cap */}
        <FormElement>
          <Box display="flex" flexDirection="row" gridGap="0.2rem" alignItems="center">
            <Label>Total rewards for the pool:</Label>
          </Box>
          <Example>
            The total (or maximum) rewards for the pool, this is how much you will need to deposit
            to fully fund and activate the Hype Pool.
          </Example>
          <FormInput
            disabled={!authenticated}
            placeholder="ex: 100,000,000"
            name="cap"
            {...register('cap')}
          />
          {errors.cap && (
            <Text color="danger" fontSize="0.8rem">
              {errors.cap.message}
            </Text>
          )}
        </FormElement>

        {/* Pool duration */}
        <FormElement>
          <Box display="flex" flexDirection="row" gridGap="0.2rem" alignItems="center">
            <Label>Max duration of the pool:</Label>
          </Box>
          <Example>
            Defines how long the Hype Pool will last. At the end of the Hype Pool if rewards have
            not been fully doled out, they’ll be returned.
          </Example>
          <FormInput
            disabled={!authenticated}
            placeholder="ex: 28 days"
            type="number"
            min="1"
            name="duration"
            {...register('duration')}
          />
          {errors.duration && (
            <Text color="danger" fontSize="0.8rem">
              {errors.duration.message}
            </Text>
          )}
        </FormElement>

        {/* Leaderboard bonus */}
        <FormElement>
          <Box display="flex" flexDirection="row" gridGap="0.2rem" alignItems="center">
            <Label>Leaderboard bonus:</Label>
          </Box>
          <Example>
            These are rewards for the top n users you wish to reward and the end of each week. This
            is not required.
          </Example>
          {fields.map((item, index) => (
            <Box
              display="flex"
              flexDirection="row"
              gridGap="0.5rem"
              alignItems="center"
              key={item.id}
              mb={3}
            >
              <Text>#{index + 1}</Text>
              <FormInput
                disabled={!authenticated}
                {...register(`leaderRewards.${index}.reward`)}
                defaultValue={item.reward}
              />
              <Button type="button" variant="danger" onClick={() => remove(index)}>
                Remove
              </Button>
            </Box>
          ))}
          {fields.length < MAX_NO_REWARDS && (
            <Button
              type="button"
              variant="info"
              onClick={() => append({ id: fields.length, reward: null })}
            >
              Add Reward
            </Button>
          )}
        </FormElement>

        <InfoCard>
          Once a pool is created, it is committed on-chain. This means the funds cannot be
          withdrawn, and the parameters of the pool cannot be altered. This is to ensure that Hype
          pools are transparent and fair to your community.
        </InfoCard>

        {authenticated ? (
          <div>
            <FormAction>
              <Button size="full-width" type="submit" variant="primary">
                Next: Fund and Activate the Pool ➡️
              </Button>
              <Button size="full-width" type="button" variant="secondary" onClick={onBack}>
                ⬅️ Prev: What are you Hyping?
              </Button>
            </FormAction>
          </div>
        ) : (
          <ConnectWalletBtn mt="4" size="full-width" />
        )}
      </FormColumn>
    </form>
  );
};
