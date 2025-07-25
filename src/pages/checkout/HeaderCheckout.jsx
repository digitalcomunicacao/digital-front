import { Box, Typography, Stepper, Step, StepButton, StepLabel } from '@mui/material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { CustomStepIcon } from './CustomStepIconRoot';
import { CustomConnector } from './CustomStepConnector';

const stepContent = [
  {
    title: "Meu plano",
    subtitle: "Escolha o melhor plano para você",
  },
  {
    title: "Seus dados",
    subtitle: "Preencha suas informações pessoais",
  },
  {
    title: "Pagamento",
    subtitle: "Informe o método de pagamento",
  },
];

export const HeaderCheckout = ({ activeStep, completed, handleStep, theme, steps }) => {
  const { title, subtitle } = stepContent[activeStep] || {};

  return (
    <Box
      sx={{
        display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: { xs: "column", md: "row" },
        mt: 10,
        border: 1,
        borderColor: "divider",
        borderRadius: '15px',
        bgcolor: theme.palette.background.paper,
        p: 3,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box>
          <img src='/aseets/icon-digitaleduca.png'/>
        </Box>
        <Box>
          <Typography sx={{ fontSize: 29, fontWeight: "bolder" }}>{title}</Typography>
          <Typography color='textSecondary'>{subtitle}</Typography>
        </Box>
      </Box>

      <Box sx={{ width: { xs: "100%", md: "30%" }, mt: { xs: 2, md: 0 } }}>
        <Stepper
          nonLinear
          activeStep={activeStep}
           connector={<CustomConnector />}
        
        >
          {steps.map((_, index) => (
            <Step key={index} completed={completed[index]}>
              <StepLabel StepIconComponent={CustomStepIcon} />

            </Step>
          ))}
        </Stepper>
      </Box>
    </Box>
  );
};
