import { Box, Button, Typography } from "@mui/material";
import theme from "../../../theme/theme";
import dayjs from "dayjs";
import { Warning } from "@mui/icons-material";
import { useEffect, useState } from "react";
import api from "../../../config/Api";
import { ModalMetodoPagamento } from "./ModalMetodoPagamento";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51Rkqnl4UJY192FzeyHoJGjBYq3ZI6iJFhkk1F5ZFCbEDxUQAbjD2aRU4E8jggtzaXGr71uxBQVNe7bugB0t7pTfu00CM9glODz"
);

export const AssinaturaCancelada = ({ usuario, planos }) => {
  const [planoSelecionado, setPlanoSelecionado] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);

  const token = localStorage.getItem("token");

  // Função para iniciar o setup de pagamento (SetupIntent)
  const handleAssinarPlano = async (plano) => {
    setPlanoSelecionado(plano);
    try {
      const res = await api.post(
        "/assinatura/setup-intent",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.clientSecret) {
        setClientSecret(res.data.clientSecret);
      } else {
        console.error("clientSecret inválido");
      }
    } catch (error) {
      console.error("Erro ao buscar clientSecret", error);
    }
  };

  // Fechar modal do método de pagamento
  const handleCloseModal = () => {
    setClientSecret(null);
    setPlanoSelecionado(null);
  };

  // Reativar assinatura via API
  const handleReativarAssinatura = async () => {
    try {
      const res = await api.patch(
        "/assinatura/reativar",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert(res.data.message);
      window.location.reload();
    } catch (error) {
      console.error("Erro ao reativar assinatura", error);
      alert(error.response?.data?.message || "Erro ao reativar assinatura.");
    }
  };

  // Variáveis de controle de lógica
 const status = usuario?.assinatura?.status;
  const cancelAtPeriodEnd = usuario?.assinatura?.cancelAtPeriodEnd;
  const dataFim = usuario?.assinatura?.dataFim ? dayjs(usuario.assinatura.dataFim) : null;
  const hoje = dayjs();

  const podeReativar =
    status === "ATIVA" &&
    cancelAtPeriodEnd === true &&
    dataFim &&
    dataFim.isAfter(hoje);

  const precisaAssinarPlano =
    status === "CANCELADA" || !usuario?.assinatura || !podeReativar;

    useEffect(() => {
  setPlanoSelecionado(null);
  setClientSecret(null);
}, [usuario]);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          gap: 5,
          bgcolor: theme.palette.secondary.light,
          p: 5,
          borderRadius: 3,
          mt: 2,
        }}
      >
        <Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Warning color="warning" />
            <Typography sx={{ fontWeight: "bolder", fontSize: 16 }}>
              Assinatura Cancelada
            </Typography>
          </Box>
          <Typography color="textSecondary">
            Seu acesso expira em{" "}
            {dataFim ? dataFim.format("DD/MM/YYYY") : "-"}
          </Typography>
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              bgcolor: "warning.main",
              p: 1,
              borderRadius: 1,
            }}
          >
            <Typography sx={{ fontWeight: "bolder", fontSize: 16 }}>
              {status || "N/A"}
            </Typography>
          </Box>
          <Typography>
            Último plano: {usuario.assinatura?.plano || "Nenhum"}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          p: 2.5,
          borderRadius: 3,
          mt: 2,
          bgcolor: theme.palette.secondary.light,
        }}
      >
        {podeReativar && (
          <>
            <Typography sx={{ fontWeight: "bolder", fontSize: 16 }}>
              Reativar Assinatura
            </Typography>
            <Typography color="textSecondary" mb={2}>
              Reative sua assinatura a qualquer momento e continue aproveitando
              todos os benefícios.
            </Typography>
            <Button
              variant="contained"
              sx={{ fontWeight: "bolder", mt: 1 }}
              onClick={handleReativarAssinatura}
            >
              Reativar
            </Button>
          </>
        )}

        {precisaAssinarPlano && (
          <>
            <Typography sx={{ fontWeight: "bolder", fontSize: 16, mb: 1 }}>
              Assinar Novo Plano
            </Typography>
            {Array.isArray(planos) &&
              planos.map((plano) => (
                <Box
                  key={plano.id}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    mt: 2,
                    border: 1,
                    borderColor: "divider",
                    p: 2.5,
                    borderRadius: 1,
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box>
                      <Typography sx={{ fontWeight: "bolder", fontSize: 16 }}>
                        {plano.nome}
                      </Typography>
                      <Typography color="textSecondary">{plano.descricao}</Typography>
                    </Box>
                    <Box sx={{ textAlign: "end" }}>
                      <Typography sx={{ fontWeight: "bolder", fontSize: 20 }}>
                        R$ {plano.preco.toFixed(2)}
                      </Typography>
                      <Button
                        variant="contained"
                        sx={{ fontWeight: "bolder", mt: 2 }}
                        onClick={() => handleAssinarPlano(plano)}
                      >
                        Assinar
                      </Button>
                    </Box>
                  </Box>
                </Box>
              ))}
          </>
        )}

        {clientSecret && planoSelecionado && (
          <Elements
            stripe={stripePromise}
            options={{ clientSecret, appearance: { theme: "night" } }}
          >
            <ModalMetodoPagamento
              openModal={true}
              handleCloseModal={handleCloseModal}
              planoSelecionado={planoSelecionado}
            />
          </Elements>
        )}
      </Box>
    </Box>
  );
};