import TitleText from 'src/components/TitleText/TitleText';

import {
  Wrapper,
  FormColumn,
  Example,
  Label,
  FormInput,
  InfoCard,
  ConnectButton,
  HowItWorksColumn,
  HowItWorksWrapper,
  HowItWorksTitle,
  Steps,
  Step,
  StepNumber,
  StepDescription,
} from './AddHypePool.styled';

export const AddHypePool = () => {
  return (
    <Wrapper>
      <FormColumn>
        <TitleText>Give your pool a title!</TitleText>
        <Example>
          <b>Example:</b> Hype App Pool, Cool NFT
        </Example>
        <Label>Hype pool name:</Label>
        <FormInput placeholder="Pool name..." />
        <TitleText>What are you hyping?</TitleText>
        <InfoCard>
          Enter messages, keywords, links, whatever you want hyped up in social. Currently we only
          support Telegram. Need some ideas? Check out some other hype pools.
        </InfoCard>
        <Example>
          <b>Example:</b> Taraxa is launching Hype!, the first app on its social listening platform,
          powered by the Taraxa Layer-1 Network. Check it out at{' '}
          <a href="https://hype.taraxa.io">hype.taraxa.io</a>.
        </Example>
        <Label>What are you hyping?</Label>
        <FormInput placeholder="Your message..." />
        <TitleText>How do you want to reward verified hypes?</TitleText>
        <Label>Rewards are in:</Label>
        <FormInput placeholder="Asset address..." />
        <Label>Min reward per hype:</Label>
        <FormInput placeholder="Min reward per hype..." />
        <Label>Pool cap:</Label>
        <FormInput placeholder="Pool cap..." />
        <Label>Pool ends:</Label>
        <FormInput placeholder="Pool ends..." />
        <ConnectButton size="full-width">Connect wallet</ConnectButton>
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
                Enter asset address which has the rewards for the pool – currently supports ERC-20
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
