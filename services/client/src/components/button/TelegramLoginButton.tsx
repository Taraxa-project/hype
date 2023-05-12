import { Component, createRef, ReactNode } from 'react';
import { TelegramUser } from '../../models';

export enum TelegramLoginButtonSize {
  Large = 'large',
  Medium = 'medium',
  Small = 'small',
}

export type TelegramLoginButtonProps = Readonly<{
  botName: string;
  onAuthCallback?: (user: TelegramUser) => void;
  redirectUrl?: string;
  buttonSize: TelegramLoginButtonSize;
  cornerRadius?: number;
  requestAccess?: string;
  usePic?: boolean;
  lang?: string;
}>;

export default class TelegramLoginButton extends Component<TelegramLoginButtonProps> {
  private readonly _containerRef = createRef<HTMLDivElement>();

  componentDidMount(): void {
    const {
      botName,
      buttonSize,
      cornerRadius,
      requestAccess,
      usePic,
      onAuthCallback,
      redirectUrl,
      lang,
    } = this.props;

    if (onAuthCallback != null) {
      (window as any).TelegramOnAuthCb = (user: TelegramUser) => onAuthCallback(user);
    }

    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?19';
    script.async = true;

    script.setAttribute('data-telegram-login', botName);
    if (buttonSize != null) {
      script.setAttribute('data-size', buttonSize);
    }
    if (buttonSize != null) {
      script.setAttribute('data-radius', `${cornerRadius}`);
    }
    if (usePic != null) {
      script.setAttribute('data-userpic', `${usePic}`);
    }
    if (lang != null) {
      script.setAttribute('data-lang', lang);
    }
    if (redirectUrl != null) {
      script.setAttribute('data-auth-url', redirectUrl);
    }
    if (onAuthCallback != null) {
      script.setAttribute('data-onauth', 'TelegramOnAuthCb(user)');
    }
    if (requestAccess != null) {
      script.setAttribute('data-request-access', requestAccess);
    }

    this._containerRef.current!.appendChild(script);
  }

  render(): ReactNode {
    return <div className="tlogin-button" ref={this._containerRef} />;
  }
}
