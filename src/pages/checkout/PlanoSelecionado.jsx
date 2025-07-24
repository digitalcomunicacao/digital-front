import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import InputMask from 'react-input-mask';

export const PlanoSelecionado = ({ plano, usuarioData, setUsuarioData, isLogado }) => {
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmSenha, setShowConfirmSenha] = useState(false);
  const toggleShowSenha = () => setShowSenha((prev) => !prev);
  const toggleShowConfirmSenha = () => setShowConfirmSenha((prev) => !prev);

  const theme = useTheme();

  const handleChange = (field) => (e) => {
    setUsuarioData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", gap: 5, flexDirection: { xs: "column", md: "row" } }}>
      {/* Bloco do plano */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          borderRadius: 5,
          p: 5,
          bgcolor: theme.palette.background.paper,
          border: 1,
          borderColor: theme.palette.background.paperAzul,
          width: { xs: "100%", md: !isLogado ? "55%" :"100%"},
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
          <Typography color="textPrimary" sx={{ mt: 2 }}>
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
            <Typography color="textPrimary" sx={{ fontSize: 20 }}>
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
              <Typography color="textPrimary" sx={{ fontSize: 22 }}>
                {plano.nome}
              </Typography>
            </Box>
            <Typography sx={{ fontSize: 35, fontWeight: "bolder", mt: 2 }}>
              R$ {plano.preco.toFixed(2)}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Bloco de cadastro — apenas se não estiver logado */}
      {!isLogado && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            border: 1,
            borderRadius: 5,
            p: 5,
            bgcolor: theme.palette.background.paper,
            borderColor: theme.palette.background.paperAzul,
            width: { xs: "100%", md: "55%" },
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Typography sx={{ mb: 2 }}>Dados Pessoais</Typography>

            <TextField
              fullWidth
              required
              label="Nome Completo"
              value={usuarioData.nome}
              onChange={handleChange("nome")}
            />

            <Box sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              gap: 2,
              mt: 2
            }}>
              <InputMask
                mask="(99) 99999-9999"
                value={usuarioData.celular}
                onChange={handleChange("celular")}
              >
                {(inputProps) => (
                  <TextField
                    {...inputProps}
                    label="Celular"
                    variant="outlined"
                    required
                    sx={{ width: "100%" }}
                  />
                )}
              </InputMask>
              <TextField
                label="Email"
                required
                sx={{ width: "100%" }}
                value={usuarioData.email}
                onChange={handleChange("email")}
              />
            </Box>

            <Typography sx={{ mt: 3 }}>Defina uma senha de acesso</Typography>

            <Box sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              gap: 2,
              mt: 2
            }}>
              <TextField
                label="Senha"
                required
                placeholder="Deve ter no mínimo 6 caracteres"
                type={showSenha ? "text" : "password"}
                value={usuarioData.senha}
                onChange={handleChange("senha")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={toggleShowSenha} edge="end">
                        {showSenha ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                required
                label="Confirme sua senha"
                placeholder="Repita sua senha"
                type={showConfirmSenha ? "text" : "password"}
                value={usuarioData.confirmSenha}
                onChange={handleChange("confirmSenha")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={toggleShowConfirmSenha} edge="end">
                        {showConfirmSenha ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};
