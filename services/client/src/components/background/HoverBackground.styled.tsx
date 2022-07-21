import React from 'react';
import styled from 'styled-components';

interface BackgroundProps extends React.HTMLProps<HTMLDivElement> {
  show?: boolean;
  height?: string;
}

const BackgroundStyled = styled.div<BackgroundProps>`
  transition: opacity 0.2s ease-out;
  pointer-events: none;
  background: rgba(45, 45, 45, 0.4);
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
  z-index: 1000;
  ${(props) => props.show ? 'opacity: 0.5;' : ' opacity: 0;'}
  ${(props) => props.show && 'pointer-events: all'}
`;
const BackgroundHover = ({show, children }: BackgroundProps): JSX.Element => (
  <>
    {show ? (
      <BackgroundStyled show={show}>{children}</BackgroundStyled>
    ) : (
      children
    )}
  </>
);

export default BackgroundHover;
