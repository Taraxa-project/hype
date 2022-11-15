import TitleText from '../../../components/titletext/TitleText';
import Button from '../../../components/button/Button';
import { ConnectWalletBtn } from '../../../components/connect-wallet-btn/ConnectWalletBtn';
import Text from '../../../components/styles/Text';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import {
  FormColumn,
  Example,
  Label,
  FormInput,
  FormAction,
  FormElement,
  FormSelect,
} from '../AddHypePool.styled';
import { Controller } from 'react-hook-form';
import Box from '../../../components/styles/Box';
import { HypePoolRewardForm, useRewardFormEffects } from './RewardForm.effects';

export interface RewardFormProps {
  defaultValues: HypePoolRewardForm;
  onSubmit: (data: HypePoolRewardForm) => void;
  onBack: () => void;
}

export const RewardForm = ({ defaultValues, onSubmit, onBack }: RewardFormProps) => {
  const {
    register,
    handleSubmit,
    errors,
    authenticated,
    control,
    networkOptions,
    handleNetworkSelect,
    tokensOptions,
    handleTokenSelect,
    showToken,
    debouncedResults,
    isEthNetwork,
    getValues,
  } = useRewardFormEffects(defaultValues);

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
            {networkOptions.map((option) => (
              <option key={`${option.value}-${option.name}`} value={option.value}>
                {option.name}
              </option>
            ))}
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
                value={option.value}
                disabled={
                  // if ETH network block only TARA
                  (option.value === tokensOptions[1].value && isEthNetwork) ||
                  // if not ETH network block everything else except TARA
                  (option.value !== tokensOptions[1].value && !isEthNetwork)
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

        {/* Custom token name */}
        {showToken && (
          <FormElement>
            <Box display="flex" flexDirection="row" gridGap="0.2rem" alignItems="center">
              <Label>Name for ERC20 token:</Label>
            </Box>
            <FormInput
              disabled
              placeholder="ERC20 Token name"
              name="tokenName"
              style={{ color: '#595959' }}
              {...register('tokenName')}
            />
            {errors.tokenName && (
              <Text color="danger" fontSize="0.8rem">
                {errors.tokenName.message}
              </Text>
            )}
          </FormElement>
        )}

        {/* Min reward */}
        <FormElement>
          <Box display="flex" flexDirection="row" gridGap="0.2rem" alignItems="center">
            <Label>Minimum rewards per winner:</Label>
          </Box>
          <Example>
            Given the gas fees on your chosen network and your token's market value, define the
            minimum number of tokens to reward a single user. Example: currently a single redemption
            transaction on ETH costs $2-3, so the min token rewards should be worth more than that.
          </Example>
          <FormInput
            disabled={!authenticated}
            placeholder="ex: 100,000"
            name="minReward"
            {...register('minReward')}
          />
          {errors.minReward && (
            <Text color="danger" fontSize="0.8rem">
              {errors.minReward.message}
            </Text>
          )}
        </FormElement>

        {/* Impression Reward */}
        <FormElement>
          <Box display="flex" flexDirection="row" gridGap="0.2rem" alignItems="center">
            <Label>Reward per 1,000 impressions:</Label>
          </Box>
          <Example>
            How much reward to give for every 1,000 impressions (or views) of effective social
            mentions in support of your hype?
          </Example>
          <FormInput
            disabled={!authenticated}
            placeholder="ex: 200,000"
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

        {/* End date */}
        <FormElement>
          <Box display="flex" flexDirection="row" gridGap="0.2rem" alignItems="center">
            <Label>Max duration of the pool:</Label>
          </Box>
          <Example>
            Defines how long the Hype Pool will last. At the end of the Hype Pool if rewards have
            not been fully doled out, they'll be returned.
          </Example>
          <Controller
            name="endDate"
            control={control}
            render={({ field: { onChange, value } }) => (
              <DatePicker
                wrapperClassName="date-picker"
                placeholderText="ex: 30 Days"
                disabled={!authenticated}
                selected={value}
                showTimeSelect
                dateFormat="MM/dd/yyyy HH:mm"
                onChange={onChange}
                minDate={new Date()}
              />
            )}
          />
          {errors.endDate && (
            <Text color="danger" fontSize="0.8rem">
              {errors.endDate.message}
            </Text>
          )}
        </FormElement>

        {authenticated ? (
          <div>
            <FormAction>
              <Button size="full-width" type="button" variant="secondary" onClick={onBack}>
                ⬅️ Prev: What are you Hyping?
              </Button>
              <Button size="full-width" type="submit" variant="primary">
                Next: Fund and Activate the Pool ➡️
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
