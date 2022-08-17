import React, { FC } from 'react';
import CloseIcon from '../../../assets/icons/Close';
import Box from '../../styles/Box';
import Text from '../../styles/Text';
import { CloseContainer, TitleContainer } from './ModalTitle.styled';

export interface ModalTitleProps {
  title: string;
  close?: () => void;
  icon?: JSX.Element;
}

export const ModalTitle: FC<ModalTitleProps> = ({ title, close, icon }: ModalTitleProps) => {
  return (
    <TitleContainer>
      <Box display="flex" justifyContent="center" alignItems="center">
        {icon && (
          <Box display="flex" justifyContent="center" alignItems="center" mr="1.3rem">
            {icon}
          </Box>
        )}
        <Text
          fontWeight="700"
          fontSize="1.25rem"
          color="greys.6"
          width="100%"
          lineHeight="26px"
          margin="0"
        >
          {title}
        </Text>
      </Box>
      {close && (
        <Box display="flex" justifyContent="center" alignItems="center" ml="1.3rem" onClick={close}>
          <CloseContainer onClick={close}>
            <CloseIcon />
          </CloseContainer>
        </Box>
      )}
    </TitleContainer>
  );
};
