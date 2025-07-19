import React, { useEffect, useState } from 'react';
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
import { useSnackbar } from '../../context/SnackBarContext';
import api from '../../config/Api';
import PaymentForma from './PaymentForma';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];
const stripePromise = loadStripe(
  "pk_test_51Rkqnl4UJY192FzeyHoJGjBYq3ZI6iJFhkk1F5ZFCbEDxUQAbjD2aRU4E8jggtzaXGr71uxBQVNe7bugB0t7pTfu00CM9glODz"
);

export const Checkout = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [selectedPlano, setSelectedPlano] = React.useState(null); // <-- aqui
  const [clientSecret, setClientSecret] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [usuarioData, setUsuarioData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmSenha: '',
    celular: '',
  });

  const theme = useTheme();
  const { showSnackbar } = useSnackbar();
  const totalSteps = steps.length;

  const handleStep = (step) => () => {
    setActiveStep(step);
  };


  useEffect(() => {
    if (!token) return; // só roda se token existir

    const fetchClientSecret = async () => {
      try {
        const res = await api.post(
          "/assinatura/setup-intent",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setClientSecret(res.data.clientSecret);
      } catch (error) {
        showSnackbar("Erro ao buscar clientSecret", "error");
      }
    };

    fetchClientSecret();
  }, [token]);

  const cadastrarUsuario = async () => {
    if (usuarioData.senha !== usuarioData.confirmSenha) {
      showSnackbar("As senhas não coincidem", "error");
      return false;
    }
    try {
      await api.post("usuario/create", {
        nome: usuarioData.nome,
        email: usuarioData.email,
        senha: usuarioData.senha,
        celular: usuarioData.celular,
      });

      const response = await api.post("auth/login", {
        email: usuarioData.email,
        senha: usuarioData.senha,
      });

      localStorage.setItem("token", response.data.access_token);
      setToken(response.data.access_token); // atualiza o estado token aqui
      return true;
    } catch (error) {
      console.log(error);
      showSnackbar(error.response?.data?.message || "Erro ao cadastrar", "error");
      return false;
    }
  };


  const handleComplete = async () => {
    // Quando estiver na etapa de cadastro (step 1)
    if (activeStep === 1) {
      const sucesso = await cadastrarUsuario();
      if (!sucesso) return; // não avança se falhar
    }

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
          <PlanoSelecionado
            plano={selectedPlano}
            usuarioData={usuarioData}
            setUsuarioData={setUsuarioData}
          />
        );
      case 2:
        if (!clientSecret) {
          return <Typography>Carregando método de pagamento...</Typography>;
        }
        if (!selectedPlano) {
          return <Typography>Por favor, selecione um plano antes de continuar.</Typography>;
        }
        return (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentForma plano={selectedPlano} selectedPlanId={selectedPlano.id} />
          </Elements>
        );
      default:
        return null;
    }
  };


  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: 'auto', md: '100vh' },
        width: '100%',
        overflowY: { xs: 'auto', md: 'hidden' }, // scroll só no mobile
        overflowX: 'hidden',
      }}
    >

      <Box
        component="img"
        src="aseets/background-image-checkout.png"
        alt="background"
        sx={{
          position: 'absolute',
          top: { xs: 0, md: 100 },
          left: 0,
          height: '100%',
          width: '100%',
          objectFit: 'cover',
          objectPosition: { xs: '0% 18%', md: '0% 15%' }, // fixo no mobile
          animation: {
            xs: 'moveBackground 30s linear infinite alternate', // sem animação no mobile
            md: 'moveBackground 5s linear infinite alternate', // animação só no desktop
          },
          mixBlendMode: 'screen',
          pointerEvents: 'none',
          userSelect: 'none',
          '@keyframes moveBackground': {
            '0%': {
              objectPosition: '0% 18%',
            },
            '100%': {
              objectPosition: '100% 20%',
            },
          },
        }}
      />

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

    </Box>
  );
};
