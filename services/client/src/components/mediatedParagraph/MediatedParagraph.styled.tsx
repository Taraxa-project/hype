import React from 'react';
import styled from 'styled-components';

const StyledP = styled.p`
  top: calc(50% - 0.625rem);
`;

interface PProps {
  children: React.ReactNode;
}

const MediatedParagraph = (props: PProps) => {
  return <StyledP>{props.children}</StyledP>;
};

export default MediatedParagraph;
