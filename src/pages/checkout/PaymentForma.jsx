import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Typography,
  Alert,
  useTheme,
  TextField,
} from "@mui/material";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../config/Api";
import { useThemeMode } from "../../context/ThemeContext";

const CUPOM_VALIDO = "DSX"; // Cupom que você definiu no Stripe
const DESCONTO_PERCENTUAL = 50.51; // 50% de desconto, ajuste conforme quiser

const PaymentForma = ({ selectedPlanId, plano, handleCloseModal }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const theme = useTheme();
  const { darkMode } = useThemeMode();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [isCouponValido, setIsCouponValido] = useState(true);

  // Calcula o preço com desconto, se cupom válido
  const precoComDesconto =
    couponCode.toUpperCase() === CUPOM_VALIDO
      ? plano.preco * (1 - DESCONTO_PERCENTUAL / 100)
      : plano.preco;

  const handleCouponChange = (e) => {
    const valor = e.target.value.toUpperCase();
    setCouponCode(valor);
    setError("");

    if (valor === "") {
      setIsCouponValido(true);
      return;
    }

    if (valor !== CUPOM_VALIDO) {
      setIsCouponValido(false);
      setError("Cupom inválido");
    } else {
      setIsCouponValido(true);
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!stripe || !elements) {
      setError("Stripe ainda não carregou.");
      setLoading(false);
      return;
    }

    if (couponCode !== "" && couponCode !== CUPOM_VALIDO) {
      setError("Cupom inválido");
      setLoading(false);
      return;
    }

    const { error: stripeError, setupIntent } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/painel-usuario/catalogo",
      },
      redirect: "if_required",
    });

    if (stripeError) {
      setError(stripeError.message);
      setLoading(false);
      return;
    }

    const paymentMethodId = setupIntent.payment_method;
    if (!paymentMethodId) {
      setError("Falha ao obter método de pagamento.");
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("token");

    try {
      await api.post(
        "/assinatura",
        {
          metodoPagamento: "CARTAO",
          planoId: selectedPlanId,
          paymentMethodId,
          couponCode: couponCode.trim() || null,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      handleCloseModal?.();
      navigate("/painel-usuario/catalogo");
    } catch (err) {
      setError("Erro ao processar pagamento.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: { xs: "column", md: "row" },
        gap: 5,
      }}
    >
      {/* Informações do plano */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: { xs: "column", md: "row" },
          border: 2,
          borderColor: theme.palette.primary.main,
          borderRadius: 5,
          p: 5,
          bgcolor: theme.palette.background.paper,
          mb: 5,
          cursor: "pointer",
          height: "100%",
          transition: "border 0.2s",
        }}
      >
        <Box sx={{ width: { xs: "100%", md: "45%" }, display: "flex", flexDirection: "column" }}>
          <Box sx={{ width: { xs: "60px", md: "115px" }, height: { xs: "32px", md: "65px" } }}>
            <img
              src={
                plano.intervalo === "year" && darkMode
                  ? "/aseets/logo-brilhante.png"
                  : plano.intervalo === "year" && !darkMode
                  ? "/aseets/logo-color.svg"
                  : "/aseets/logo-azul.png"
              }
              alt="logo"
              style={{ width: "100%", height: "100%" }}
            />
          </Box>
          <Typography color="textPrimary" sx={{ mt: 2 }}>
            Acesso total à plataforma com todas as formações e experiências da Digital Educa.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 1,
            alignItems: { md: "start", xs: "center" },
          }}
        >
          {plano.intervalo === "year" && (
            <Box sx={{ position: "relative", width: "fit-content" }}>
              <img src="/aseets/icone_anual.png" alt="ícone anual" />
              <Typography
                sx={{
                  position: "absolute",
                  top: 8,
                  left: 20,
                  color: theme.palette.text.primary,
                  fontSize: 28,
                  fontWeight: "bolder",
                }}
              >
                1
              </Typography>
            </Box>
          )}
          <Box sx={{ textAlign: "center" }}>
            <Typography color="textPrimary" sx={{ fontSize: { xs: 15, md: 20 } }}>
              Assinatura {plano.nome}
            </Typography>
            <Box
              sx={{
                border: 1,
                borderColor: "divider",
                p: 1,
                borderRadius: 5,
                mt: 1,
              }}
            >
              <Typography color="textPrimary" sx={{ fontSize: { md: 15, xs: 12 } }}>
                {plano.nome}
              </Typography>
            </Box>
           <Typography color="textSecondary" sx={{mt:2,fontSize:18,textDecoration:"line-through"}}>de R$ 149 por</Typography>
            <Typography sx={{ fontSize: { md: 38, xs: 20 }, fontWeight: "bolder", mt: 2 }}>
              R$ {precoComDesconto.toFixed(2)}
            </Typography>
            {!isCouponValido && (
              <Typography color="error" sx={{ mt: 1 }}>
                Cupom inválido
              </Typography>
            )}
          </Box>
        </Box>
      </Box>

      {/* Card com o formulário de pagamento */}
      <Card sx={{ width: { xs: "100%", md: "55%" } }}>
        <CardHeader title="Informações de pagamento" />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 2 }}>
              <PaymentElement />
            </Box>

            {/* <TextField
              type="text"
              placeholder="Cupom de desconto"
              value={couponCode}
              onChange={handleCouponChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                marginBottom: "16px",
                fontSize: "14px",
              }}
              error={!isCouponValido}
              helperText={!isCouponValido ? "Cupom inválido" : ""}
            /> */}

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <CardActions>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: theme.palette.primary.main,
                  color: theme.palette.text.primary,
                  fontWeight: "bolder",
                }}
                fullWidth
                disabled={!stripe || loading || !isCouponValido}
              >
                {loading ? <CircularProgress size={20} color="inherit" /> : `Finalizar - R$ ${precoComDesconto.toFixed(2)}`}
              </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PaymentForma;
