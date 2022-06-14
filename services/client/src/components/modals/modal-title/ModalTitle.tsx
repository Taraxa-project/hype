import React, { FC } from 'react';
import CloseIcon from '../../../assets/icons/Close';
import Text from '../../styles/Text';
import { CloseContainer, TitleContainer } from './ModalTitle.styled';

export interface ModalTitleProps {
  title: string;
  close?: () => void;
}

export const ModalTitle: FC<ModalTitleProps> = ({ title, close }: ModalTitleProps) => {
  return (
    <TitleContainer>
      <Text fontWeight="700" fontSize="1.25" color="greys.6" width="100%" lineHeight="26px">
        {title}
      </Text>
      {close && (
        <CloseContainer onClick={close}>
          <CloseIcon />
        </CloseContainer>
      )}
    </TitleContainer>
  );
};
