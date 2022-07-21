import React, { forwardRef } from 'react';
import { StyledTextArea } from './TextArea.styled';

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    React.PropsWithoutRef<JSX.IntrinsicElements['textarea']> {
  disabled?: boolean;
  placeholder?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({ ...props }, ref) => {
  return <StyledTextArea {...props} placeholder={props.placeholder} ref={ref} />;
});

TextArea.defaultProps = {
  disabled: false,
};

export default TextArea;
