import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  useTheme,
  Typography,
} from '@mui/material';
import { Planos } from './Planos';
import { PlanoSelecionado } from './PlanoSelecionado';
import { useSnackbar } from '../../context/SnackBarContext';
import api from '../../config/Api';
import PaymentForma from './PaymentForma';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { HeaderCheckout } from './HeaderCheckout';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { HeaderPayment } from '../../components/header/HeaderPayment';

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];
const stripePromise = loadStripe(
  "pk_test_51Rnh22B2ukqKBRKpu7vmzpy9tGj7bQh3GA7fnxQlqXkxk5VHIttkglAYcfivKQA5u201Aq30hTJVnHcMUdFTfAi500L9MnXJNG"
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
    if (activeStep === totalSteps - 1 && step < activeStep) {
      showSnackbar("Você já concluiu o cadastro. Não é possível voltar.", "warning");
      return;
    }

    setActiveStep(step);
  };

  const validarCamposUsuario = () => {
    const { nome, email, senha, confirmSenha, celular } = usuarioData;

    if (!nome || !email || !senha || !confirmSenha || !celular) {
      showSnackbar("Preencha todos os campos obrigatórios", "error");
      return false;
    }

    if (senha.length < 6) {
      showSnackbar("A senha deve ter no mínimo 6 caracteres", "error");
      return false;
    }

    if (senha !== confirmSenha) {
      showSnackbar("As senhas não coincidem", "error");
      return false;
    }

    return true;
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
  if (activeStep === 1 && !token) {
    const valido = validarCamposUsuario();
    if (!valido) return;

    const sucesso = await cadastrarUsuario();
    if (!sucesso) return;
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
  isLogado={!!token}
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
  
    <Box>

    <HeaderPayment/>
      <Container>
        {/* Stepper */}
        <HeaderCheckout
          activeStep={activeStep}
          completed={completed}
          handleStep={handleStep}
          theme={theme}
          steps={steps}
        />
        <Box sx={{ mt: 10 }}>{getStepContent(activeStep)}</Box>

        {/* Botões */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          {activeStep > 0 && (
            <Button onClick={handleBack} variant="outlined"
              sx={{borderRadius:"15px",color:theme.palette.text.secondary,fontWeight:"bold",fontSize:17}}
              startIcon={<ArrowBack sx={{ fontSize: "50px", color: theme.palette.background.paperAzul }} />}>
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
              variant="outlined"
              sx={{borderRadius:"15px",color:theme.palette.text.primary,fontWeight:"bold",fontSize:17}}
              endIcon={<ArrowForward sx={{ fontSize: "50px", color: theme.palette.background.paperAzul }} />}
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
