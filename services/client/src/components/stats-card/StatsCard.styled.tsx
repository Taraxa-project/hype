import styled from 'styled-components';

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  background-color: ${({ theme }) => theme.colors.greys[2]};
  padding: 1.5rem;
  border-radius: 10px;
  width: 180px;
`;
