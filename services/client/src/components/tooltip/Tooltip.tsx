import InfoIcon from '../../assets/icons/Info';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { StyledTooltip } from './Tooltip.styled';

export interface TooltipProps {
  className?: string;
  message: string;
}

const Tooltip = ({ message, className }: TooltipProps) => {
  return (
    <StyledTooltip className={className}>
      <Tippy content={message}>
        <div>
          <InfoIcon />
        </div>
      </Tippy>
    </StyledTooltip>
  );
};

export default Tooltip;
