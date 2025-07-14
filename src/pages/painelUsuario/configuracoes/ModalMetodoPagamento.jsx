import { Modal, Backdrop, Fade, Box, Typography, Button } from "@mui/material";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import api from "../../../config/Api";

export const ModalMetodoPagamento = ({ openModal, handleCloseModal }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  if (!stripe || !elements) {
    setError("Stripe ainda não carregou.");
    setLoading(false);
    return;
  }

  const { error: confirmError, setupIntent } = await stripe.confirmSetup({
    elements,
    confirmParams: {
      return_url: window.location.origin, // pode ser qualquer URL, mas não redireciona com redirect: 'if_required'
    },
    redirect: "if_required",
  });

  if (confirmError) {
    setError(confirmError.message);
    setLoading(false);
    return;
  }

  const paymentMethodId = setupIntent?.payment_method;

  if (!paymentMethodId) {
    setError("paymentMethodId não encontrado.");
    setLoading(false);
    return;
  }

  try {
    const token = localStorage.getItem("token");
    await api.patch(
      "/assinatura/metodo-pagamento",
      { paymentMethodId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // Sucesso!
    handleCloseModal();
    window.location.reload(); // ou recarregue o estado da conta
  } catch (err) {
    setError("Erro ao atualizar método de pagamento.");
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
    >
      <Fade in={openModal}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", md: 500 },
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            outline: "none",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Alterar Forma de Pagamento
          </Typography>

          <PaymentElement />

          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button variant="outlined" onClick={handleCloseModal} disabled={loading}>
              Cancelar
            </Button>
            <Button
              variant="contained"
              type="submit"
              sx={{ ml: 2 }}
              disabled={!stripe || loading}
            >
              {loading ? "Processando..." : "Salvar"}
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};
