import styled from 'styled-components';

export const ParticipateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 3rem;
  margin-bottom: 3rem;
  padding-left: 3rem;
  padding-right: 3rem;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: 2.5rem;
    padding: 0 1.5rem;
  }
`;

export const TitleText = styled.h1`
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 1.625rem;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;
  color: #000000;
`;

export const Subtitle = styled.h2`
  font-weight: 600;
  font-size: 1.3rem;
  line-height: 1.625rem;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;
  color: #000000;
  margin-left: 20px;
`;

export const Text = styled.h2`
  font-weight: 500;
  font-size: 1.2rem;
  line-height: 1.625rem;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;
  color: #000000;
  margin-left: 30px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: start;
  align-items: center;
  margin-left: 30px;
  margin-top: 15px;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
  }
`;
