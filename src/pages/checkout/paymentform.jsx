import {
  Box, Button, Card, CardActions, CardContent, CardHeader, CircularProgress, Typography, Alert
} from "@mui/material";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../config/Api";

const PaymentForm = ({ selectedPlanId, selectedPlan }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState(null);
  const [couponCode, setCouponCode] = useState("");

  useEffect(() => {
    const fetchClientSecret = async () => {
      const token = localStorage.getItem("token");
      const res = await api.post("/assinatura/setup-intent", {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClientSecret(res.data.clientSecret);
    };

    fetchClientSecret();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!stripe || !elements) return;

    const { error, setupIntent } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/painel-usuario/catalago", // ou sua rota
      },
      redirect: 'if_required',
    });

    if (error) {
      setError(error.message);
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
          paymentMethodId: setupIntent.payment_method,
          couponCode: couponCode.trim() || null,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate("/painel-usuario/catalago");
    } catch (err) {
      setError("Erro ao criar assinatura.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card elevation={8}>
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
                : `Finalizar - R$ ${selectedPlan?.preco.toFixed(2)}`}
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
};

export default PaymentForm;
