import TitleText from 'src/components/titletext/TitleText';
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
  SpacedStyledTooltip,
} from './AddHypePool.styled';
import { Controller } from 'react-hook-form';
import TextArea from '../../components/textarea/TextArea';
import Box from '../../components/styles/Box';

export const AddHypePool = () => {
  const { register, handleSubmit, submitHandler, onCancel, errors, authenticated, control } =
    useAddHypePoolEffects();

  return (
    <Wrapper>
      <FormColumn>
        <form autoComplete="off" onSubmit={handleSubmit(submitHandler)}>
          <TitleText>What is your project name!</TitleText>
          <Box display="flex" flexDirection="row" gridGap="0.2rem" alignItems="center">
            <Label>Project name:</Label>
            <SpacedStyledTooltip message="Project name" />
          </Box>
          <FormInput
            disabled={!authenticated}
            placeholder="Project name..."
            name="projectName"
            {...register('projectName')}
          />
          {errors.projectName && (
            <Text color="danger" fontSize="0.8rem">
              {errors.projectName.message}
            </Text>
          )}
          <TitleText>Give your pool a title!</TitleText>
          <Example>
            <b>Example:</b> Hype App Pool, Cool NFT
          </Example>
          <Box display="flex" flexDirection="row" gridGap="0.2rem" alignItems="center">
            <Label>Hype pool name:</Label>
            <SpacedStyledTooltip message="Hype pool name" />
          </Box>
          <FormInput
            disabled={!authenticated}
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
            <Link text="hype pools" href={'/'} />.
          </InfoCard>
          <Example>
            <b>Example:</b> Taraxa is launching Hype!, the first app on its social listening
            platform, powered by the Taraxa Layer-1 Network. Check it out at{' '}
            <Link text="hype.taraxa.io" href={'/'} />.
          </Example>
          <Box display="flex" flexDirection="row" gridGap="0.2rem" alignItems="center">
            <Label>What are you hyping?</Label>
            <SpacedStyledTooltip message="What are you hyping?" />
          </Box>
          <TextArea
            disabled={!authenticated}
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
            Taraxa`s social listening algorithms automatically account for factors such as{' '}
            <strong>relevance </strong>
            and <strong>impressions </strong> to incentivize real and impactful discussions, not
            bounty hunters. <Link text="Learn more" href={'/'} />
          </InfoCard>
          <Box display="flex" flexDirection="row" gridGap="0.2rem" alignItems="center">
            <Label>Rewards are in:</Label>
            <SpacedStyledTooltip message="Rewards are in" />
          </Box>
          <FormInput
            disabled={!authenticated}
            placeholder="Asset address..."
            name="rewardsAddress"
            {...register('rewardsAddress')}
          />
          {errors.rewardsAddress && (
            <Text color="danger" fontSize="0.8rem">
              {errors.rewardsAddress.message}
            </Text>
          )}
          <Box display="flex" flexDirection="row" gridGap="0.2rem" alignItems="center">
            <Label>Min reward per hype:</Label>
            <SpacedStyledTooltip message="Min reward per hype" />
          </Box>
          <FormInput
            disabled={!authenticated}
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
            <SpacedStyledTooltip message="Pool cap" />
          </Box>
          <FormInput
            disabled={!authenticated}
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
            <SpacedStyledTooltip message="Pool starts" />
          </Box>
          <Controller
            name="startDate"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DatePicker
                wrapperClassName="date-picker"
                placeholderText="Pool starts..."
                disabled={!authenticated}
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
            <SpacedStyledTooltip message="Pool ends" />
          </Box>
          <Controller
            name="endDate"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DatePicker
                wrapperClassName="date-picker"
                placeholderText="Pool ends..."
                disabled={!authenticated}
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
          {authenticated ? (
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
        </form>
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
                Enter messages, keywords, links, whatever you want hyped up in social. Currently we
                only support Telegram. Need some ideas? Check out some other hype pools.
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
  );
};
