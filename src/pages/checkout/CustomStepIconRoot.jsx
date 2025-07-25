import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { styled } from '@mui/material/styles';

const CustomStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: ownerState.completed ? theme.palette.primary.dark : theme.palette.grey[300],
  color: '#fff',
  zIndex: 1,
  width: 40,
  height: 40,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundColor: theme.palette.primary.main,
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
}));

export function CustomStepIcon(props) {
  const { active, completed, className, icon } = props;

  const icons = {
    1: <SettingsOutlinedIcon />,
    2: <PersonOutlineIcon />,
    3: <CreditCardIcon />,
  };

  return (
    <CustomStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(icon)]}
    </CustomStepIconRoot>
  );
}
