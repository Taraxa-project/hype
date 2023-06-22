import { ChangeEventHandler, PropsWithChildren } from 'react';
import { UploadInput } from './Upload.styled';

export interface UploadControlProps extends PropsWithChildren {
  value: any;
  onChange: ChangeEventHandler<HTMLInputElement>;
  accept: string;
  disabled?: boolean;
}

export const UploadControl = ({
  children,
  onChange,
  disabled = false,
  accept,
}: UploadControlProps) => {
  return (
    <UploadInput htmlFor="contained-button-file">
      <input
        accept={accept}
        disabled={disabled}
        style={{ display: 'none' }}
        id="contained-button-file"
        multiple
        type="file"
        name="file"
        onChange={disabled ? () => {} : onChange}
      />
      {children}
    </UploadInput>
  );
};
