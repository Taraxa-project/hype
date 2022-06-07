import React from "react";
import styled from "styled-components";

export const StyledModal = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1040;
  backdrop-filter: blur(1rem);
  width: 25%;
  height: 60%;
  background: #f7f7f7;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: space-between;
  padding: 2rem;
`;

export const Account = styled.div`
  background: #ececec;
  border-radius: 1.625rem;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  color: #787878;
  padding: 0.375rem 1.5rem;
  margin-left: 2rem;
`;

export const BlockiesContainer = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
  margin-top: 1rem;
  padding-right: 3rem;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  vertical-align: top;
  justify-content: space-between;
  align-items: baseline;
  margin-top: 0;
`;

export const ButtonDiv = styled.div`
  cursor: pointer;
`;