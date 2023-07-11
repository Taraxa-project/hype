import { ChangeEvent } from 'react';
import { Input, Label, Switch } from './ToggleSwitch.styles';
import Text from '../../components/styles/Text';

export interface ToggleSwitchProps {
  label?: string;
  onCheck: (checked: boolean) => void;
  checked: boolean;
  disabled?: boolean;
}

export const ToggleSwitch = ({ checked, onCheck, label, disabled = false }: ToggleSwitchProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onCheck(e.target.checked);
  };

  return (
    <Label>
      {label && <Text>{label}</Text>}
      <Input checked={checked} type="checkbox" onChange={handleChange} disabled={disabled} />
      <Switch disabled={disabled} />
    </Label>
  );
};
