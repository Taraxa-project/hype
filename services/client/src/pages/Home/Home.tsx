import SearchIcon from '../../assets/icons/Search';
import Input from '../../components/input/Input';
import LoadingSpinner from '../../assets/icons/Spinner';
import NotFoundIcon from '../../assets/icons/NotFound';
import { useHomeEffects } from './Home.effects';
import {
  HomeContainer,
  HeroContainer,
  IntroContainer,
  TitleText,
  DescriptionContainer,
  GuideContainer,
  PoolContainer,
  NotFoundContainer,
  NotFoundText,
  CardContainer,
  MainTitle,
  TelegramInfoContainer,
  TelegramButtonsContainer,
  TelegramDetails,
  Guide,
} from './Home.styled';
import Card from '../../components/card/Card';
import Box from '../../components/styles/Box';

import { HypePool } from '../../models';
import megaphone from '../../assets/images/megaphone_illustration.png';
import { TelegramSubmitButton } from '../../components/button/TelegramSubmitGroupButton';
import { TelegramListButton } from '../../components/button/TelegramListButton';
import { RoundContainer } from '../../components/container/RoundContainer.styled';
import { ToggleSwitch } from '../../components/toggle-switch/ToggleSwitch';
import Button from '../../components/button/Button';

export const Home = () => {
  const { debouncedResults, hypePools, onClick, isFetchingNextPage, toggleActive, isActive } =
    useHomeEffects();

  const onHowTo = () => {
    window.open('https://docs.taraxa.io/social-listening/hype-app', '_blank');
  };

  return (
    <HomeContainer>
      <RoundContainer>
        <HeroContainer>
          <IntroContainer>
            <MainTitle>Automated Social Campaigns for Web3</MainTitle>
            <DescriptionContainer>
              Hype your project and expand your community with automated social campaigns with
              measurable + verifiable outcomes, spam-filtering, and reward. Decentralized,
              open-source, and transparent.
            </DescriptionContainer>
            <Box mt={3}>
              <Button size="regular" onClick={onHowTo} variant="primary">
                How to
              </Button>
            </Box>
          </IntroContainer>
          <GuideContainer>
            <Guide src={megaphone} alt="Hype! app" />
          </GuideContainer>
        </HeroContainer>
      </RoundContainer>

      <RoundContainer>
        <TelegramInfoContainer>
          <TelegramButtonsContainer>
            <TelegramListButton />
            <TelegramSubmitButton />
          </TelegramButtonsContainer>
          <TelegramDetails>
            <TitleText>Make sure Telegram groups you’re in are indexed!</TitleText>
            <DescriptionContainer>
              To be rewarded, the groups where you’re hyping in must be indexed. Please check to see
              if the crypto Telegram groups you frequent are indexed, if they’re not, submit them to
              us and we’ll add them to the list.
            </DescriptionContainer>
          </TelegramDetails>
        </TelegramInfoContainer>
      </RoundContainer>

      <RoundContainer>
        <PoolContainer>
          <Box
            display="flex"
            gridGap="1rem"
            justifyContent={'space-between'}
            flexWrap="wrap-reverse"
          >
            <TitleText>
              {/* {searchString ? 'All' : isActive ? 'Active' : 'Inactive'} Hype Pools */}
              {isActive ? 'Active' : 'Inactive'} Hype Pools
            </TitleText>
            <ToggleSwitch
              label={`Show Active`}
              checked={isActive}
              onCheck={toggleActive}
              // disabled={!!searchString}
            />
          </Box>
          <Input
            icon={<SearchIcon />}
            placeholder="Search for hype pools..."
            onChange={debouncedResults}
          />
        </PoolContainer>
        {hypePools.length > 0 && (
          <CardContainer>
            {hypePools.map(
              (data: HypePool, i: number) =>
                data && (
                  <Card key={`${data?.title}-${i}`} pool={data} onClick={() => onClick(data)} />
                ),
            )}
          </CardContainer>
        )}

        {(!hypePools || hypePools.length === 0) && (
          <NotFoundContainer>
            <NotFoundText>
              {isFetchingNextPage ? (
                <LoadingSpinner />
              ) : (
                <>
                  <NotFoundIcon /> Nothing found...
                </>
              )}
            </NotFoundText>
          </NotFoundContainer>
        )}
      </RoundContainer>
    </HomeContainer>
  );
};
