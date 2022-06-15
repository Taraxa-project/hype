import TitleText from 'src/components/TitleText/TitleText';
import Button from '../../components/button/Button';
import { ConnectWalletBtn } from '../../components/connect-wallet-btn/ConnectWalletBtn';
import { useAddHypePoolEffects } from './AddHypePool.effects';
import Text from '../../components/styles/Text';

import {
  Wrapper,
  FormColumn,
  Example,
  Label,
  FormInput,
  InfoCard,
  HowItWorksColumn,
  HowItWorksWrapper,
  HowItWorksTitle,
  Steps,
  Step,
  StepNumber,
  StepDescription,
  FormAction,
} from './AddHypePool.styled';

export const AddHypePool = () => {
  const { register, handleSubmit, onSubmit, onCancel, errors, isConnected } =
    useAddHypePoolEffects();

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Wrapper>
        <FormColumn>
          <TitleText>Give your pool a title!</TitleText>
          <Example>
            <b>Example:</b> Hype App Pool, Cool NFT
          </Example>
          <Label>Hype pool name:</Label>
          <FormInput
            disabled={!isConnected}
            placeholder="Pool name..."
            name="title"
            {...register('title')}
          />
          {errors.title && (
            <Text color="danger" fontSize="0.8rem">
              {errors.title.message}
            </Text>
          )}
          <TitleText>What are you hyping?</TitleText>
          <InfoCard>
            Enter messages, keywords, links, whatever you want hyped up in social. Currently we only
            support Telegram. Need some ideas? Check out some other hype pools.
          </InfoCard>
          <Example>
            <b>Example:</b> Taraxa is launching Hype!, the first app on its social listening
            platform, powered by the Taraxa Layer-1 Network. Check it out at{' '}
            <a href="https://hype.taraxa.io">hype.taraxa.io</a>.
          </Example>
          <Label>What are you hyping?</Label>
          <FormInput
            disabled={!isConnected}
            placeholder="Your message..."
            name="description"
            {...register('description')}
          />
          {errors.description && (
            <Text color="danger" fontSize="0.8rem">
              {errors.description.message}
            </Text>
          )}
          <TitleText>How do you want to reward verified hypes?</TitleText>
          <Label>Rewards are in:</Label>
          <FormInput
            disabled={!isConnected}
            placeholder="Asset address..."
            name="accountAddress"
            {...register('accountAddress')}
          />
          {errors.accountAddress && (
            <Text color="danger" fontSize="0.8rem">
              {errors.accountAddress.message}
            </Text>
          )}
          <Label>Min reward per hype:</Label>
          <FormInput
            disabled={!isConnected}
            placeholder="Min reward per hype..."
            name="minReward"
            {...register('minReward')}
          />
          {errors.minReward && (
            <Text color="danger" fontSize="0.8rem">
              {errors.minReward.message}
            </Text>
          )}
          <Label>Pool cap:</Label>
          <FormInput
            disabled={!isConnected}
            placeholder="Pool cap..."
            name="pool"
            {...register('pool')}
          />
          {errors.pool && (
            <Text color="danger" fontSize="0.8rem">
              {errors.pool.message}
            </Text>
          )}
          <Label>Pool starts:</Label>
          <FormInput
            disabled={!isConnected}
            placeholder="Pool starts..."
            name="startDate"
            {...register('startDate')}
          />
          {errors.startDate && (
            <Text color="danger" fontSize="0.8rem">
              {errors.startDate.message}
            </Text>
          )}
          <Label>Pool ends:</Label>
          <FormInput
            disabled={!isConnected}
            placeholder="Pool ends..."
            name="endDate"
            {...register('endDate')}
          />
          {errors.endDate && (
            <Text color="danger" fontSize="0.8rem">
              {errors.endDate.message}
            </Text>
          )}
          {isConnected ? (
            <FormAction>
              <Button size="full-width" type="submit" variant="primary">
                Confirm and Lock in Reward Pool
              </Button>
              <Button size="full-width" type="button" variant="secondary" onClick={onCancel}>
                Cancel
              </Button>
            </FormAction>
          ) : (
            <ConnectWalletBtn mt="4" size="full-width" />
          )}
        </FormColumn>

        <HowItWorksColumn>
          <HowItWorksWrapper>
            <HowItWorksTitle>How it works</HowItWorksTitle>
            <Steps>
              <Step>
                <StepNumber>1</StepNumber>
                <StepDescription>Come up with a name for your hype pool.</StepDescription>
              </Step>
              <Step>
                <StepNumber>2</StepNumber>
                <StepDescription>
                  Enter messages, keywords, links, whatever you want hyped up in social. Currently
                  we only support Telegram. Need some ideas? Check out some other hype pools.
                </StepDescription>
              </Step>
              <Step>
                <StepNumber>3</StepNumber>
                <StepDescription>
                  Enter asset address which has the rewards for the pool - currently supports ERC-20
                  compatible assets. Then specify the minimum reward for hype. Learn more about
                  verified hype here..
                </StepDescription>
              </Step>
            </Steps>
          </HowItWorksWrapper>
        </HowItWorksColumn>
      </Wrapper>
    </form>
  );
};
