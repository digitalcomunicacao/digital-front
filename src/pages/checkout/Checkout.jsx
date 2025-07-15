// pages/Checkout.jsx
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import api from "../../config/Api";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(
  "pk_test_51Rkqnl4UJY192FzeyHoJGjBYq3ZI6iJFhkk1F5ZFCbEDxUQAbjD2aRU4E8jggtzaXGr71uxBQVNe7bugB0t7pTfu00CM9glODz"
);

export const Checkout = () => {
  const [planos, setPlanos] = useState([]);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    const fetchClientSecret = async () => {
      const token = localStorage.getItem("token");
      const res = await api.post(
        "/assinatura/setup-intent",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setClientSecret(res.data.clientSecret);
    };

    fetchClientSecret();
  }, []);

  useEffect(() => {
    api
      .get("/planos")
      .then((res) => {
        setPlanos(res.data);
        if (res.data.length > 0) {
          setSelectedPlanId(res.data[0].id);
          setSelectedPlan(res.data[0]);
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const found = planos.find((p) => p.id === selectedPlanId);
    setSelectedPlan(found || null);
  }, [selectedPlanId, planos]);

  const appearance = {
  theme: 'night', // ou 'flat', 'night', 'none'

};

  const options = {
    clientSecret,
    appearance,
  };

  if (!clientSecret) {
    return (
      <Container maxWidth="md" sx={{ py: 5, textAlign: "center" }}>
        <Typography variant="h6">Carregando informações de pagamento...</Typography>
      </Container>
    );
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
          Escolha seu plano
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Planos disponíveis" />
              <CardContent>
                <RadioGroup
                  value={selectedPlanId}
                  onChange={(e) => setSelectedPlanId(Number(e.target.value))}
                >
                  {planos.map((plano) => (
                    <FormControlLabel
                      key={plano.id}
                      value={plano.id}
                      control={<Radio />}
                      label={`${plano.nome} - R$ ${plano.preco.toFixed(2)}`}
                    />
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <PaymentForm selectedPlanId={selectedPlanId} selectedPlan={selectedPlan} />
          </Grid>
        </Grid>
      </Container>
    </Elements>
  );
};

export default Checkout;
