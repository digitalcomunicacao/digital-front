// components/PaymentForm.jsx
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
} from "@mui/material";
import { CreditCard } from "@mui/icons-material";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../config/Api";

const cardStyle = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const PaymentForm = ({ selectedPlanId, selectedPlan }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/assinatura",
        {
          metodoPagamento: "CARTAO",
          planoId: selectedPlanId,
          paymentMethodId: paymentMethod.id,
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
          <Box sx={{ border: "1px solid #ccc", borderRadius: 2, p: 2, mb: 2 }}>
            <CardElement options={cardStyle} />
          </Box>

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
              startIcon={<CreditCard />}
            >
              {loading ? <CircularProgress size={20} color="inherit" /> : `Finalizar - R$ ${selectedPlan?.preco.toFixed(2)}`}
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
};

export default PaymentForm;
