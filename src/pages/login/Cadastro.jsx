import { Box, Button, IconButton, InputAdornment, Link, TextField, Typography } from "@mui/material"
import theme from "../../theme/theme"
import api from "../../config/Api"
import { useState } from "react"
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../context/SnackBarContext";
export const Cadastro = ({ setPasso }) => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmSenha, setConfirmSenha] = useState("");
      const { showSnackbar } = useSnackbar();
    const navigate=useNavigate()
    const [showSenha, setShowSenha] = useState(false);
    const [showConfirmSenha, setShowConfirmSenha] = useState(false);
    const toggleShowSenha = () => setShowSenha((prev) => !prev);
    const toggleShowConfirmSenha = () => setShowConfirmSenha((prev) => !prev);
   const cadastrarUsuario = async (e) => {
  e.preventDefault();

  if (senha !== confirmSenha) {
    return alert("As senhas não coincidem");
  }

  try {
    // Primeiro cria o usuário
    await api.post("usuario/create", {
      nome,
      email,
      senha,
    });

    // Se deu certo, faz login automático
    const response = await api.post("auth/login", {
      email,
      senha,
    });

    // Salva o token no localStorage
    localStorage.setItem("token", response.data.access_token);

    // Redireciona para o painel do usuário
    // Assumindo que você tenha o hook navigate do react-router-dom
    navigate("/painel-usuario");

  } catch (error) {
    console.log(error);
   showSnackbar(error.response.data.message, 'error');
  }
};

    return (
        <Box sx={{ width: "400px", p: 5 }}>
            <Box sx={{ display: "flex", justifyContent: "end" }}>
                <Box sx={{ width: "100px", height: "auto" }}>
                    <img src='/aseets/logo-digital-educa.png' style={{ width: "100%", height: "100%" }} />
                </Box>
            </Box>
            <Box component={"form"} onSubmit={cadastrarUsuario} sx={{ display: "flex", flexDirection: "column",mt:5 }}>
                <Typography sx={{ fontWeight: 'bolder', fontSize: 23, mt: 2 }}>Cadastre-se gratuitamente</Typography>
                <TextField
                    label="Nome completo"
                    required
                    placeholder="Seu nome completo"
                    sx={{ mt: 5 }}
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />

                <TextField
                    label="Email"
                    required
                    placeholder="Seu e-mail"
                    sx={{ mt: 5 }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                    label="Senha"
                    required
                    placeholder="Deve ter no mínimo 6 caracteres"
                    type={showSenha ? "text" : "password"}
                    sx={{ mt: 5 }}
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
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
                <Link sx={{ textAlign: "end", mt: 2 }}>Esqueci minha senha</Link>
                <Button
                type="submit"
                    fullWidth
                    variant="contained"
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
                >Cadastre-se gratuitamente</Button>
            </Box>

            <Box
                component="form"
                onClick={() => setPasso(0)}
                sx={{
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    bgcolor: "#1E2A46", // Azul médio escuro (secundária do tema)
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    height: 70,
                    borderRadius: 5,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                    "&:hover": {
                        boxShadow: "0 12px 32px rgba(255, 184, 0, 0.4)", // brilho amarelo
                        transform: "translateY(-2px)",
                    },
                }}
            >
                <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                    Já possui uma conta?{" "}<br />
                    <span
                        style={{ color: theme.palette.primary.main, fontWeight: 'bolder' }}>
                        Entre na plataforma
                    </span>
                </Typography>
            </Box>

        </Box>
    )
}