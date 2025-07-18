import React from 'react';
import {
  Box,
  Stepper,
  Step,
  StepButton,
  Button,
  Container,
  useTheme,
  Typography,
} from '@mui/material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Planos } from './Planos';
import { PlanoSelecionado } from './PlanoSelecionado';

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

export const Checkout = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [selectedPlano, setSelectedPlano] = React.useState(null); // <-- aqui
  const theme = useTheme();

  const totalSteps = steps.length;

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    setCompleted((prev) => ({ ...prev, [activeStep]: true }));
    if (activeStep < totalSteps - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setCompleted((prev) => {
        const newCompleted = { ...prev };
        delete newCompleted[activeStep - 1];
        return newCompleted;
      });
      setActiveStep((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
    setSelectedPlano(null);
  };

  const allStepsCompleted = () =>
    Object.keys(completed).length === totalSteps;

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Planos selectedPlano={selectedPlano} setSelectedPlano={setSelectedPlano} />;
      case 1:
        return (
          <PlanoSelecionado plano={selectedPlano}/>
        );
      case 2:
        return <Typography variant="h6">Conteúdo da Etapa 3: Criar o anúncio</Typography>;
      default:
        return null;
    }
  };

  return (
    <Container>
      {/* Stepper */}
      <Box sx={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        mt: 10,
        border: 1,
        borderColor: "divider",
        borderRadius: '15px',
        bgcolor: theme.palette.background.paper,
        p: 3,
      }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <SettingsOutlinedIcon sx={{ fontSize: "50px", color: theme.palette.background.paperAzul }} />
          <Box>
            <Typography sx={{ fontSize: 29, fontWeight: "bolder" }}>Meu plano</Typography>
            <Typography color='textTertiary'>Escolha o melhor plano para você</Typography>
          </Box>
        </Box>
        <Box sx={{ width: '20%' }}>
          <Stepper nonLinear activeStep={activeStep} sx={{
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
          }}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton onClick={handleStep(index)} />
              </Step>
            ))}
          </Stepper>
        </Box>
      </Box>

      <Box sx={{ mt: 10 }}>{getStepContent(activeStep)}</Box>

      {/* Botões */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        {activeStep > 0 && (
          <Button onClick={handleBack} variant="outlined">
            Voltar
          </Button>
        )}

        <Box sx={{ flex: '1 1 auto' }} />

        {allStepsCompleted() ? (
          <Button onClick={handleReset} variant="contained">
            Resetar
          </Button>
        ) : (
          <Button
            onClick={handleComplete}
            variant="contained"
            disabled={activeStep === 0 && !selectedPlano} // não avança sem plano
          >
            {activeStep === totalSteps - 1 ? 'Finalizar' : 'Avançar'}
          </Button>
        )}
      </Box>
    </Container>
  );
};
