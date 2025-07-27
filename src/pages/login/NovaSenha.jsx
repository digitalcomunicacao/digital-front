
import { useNavigate, useSearchParams } from 'react-router-dom'; // ou useRouter no Next.js
import { TextField, Button, Typography, Container, Box, IconButton, InputAdornment, useTheme } from '@mui/material';
import api from '../../config/Api';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useSnackbar } from '../../context/SnackBarContext';
import { useThemeMode } from '../../context/ThemeContext';

export const NovaSenha = () => {
  const [novaSenha, setNovaSenha] = useState('');
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { darkMode, toggleTheme } = useThemeMode();
  const [confirmSenha, setConfirmSenha] = useState("");
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmSenha, setShowConfirmSenha] = useState(false);
  const toggleShowSenha = () => setShowSenha((prev) => !prev);
  const toggleShowConfirmSenha = () => setShowConfirmSenha((prev) => !prev);
  const { showSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const theme = useTheme();
  const handleNovaSenha = async (e) => {
    setLoading(true)
    e.preventDefault();
    if (confirmSenha !== novaSenha) {
      showSnackbar("As senhas não coincidem!", "error");
      setLoading(false)
      return;
    }
    api.post('reset-password/confirm', {
      token,
      novaSenha,
    }).then(function (response) {
      showSnackbar(response.data.message, "success")
      navigate('/login')
      console.log(response)
      setLoading(false)
    }).catch(function (error) {
      showSnackbar(error.response.data.message, "error")
      setLoading(false)
    })
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",

      }}
    >
      <Box
        sx={{
          flex: 1,
          background: "radial-gradient(circle at top left, #1E2A46, #0A1128)", // Azul escuro com um leve brilho
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Box sx={{ width: { xs: "100%", sm: "80%", md: "60%", lg: "45%", xl: "25%" }, height: { xs: "100%", sm: "600px" }, p: 5, boxShadow: 2, bgcolor: theme.palette.secondary.main, borderRadius: 2, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Box sx={{ width: "150px", height: "auto" }}>
            <img src='/aseets/logo-digital-educa.png' style={{ width: "100%", height: "100%" }} />
          </Box>
          <Typography color='textSecondary' sx={{ mt: 2, fontWeight: 'bolder', fontSize: 24, mt: 5 }}>Digite uma nova senha</Typography>

          <Box component={'form'} onSubmit={handleNovaSenha} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Senha"
              required
              placeholder="Deve ter no mínimo 6 caracteres"
              type={showSenha ? "text" : "password"}
              sx={{ mt: 5 }}
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
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
              sx={{ mt: 5 }}
              value={confirmSenha}
              onChange={(e) => setConfirmSenha(e.target.value)}
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

            <Button
              loading={loading}
              loadingPosition="start"
              fullWidth
              variant="contained"
              type="submit"
              sx={{
                mt: 5,
                py: 2,
                fontSize: "16px",
                fontWeight: "bold",
                textTransform: "none",
                borderRadius: 2,
                backgroundColor: "#FFB800", // Amarelo da logo
                color: "#0A1128",            // Azul escuro para contraste
                boxShadow: "0 8px 24px rgba(255, 184, 0, 0.3)",
                "&:hover": {
                  backgroundColor: "#e6a900", // Tom mais escuro do amarelo
                  boxShadow: "0 12px 36px rgba(255, 184, 0, 0.4)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
                mb: 4,
              }}
            >
              Redefinir Senha
            </Button>
          </Box>

        </Box>
      </Box>
    </Box>
  );
};

