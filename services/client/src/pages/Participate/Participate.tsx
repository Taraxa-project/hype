import React from 'react';
import Button from '../../components/button/Button';
import Box from '../../components/styles/Box';
import {
  ButtonsContainer,
  ParticipateContainer,
  Subtitle,
  TitleText,
  Text,
} from './Participate.styled';
import { TelegramSubmitButton } from '../../components/button/TelegramSubmitGroupButton';
import { TelegramListButton } from '../../components/button/TelegramListButton';

export const Participate = () => {
  const onHypeAnalytics = () => {
    window.open(
      'https://medium.com/taraxa-project/taraxa-echo-analytics-pipeline-walkthrough-e54d0531d1ab',
      '_blank',
    );
  };
  return (
    <ParticipateContainer>
      <Box display="flex" flexDirection="column">
        <TitleText>How to Participate in a Hype Pool</TitleText>
        <Box display="flex" justifyContent="start" alignItems="center">
          1️⃣
          <Text>Pick a project you believe in</Text>
        </Box>
        <Box display="flex" justifyContent="start" alignItems="center">
          2️⃣
          <Text>
            Go to any English, public, crypto Telegram group to hype up the project’s campaign
            (e.g., Taraxa Mainnet)
          </Text>
        </Box>
        <Box display="flex" justifyContent="start" alignItems="center">
          3️⃣<Text>Come back to redeem your rewards at the end of the week</Text>
        </Box>
        <Box display="flex" justifyContent="start" alignItems="center">
          🥳
          <Text>
            Congratulations! You’ve just helped to spread the word for your favorite project!
          </Text>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" gridGap="1rem">
        <TitleText>FAQ</TitleText>
        <Box display="flex" flexDirection="column">
          <Box display="flex" flexDirection="row" justifyContent="start" alignItems="center">
            ❔<Subtitle>How do I make sure my hypes will be rewarded?</Subtitle>
          </Box>
          <Text>
            Mention the project’s name and its campaign. For example, if Taraxa is running a hype
            pool on a Mainnet launch, it’s typically expected that your hypes need to include the
            words “Taraxa” and “Mainnet” to be counted.
          </Text>
          <Text>Keep the discussion focused on and relevant to the project.</Text>
          <Text>
            Hype pools also expire! Make sure you’re participating in an Active hype pool.
          </Text>
        </Box>
        <Box display="flex" flexDirection="column">
          <Box display="flex" flexDirection="row" justifyContent="start" alignItems="center">
            ❔<Subtitle>Why aren’t my hype discussions being rewarded?</Subtitle>
          </Box>
          <Text>Make sure the Telegram group is public, English-speaking, and crypto-related.</Text>
          <Text>
            Another reason may be that Hype has not indexed the Telegram group you spoke in. You can
            check and see if the public Telegram group you spoke in is included in the indexing. If
            it is not, you can submit the group’s ID to Hype and it’ll be included in the next
            cycle.
          </Text>
          <ButtonsContainer>
            <TelegramListButton />
            <TelegramSubmitButton />
          </ButtonsContainer>
        </Box>
        <Box display="flex" flexDirection="column">
          <Box display="flex" flexDirection="row" justifyContent="start" alignItems="center">
            ❔<Subtitle>How are rewards calculated?</Subtitle>
          </Box>
          <Text>
            Hype’s analytics & machine-learning algorithms automatically indexes thousands of public
            English crypto groups, filters out spam and spammers, and identifies discussions
            relevant to each active Hype pool. An estimate is made for each relevant message’s
            impact in terms of impressions - i.e., how many users have likely seen the message, and
            rewards are assigned as defined by each Hype pool.
          </Text>
          <Text>
            If you’re familiar with data analytics and machine-learning, you can read more about the
            analytics pipeline.
          </Text>
          <ButtonsContainer>
            <Button variant="secondary" onClick={onHypeAnalytics}>
              🔢 Hype’s Analytics Pipeline
            </Button>
          </ButtonsContainer>
        </Box>
      </Box>
    </ParticipateContainer>
  );
};
