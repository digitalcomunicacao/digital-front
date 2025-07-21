import { Box, Typography, Stepper, Step, StepButton } from '@mui/material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

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
        display: "flex", justifyContent: "space-between", alignItems: "center",flexDirection:{xs:"column",md:"row"},
        mt: 10,
        border: 1,
        borderColor: "divider",
        borderRadius: '15px',
        bgcolor: theme.palette.background.paper,
        p: 3,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <SettingsOutlinedIcon sx={{ fontSize: "50px", color: theme.palette.background.paperAzul }} />
        <Box>
          <Typography sx={{ fontSize: 29, fontWeight: "bolder" }}>{title}</Typography>
          <Typography color='textTertiary'>{subtitle}</Typography>
        </Box>
      </Box>

      <Box sx={{ width: {xs:"100%",md:"30%"},mt:{xs:2,md:0}}}>
        <Stepper
          nonLinear
          activeStep={activeStep}
          sx={{
            '& .MuiStepConnector-line': {
              borderTopWidth: 3,
            },
            '& .MuiStepIcon-root': {
              color: theme.palette.background.paperAzul,
            },
            '& .MuiStepIcon-root.Mui-completed': {
              color: theme.palette.primary.main,
            },
            '& .MuiStepIcon-text': {
              display: 'none',
            },
          }}
        >
          {steps.map((_, index) => (
            <Step key={index} completed={completed[index]}>
              <StepButton onClick={handleStep(index)} />
            </Step>
          ))}
        </Stepper>
      </Box>
    </Box>
  );
};
