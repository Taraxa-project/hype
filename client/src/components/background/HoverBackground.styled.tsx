import React from 'react';
import styled from 'styled-components';

interface BackgroundProps extends React.HTMLProps<HTMLDivElement> {
  show?: boolean;
  height?: string;
}

const BackgroundStyled = styled.div<BackgroundProps>`
  ${(props) => !props.show && `visibility: hidden;`}
  min-width: 100vw;
  min-height: 100000000vh;
  position: absolute;
  z-index: 1000;
  top: 0;
  left: 0;
  background-color: rgba(45, 45, 45, 0.4);
`;
const BackgroundHover = (props: BackgroundProps): JSX.Element => (
  <>
    {props.show ? (
      <BackgroundStyled show={props.show}>{props.children}</BackgroundStyled>
    ) : (
      props.children
    )}
  </>
);

export default BackgroundHover;
