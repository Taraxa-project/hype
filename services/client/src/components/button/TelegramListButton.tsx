import { useNavigate } from 'react-router-dom';
import Button from './Button';

export const TelegramListButton = () => {
  let navigate = useNavigate();
  const onListTelegram = () => {
    navigate('/group');
  };

  return (
    <Button variant="secondary" onClick={onListTelegram}>
      📋 List of Indexed Telegram Groups
    </Button>
  );
};
