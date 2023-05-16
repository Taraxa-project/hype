import Button from './Button';

export const TelegramSubmitButton = () => {
  const onSubmitTelegram = () => {
    window.open('https://forms.gle/fuSNPsuVaUwaB8wbA', '_blank');
  };

  return <Button onClick={onSubmitTelegram}>⬆ Submit a New Telegram Group</Button>;
};
