import InfoIcon from '../../assets/icons/Info';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { StyledTooltip } from './Tooltip.styled';

export interface TooltipProps {
  message: string;
}

const Tooltip = ({ message }: TooltipProps) => {
  return (
    <StyledTooltip>
      <Tippy content={message}>
        <div>
          <InfoIcon />
        </div>
      </Tippy>
    </StyledTooltip>
  );
};

export default Tooltip;
