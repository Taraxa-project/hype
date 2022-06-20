import TitleText from 'src/components/TitleText/TitleText';
import { Link } from 'src/components/styles/Link'; 
import Button from '../../components/button/Button';
import { ConnectWalletBtn } from '../../components/connect-wallet-btn/ConnectWalletBtn';
import { useAddHypePoolEffects } from './AddHypePool.effects';
import Text from '../../components/styles/Text';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
import { Controller } from 'react-hook-form';
import TextArea from '../../components/textarea/TextArea';
import Tooltip from '../../components/tooltip/Tooltip';
import Box from '../../components/styles/Box';

export const AddHypePool = () => {
  const { register, handleSubmit, onSubmit, onCancel, errors, isConnected, control } =
    useAddHypePoolEffects();

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Wrapper>
        <FormColumn>
          <TitleText>Give your pool a title!</TitleText>
          <Example>
            <b>Example:</b> Hype App Pool, Cool NFT
          </Example>
          <Box display="flex" flexDirection="row" gridGap="0.2rem" alignItems="center">
            <Label>Hype pool name:</Label>
            <Tooltip message="Hype pool name" />
          </Box>
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
            support Telegram. Need some ideas? Check out some other{' '}
            <Link text='hype pools' target={'/'}/>.
          </InfoCard>
          <Example>
            <b>Example:</b> Taraxa is launching Hype!, the first app on its social listening
            platform, powered by the Taraxa Layer-1 Network. Check it out at{' '}
            <Link text='hype.taraxa.io' target={'/'}/>.
          </Example>
          <Box display="flex" flexDirection="row" gridGap="0.2rem" alignItems="center">
            <Label>What are you hyping?</Label>
            <Tooltip message="What are you hyping?" />
          </Box>
          <TextArea
            disabled={!isConnected}
            rows={5}
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
          <InfoCard>
            Taraxa`s social listening algorithms automatically account for factors such as <strong>relevance </strong>
            and <strong>impressions </strong> to incentivize real and impactful discussions, not bounty hunters. <Link text='Learn more' target={'/'}/>
          </InfoCard>
          <Box display="flex" flexDirection="row" gridGap="0.2rem" alignItems="center">
            <Label>Rewards are in:</Label>
            <Tooltip message="Rewards are in" />
          </Box>
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
          <Box display="flex" flexDirection="row" gridGap="0.2rem" alignItems="center">
            <Label>Min reward per hype:</Label>
            <Tooltip message="Min reward per hype" />
          </Box>
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
          <Box display="flex" flexDirection="row" gridGap="0.2rem" alignItems="center">
            <Label>Pool cap:</Label>
            <Tooltip message="Pool cap" />
          </Box>
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
          <Box display="flex" flexDirection="row" gridGap="0.2rem" alignItems="center">
            <Label>Pool starts:</Label>
            <Tooltip message="Pool starts" />
          </Box>
          <Controller
            name="startDate"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DatePicker
                wrapperClassName="datePicker"
                placeholderText="Pool starts..."
                disabled={!isConnected}
                selected={value}
                showTimeSelect
                onChange={onChange}
              />
            )}
          />
          {errors.startDate && (
            <Text color="danger" fontSize="0.8rem">
              {errors.startDate.message}
            </Text>
          )}
          <Box display="flex" flexDirection="row" gridGap="0.2rem" alignItems="center">
            <Label>Pool ends:</Label>
            <Tooltip message="Pool ends" />
          </Box>
          <Controller
            name="endDate"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DatePicker
                wrapperClassName="datePicker"
                placeholderText="Pool ends..."
                disabled={!isConnected}
                selected={value}
                showTimeSelect
                onChange={onChange}
              />
            )}
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
