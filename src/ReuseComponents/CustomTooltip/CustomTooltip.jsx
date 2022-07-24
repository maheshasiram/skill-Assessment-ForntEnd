import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));


 function CustomTooltip(props) {
  return (
      <BootstrapTooltip TransitionComponent={Zoom} title={props.title} >
      {props.children}
      </BootstrapTooltip>
  );
}
export default CustomTooltip;