import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(360deg);
}
`;

const StyledSVGSpinner = styled.svg`
  animation: ${rotate} 1.5s linear infinite;
  position: sticky;
  bottom: 2.5rem;
  transform: translate(-50%, -50%);
  margin: 0 auto;
`;

const LoadingSpinner = () => {
  return (
    <StyledSVGSpinner
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 40C8.9543 40 0 31.0457 0 20C0 8.9543 8.9543 0 20 0C31.0457 0 40 8.9543 40 20H35.7143C35.7143 20 35.7143 19.9999 35.7143 19.9999C35.7143 11.3211 28.6788 4.28558 20 4.28558C11.3213 4.28558 4.28574 11.3211 4.28574 19.9999C4.28574 28.6786 11.3213 35.7142 20 35.7142L20 40Z"
        fill="#D0D0D0"
      />
    </StyledSVGSpinner>
  );
};

export default LoadingSpinner;
