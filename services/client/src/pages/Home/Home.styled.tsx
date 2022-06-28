import styled from 'styled-components';
import { HypeThemeType } from '../../theme';
import ReactPlayer from 'react-player';

export const CardContainer = styled.div<{ theme: HypeThemeType }>`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 1rem;
  z-index: 1;
  padding: 0 2rem 2rem;
  margin-bottom: 1rem;
  overflow: auto;
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-evenly;
    margin-top: 1rem;
    margin-bottom: 3rem;
    overflow: auto;
    z-index: 1;
    position: relative;
    gap: 1rem;
  }
`;

export const PageContainer = styled.div`
  background: #fafafa;
  border-radius: 2rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const HeroContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 3rem;
  padding-left: 3rem;
  padding-right: 3rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    margin-top: 2.5rem;
    padding: 0 1.5rem;
  }
`;

export const IntroContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  justify-content: center;
`;

export const VideoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: right;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

export const VideoPlayer = styled(ReactPlayer)`
  width: 29.625rem;
  height: 16.75rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
    height: 100%;
  }
`;

export const PoolContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2.5rem;
  padding-left: 3rem;
  padding-right: 3rem;

  @media (max-width: 768px) {
    margin-top: 1rem;
    padding: 0 1.5rem;
  }
`;

export const NotFoundContainer = styled.div`
  min-height: 12rem;
  margin: 2rem 3rem;
  background: #f1f1f1;
  border-radius: 1rem;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-content: center;
  justify-content: center;
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
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  max-width: 15rem;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: unset;
    margin-bottom: 2.625rem;
  }
`;

export const TitleText = styled.h3`
  font-weight: 700;
  font-size: 1.5rem;
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
