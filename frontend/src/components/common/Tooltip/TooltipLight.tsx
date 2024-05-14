import Tooltip, { TooltipProps } from '@mui/material/Tooltip';
import withStyles from '@mui/styles/withStyles';
import { ReactElement, ReactNode } from 'react';

export interface TooltipLightProps extends Omit<TooltipProps, 'children'> {
  /**
   * If true, the tooltip will be interactive. Defaults to true.
   *
   * If a tooltip is interactive, it will close when the user hovers over the tooltip before the leaveDelay is expired.
   */
  interactive?: boolean;
  children: ReactNode;
}

const StyledTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.resourceToolTip.color,
    boxShadow: theme.shadows[1],
    fontSize: '1rem',
    whiteSpace: 'pre-line',
  },
}))(Tooltip);

export default function TooltipLight(props: TooltipLightProps) {
  const { children, interactive = true, ...rest } = props;
  const disableInteractive = !interactive;

  if (typeof children === 'string') {
    return (
      <StyledTooltip disableInteractive={disableInteractive} {...rest}>
        <span>{children}</span>
      </StyledTooltip>
    );
  }

  return (
    <StyledTooltip
      {...props}
      // children prop in the mui Tooltip is defined as ReactElement which is not totally correct
      // string should be a valid child and is used a lot in this project
      // but it's not included in the ReactElement type
      children={props.children as unknown as ReactElement}
    />
  );
}
