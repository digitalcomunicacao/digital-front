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
import { Elements } from "@stripe/react-stripe-js";
import api from "../../config/Api";
import PaymentForm from "./paymentform";

const stripePromise = loadStripe("pk_test_51RgWBvGbLRuNST5uoIBM0sO8W7tWdtKtQJut92Df6gREEac7rVLVphhslgWK3xVdrz1RN7Q4jGauul188L8UCKL400B66SnW8C");

export const Checkout = () => {
  const [planos, setPlanos] = useState([]);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    api.get("/planos")
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

  return (
    <Elements stripe={stripePromise}>
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
                      label={`${plano.nome} - R$ ${plano.preco.toFixed(2)} por ${plano.duracaoDias} dias`}
                    />
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            <Box mt={4}>
              <Card>
                <CardHeader title="Resumo do pedido" />
                <CardContent>
                  {selectedPlan && (
                    <>
                      <Box display="flex" justifyContent="space-between">
                        <Typography>Plano</Typography>
                        <Typography>{selectedPlan.nome}</Typography>
                      </Box>
                      <Box display="flex" justifyContent="space-between">
                        <Typography>Preço</Typography>
                        <Typography>R$ {selectedPlan.preco.toFixed(2)}</Typography>
                      </Box>
                      <Divider sx={{ my: 2 }} />
                      <Typography variant="body2" color="text.secondary">
                        Acesso por {selectedPlan.duracaoDias} dias. Renovação automática.
                      </Typography>
                    </>
                  )}
                </CardContent>
              </Card>
            </Box>
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
