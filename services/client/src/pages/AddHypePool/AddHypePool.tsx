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
  Steps,
  Step,
  StepTitle,
  StepContent,
  FormAction,
  SpacedStyledTooltip,
  StepSubTitle,
  FormElement,
  FormSelect,
} from './AddHypePool.styled';
import { Controller } from 'react-hook-form';
import TextArea from '../../components/textarea/TextArea';
import Box from '../../components/styles/Box';
import { HowItWorks } from '../../components/how-it-works/HowItWorks';

export const AddHypePool = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    authenticated,
    control,
    currentStep,
    setCurrentStep,
    networkOptions,
    handleNetworkSelect,
    tokensOptions,
    handleTokenSelect,
    getValues,
  } = useAddHypePoolEffects();

  return (
    <Wrapper>
      <Steps>
        <Step>
          <StepTitle active={currentStep > 1}>➕</StepTitle>
          <StepSubTitle active={currentStep > 1}>WHAT are you Hyping?</StepSubTitle>
        </Step>
        <Step>
          <StepTitle active={currentStep > 2}>💲</StepTitle>
          <StepSubTitle active={currentStep > 2}>HOW will you reward?</StepSubTitle>
        </Step>
        <Step>
          <StepTitle active={currentStep > 3}>📣</StepTitle>
          <StepSubTitle active={currentStep > 3}>START Hyping!</StepSubTitle>
        </Step>
      </Steps>

      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        {currentStep === 1 && (
          <StepContent>
            <FormColumn>
              {/* Title */}
              <FormElement>
                <TitleText>Give your pool a title!</TitleText>
                <Example>
                  <b>Example:</b> Hype App Pool, Cool NFT
                </Example>
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
              </FormElement>

              {/* Project Name */}
              <FormElement>
                <TitleText>Tell us about your project</TitleText>
                <Box display="flex" flexDirection="row" gridGap="0.2rem" alignItems="center">
                  <Label>Project's name & potential variations separated by commas</Label>
                  {/* <SpacedStyledTooltip message="Project name" /> */}
                </Box>
                <Example>
                  <b>Example 1:</b> Taraxa <br />
                  <b>Example 2:</b> Dragon War, Dragon Wars, DragonWar, DragonWars
                </Example>
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
              </FormElement>

              {/* Token Name */}
              <FormElement>
                <Box display="flex" flexDirection="row" gridGap="0.2rem" alignItems="center">
                  <Label>Project's token name (if any): </Label>
                </Box>
                <Example>
                  <b>Example:</b> TARA
                </Example>
                <FormInput
                  disabled={!authenticated}
                  placeholder="ex: TARA"
                  name="tokenName"
                  {...register('tokenName')}
                />
              </FormElement>

              {/* Description */}
              <FormElement>
                <Box display="flex" flexDirection="row" gridGap="0.2rem" alignItems="center">
                  <Label>Brief project description:</Label>
                </Box>
                <Example>
                  A brief but comprehensive summary of your project, one that highlights all its
                  unique aspects.
                </Example>
                <TextArea
                  disabled={!authenticated}
                  rows={12}
                  maxLength={1000}
                  placeholder="ex:  Taraxa is a purpose-built, fast, scalable, and device-friendly Layer-1 public ledger designed to help democratize reputation by making informal data trustworthy. 
                  &#13;&#10;
                  People and devices generate data constantly, but more than 80% of it is informal and cannot be tracked. Examples range from informal verbal agreements, IoT status signals, or casual online discussions. As a result, informal transactional and interactional data remains unstructured, unverifiable, and impossible to trust.
                  &#13;&#10;
                  Taraxa tracks informal data and makes it trustworthy with its purpose-built technologies, by decentralizing informal data gathering & analytics and enforcing accountability through signed commitments. With enough informal data, we can build localized reputation networks rooted in communities, enabling even most minor participants to acquire a reputation, becoming more trusted and efficiently rewarded.
                  "
                  name="projectDescription"
                  {...register('projectDescription')}
                />
                {errors.projectDescription && (
                  <Text color="danger" fontSize="0.8rem">
                    {errors.projectDescription.message}
                  </Text>
                )}
              </FormElement>

              {/* Hype Description */}
              <FormElement>
                <TitleText>What are you hyping?</TitleText>
                <InfoCard>
                  Enter messages, keywords, links, whatever you want hyped up in social. Currently
                  we only support Telegram. Need some ideas? Check out some other
                  <Link text="hype pools" href={'/'} />.
                </InfoCard>
                <Example>
                  Your project's latest news that crypto community should know about, e.g., the
                  latest Tweet about your project's product launch.
                </Example>
                <TextArea
                  disabled={!authenticated}
                  maxLength={280}
                  rows={12}
                  placeholder="Taraxa's Hype app just launched! Come check it out at: https://hype.taraxa.io. 
                &#13;&#10;  
                Drop by if you want to, 
                &#13;&#10;  
                - Help your project raise awareness in crypto communities&#13;&#10;  
                - Earn rewards for helping to spread the word and engage others in meaningful discussions about your favorite project&#13;&#10;  
                - Block out the bots & bounty hunters ruining your social campaigns & communities&#13;&#10;
                … 
                "
                  name="description"
                  {...register('description')}
                />
                {errors.description && (
                  <Text color="danger" fontSize="0.8rem">
                    {errors.description.message}
                  </Text>
                )}
              </FormElement>

              {/* Hype Word */}
              <FormElement>
                <Box display="flex" flexDirection="row" gridGap="0.2rem" alignItems="center">
                  <Label>Give us one word that best defines this hype:</Label>
                </Box>
                <Example>
                  <b>Example:</b> someone hyping Taraxa's testnet launch must include the word
                  “testnet“ in their social message.
                </Example>
                <FormInput
                  disabled={!authenticated}
                  placeholder="ex: testnet"
                  name="word"
                  {...register('word')}
                />
                {errors.word && (
                  <Text color="danger" fontSize="0.8rem">
                    {errors.word.message}
                  </Text>
                )}
              </FormElement>

              {authenticated ? (
                <div>
                  <FormAction>
                    <Button
                      size="full-width"
                      type="button"
                      variant="primary"
                      onClick={() => setCurrentStep(2)}
                    >
                      Next: Hype Pool Rewards ➡️
                    </Button>
                  </FormAction>
                </div>
              ) : (
                <ConnectWalletBtn mt="4" size="full-width" />
              )}
            </FormColumn>

            <HowItWorks step={currentStep} />
          </StepContent>
        )}

        {currentStep === 2 && (
          <>
            <StepContent>
              <FormColumn>
                {/* Network */}
                <FormElement>
                  <TitleText>How do you want to reward the community?</TitleText>
                  {/* <InfoCard>
                  Taraxa`s social listening algorithms automatically account for factors such as{' '}
                  <strong>relevance </strong>
                  and <strong>impressions </strong> to incentivize real and impactful discussions,
                  not bounty hunters. <Link text="Learn more" href={'/'} />
                </InfoCard> */}
                  <Box display="flex" flexDirection="row" gridGap="0.2rem" alignItems="center">
                    <Label>Rewards are on this network:</Label>
                  </Box>
                  <Example>
                    Identify which blockchain network the reward tokens reside on, e.g., Taraxa,
                    Ethereum
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
                    Enter the smart contract address for the reward tokens. Currently Hype supports
                    native TARA, ETH, and ERC-20 tokens.
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
                      <option key={`${option.value}-${option.name}`} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                  </FormSelect>
                  {errors.token && (
                    <Text color="danger" fontSize="0.8rem">
                      {errors.token.message}
                    </Text>
                  )}
                </FormElement>

                {/* Min reward */}
                <FormElement>
                  <Box display="flex" flexDirection="row" gridGap="0.2rem" alignItems="center">
                    <Label>Minimum rewards per winner:</Label>
                  </Box>
                  <Example>
                    Given the gas fees on your chosen network and your token's market value, define
                    the minimum number of tokens to reward a single user. Example: currently a
                    single redemption transaction on ETH costs $2-3, so the min token rewards should
                    be worth more than that.
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
                    How much reward to give for every 1,000 impressions (or views) of effective
                    social mentions in support of your hype?
                  </Example>
                  <FormInput
                    disabled={!authenticated}
                    placeholder="ex: 200,000"
                    name="minReward"
                    {...register('minReward')}
                  />
                  {errors.minReward && (
                    <Text color="danger" fontSize="0.8rem">
                      {errors.minReward.message}
                    </Text>
                  )}
                </FormElement>

                {/* Pool cap */}
                <FormElement>
                  <Box display="flex" flexDirection="row" gridGap="0.2rem" alignItems="center">
                    <Label>Total rewards for the pool:</Label>
                  </Box>
                  <Example>
                    The total (or maximum) rewards for the pool, this is how much you will need to
                    deposit to fully fund and activate the Hype Pool.
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
                    Defines how long the Hype Pool will last. At the end of the Hype Pool if rewards
                    have not been fully doled out, they'll be returned.
                  </Example>
                  <Controller
                    name="endDate"
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <DatePicker
                        wrapperClassName="date-picker"
                        placeholderText="ex: 30 Days"
                        disabled={!authenticated}
                        selected={value}
                        showTimeSelect
                        dateFormat="MM/dd/yyyy HH:mm"
                        onChange={onChange}
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
                      <Button
                        size="full-width"
                        type="button"
                        variant="secondary"
                        onClick={() => setCurrentStep(1)}
                      >
                        ⬅️ Prev: What are you Hyping?
                      </Button>
                      <Button
                        size="full-width"
                        type="button"
                        variant="primary"
                        onClick={() => setCurrentStep(3)}
                      >
                        Next: Fund and Activate the Pool ➡️
                      </Button>
                    </FormAction>
                  </div>
                ) : (
                  <ConnectWalletBtn mt="4" size="full-width" />
                )}
              </FormColumn>
              <HowItWorks step={currentStep} />
            </StepContent>
          </>
        )}
        {currentStep === 3 && (
          <StepContent>
            <FormColumn>
              <TitleText>Fund and activate the Hype Pool!</TitleText>
              <Box display="flex" flexDirection="row" gridGap="0.2rem" alignItems="center">
                <Label>
                  Deposit {getValues('minReward')} {getValues('token')} into the pool.
                </Label>
              </Box>
              <FormAction>
                <Button size="full-width" type="submit" onClick={() => setCurrentStep(4)}>
                  Next
                </Button>
              </FormAction>
            </FormColumn>
            <HowItWorks step={currentStep} />
          </StepContent>
        )}
        {currentStep === 4 && (
          <>
            <Button size="regular" onClick={() => setCurrentStep(1)}>
              Finalize
            </Button>
          </>
        )}
      </form>
    </Wrapper>
  );
};
