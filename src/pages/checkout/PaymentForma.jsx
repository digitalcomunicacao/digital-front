import {
  Box, Button, Card, CardActions, CardContent, CardHeader, CircularProgress, Typography, Alert,
  useTheme
} from "@mui/material"
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../config/Api"

const PaymentForma = ({ selectedPlanId, plano, handleCloseModal }) => {
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()
  const theme=useTheme()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [couponCode, setCouponCode] = useState("")

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  if (!stripe || !elements) {
    setError("Stripe ainda não carregou.");
    setLoading(false);
    return;
  }

  // 1) Confirma a coleta do método de pagamento no Stripe (SetupIntent)
  const { error: stripeError, setupIntent } = await stripe.confirmSetup({
    elements,
    confirmParams: {
      return_url: window.location.origin + "/painel-usuario/catalago",
    },
    redirect: "if_required",
  });

  if (stripeError) {
    setError(stripeError.message);
    setLoading(false);
    return;
  }

  // 2) Pega o paymentMethodId retornado
  const paymentMethodId = setupIntent.payment_method;
  if (!paymentMethodId) {
    setError("Falha ao obter método de pagamento.");
    setLoading(false);
    return;
  }

  const token = localStorage.getItem("token");

  try {
    // 3) Envia para o backend para criar a assinatura
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

    // 4) Sucesso: fecha modal e redireciona
    handleCloseModal?.();
    navigate("/painel-usuario/catalago");
  } catch (err) {
    setError("Erro ao processar pagamento.");
    console.error(err);
  } finally {
    setLoading(false);
  }
};


  return (
    <Box sx={{ display: "flex", justifyContent: "space-between",  flexDirection: { xs: "column", md: "row" },gap: 5,  }}>

     <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          borderRadius: 5,
          p: 5,
          bgcolor: theme.palette.background.paper,
          border: 1,
          borderColor: theme.palette.background.paperAzul,
    width: {xs:"100%",md:"55%"},
          height:"50%"
        }}
      >
        <Box sx={{ width: "45%" }}>
          <Box sx={{ width: "115px", height: "65px" }}>
            <img
              src={
                plano.intervalo === "year"
                  ? "aseets/logo-dark.png"
                  : "aseets/logo-prata.png"
              }
              alt="logo"
              style={{ width: "100%", height: "100%" }}
            />
          </Box>
          <Typography color="textTertiary" sx={{ mt: 2}}>
            Acesso total à plataforma com todas as formações e experiências da Digital Educa.
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1, alignItems: "start" }}>
          <Box sx={{ position: "relative", width: "fit-content" }}>
            <img src="/aseets/icone_anual.png" alt="ícone anual" />
            <Typography
              sx={{
                position: "absolute",
                top: 8,
                left: 20,
                color: theme.palette.text.primary,
                fontSize: 28,
                fontWeight: "bold",
              }}
            >
              1
            </Typography>
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Typography color="textTertiary" sx={{ fontSize: 20 }}>
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
              <Typography color="textTertiary" sx={{ fontSize: 22 }}>
                {plano.nome}
              </Typography>
            </Box>
            <Typography sx={{ fontSize: 35, fontWeight: "bolder", mt: 2 }}>
              R$ {plano.preco.toFixed(2)}
            </Typography>
          </Box>
        </Box>
      </Box>
    <Card sx={{width: {xs:"100%",md:"55%"}}}>
      <CardHeader title="Informações de pagamento" />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }}>
            <PaymentElement />
          </Box>

          <input
            type="text"
            placeholder="Cupom de desconto"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              marginBottom: "16px",
              fontSize: "14px",
            }}
          />

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <CardActions>
            <Button
              type="submit"
              variant="contained"
              color="warning"
              fullWidth
              disabled={!stripe || loading}
            >
              {loading
                ? <CircularProgress size={20} color="inherit" />
                : `Finalizar - R$ ${plano?.preco.toFixed(2)}`
              }
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
       </Box>
  )
}

export default PaymentForma
