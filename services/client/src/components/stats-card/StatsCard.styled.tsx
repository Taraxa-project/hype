import styled from 'styled-components';

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 1.5rem;
  color: white;
  border-radius: 10px;
  min-width: 180px;
`;
