import styled from 'styled-components';

export const ImageStyled = styled.img`
  width: ${(props) => props.width || '100px'};
  height: ${(props) => props.height || 'auto'};
`;
