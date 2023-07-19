import styled from 'styled-components';

import { HypeThemeType } from '../../theme';

interface CustomStyledProps {
  theme?: HypeThemeType;
}
export const Logo = styled.div`
  font-size: 5rem;
  display: flex;
`;

export const CardContainer = styled.div`
  position: relative;
  z-index: 1;
  overflow: auto;

  display: grid;
  gap: 2rem;
  // grid-template-columns: repeat(auto-fill, minmax(21rem, max-content));
  grid-template-columns: repeat(auto-fill, minmax(21rem, max-content));
  justify-content: start;
  align-items: start;
`;

export const HeroContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 4rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    gap: 2rem;
  }
`;

export const IntroContainer = styled.div<CustomStyledProps>`
  background: ${({ theme }) => theme.colors.greys[0]};
  padding: 1.5rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

export const GuideContainer = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Guide = styled.img<CustomStyledProps>`
  border-radius: 10px;
  width: 400px;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
  }
`;

export const TelegramInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    margin-top: 2.5rem;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-top: 0.7rem;
  }
`;

export const TelegramDetails = styled.div<CustomStyledProps>`
  background: ${({ theme }) => theme.colors.greys[0]};
  padding: 1.5rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  width: 70%;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: auto;
  }
`;

export const TelegramButtonsContainer = styled.div<CustomStyledProps>`
  background: ${({ theme }) => theme.colors.greys[0]};
  padding: 1.5rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  > * {
    width: 420px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    > * {
      width: 100%;
    }
  }
`;

export const PoolContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NotFoundContainer = styled.div`
  min-height: 12rem;
  background: ${({ theme }) => theme.colors.greys[0]};
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin: 2rem 1.5rem;
  }
`;

export const NotFoundText = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 0.8rem;
  line-height: 1.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  letter-spacing: -0.03em;
  color: #a6a6a6;
`;

export const DescriptionContainer = styled.span`
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.25rem;
  letter-spacing: -0.02em;
  text-align: left;
  color: #595959;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: unset;
    margin-bottom: 2.625rem;
  }
`;

export const LogoText = styled.h1`
  font-weight: 700;
  font-size: 2rem;
  line-height: 1.625rem;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;
  color: #000000;
  margin-left: 0.5rem;
`;

export const TitleText = styled.h3`
  font-weight: 700;
  font-size: 1.2rem;
  line-height: 1.625rem;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;
  color: #000000;
`;

export const LoadingContainer = styled.footer`
  position: absolute;
  bottom: 0;
`;
