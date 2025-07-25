import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Box, Button, Alert } from '@mui/material';
import api from '../../../config/Api';

const UpdatePaymentMethodForm = ({ onSuccess, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    setErrorMessage(null);

    // Aqui confirmamos o SetupIntent, não PaymentIntent!
    const { error, setupIntent } = await stripe.confirmSetup({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    try {
      // Envia para seu backend o novo paymentMethodId
      await api.patch(
        "/assinatura/metodo-pagamento",
        { paymentMethodId: setupIntent.payment_method },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      setLoading(false);
      if (onSuccess) onSuccess();
      if (onClose) onClose();

    } catch (backendError) {
      setErrorMessage("Erro ao atualizar método no servidor");
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <PaymentElement />
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <Button type="submit" variant="contained" disabled={!stripe || loading}>
        {loading ? "Atualizando..." : "Atualizar Método de Pagamento"}
      </Button>
    </Box>
  );
};

export default UpdatePaymentMethodForm;
