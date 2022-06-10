import styled from "styled-components";

export const StyledModal = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  overflow: auto; /* Enable scroll if needed */
  transform: translate(-50%, -50%);
  z-index: 1040;
  backdrop-filter: blur(1rem);
  width: auto;
  max-width: 500px !important;
  height: 60%;
  background: #f7f7f7;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: space-between;
  padding: 2rem;
`;
