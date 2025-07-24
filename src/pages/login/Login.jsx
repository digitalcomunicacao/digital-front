import { Box, Button, IconButton, InputAdornment, Link, TextField, Typography, useTheme } from "@mui/material"
import { useState } from "react"
import { Cadastro } from "./Cadastro"
import api from "../../config/Api"
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom"
import { useSnackbar } from "../../context/SnackBarContext"
import { RecuperarSenha } from "./RecuperarSenha"
import { useThemeMode } from "../../context/ThemeContext";

export const Login = () => {
  const { showSnackbar } = useSnackbar();
  const [passo, setPasso] = useState(0)
  const [email, setEmail] = useState()
  const { darkMode, toggleTheme } = useThemeMode();
  const theme = useTheme()
  const [senha, setSenha] = useState()
  const navigate = useNavigate()
  const [showSenha, setShowSenha] = useState(false);
  const toggleShowSenha = () => setShowSenha((prev) => !prev);
  const logar = (e) => {
    e.preventDefault()
    api.post('auth/login', {
      email: email,
      senha: senha
    }).then(function (response) {
      localStorage.setItem("token", response.data.access_token);
      navigate("/painel-usuario/home-usuario");
      showSnackbar('Login realizado com sucesso!', 'success');
      console.log(response)
    }).catch(function (error) {
      console.log(error)

      showSnackbar(error.response.data.message, 'error');
    })
  }

  return (
<Box
  sx={{
    minHeight: "100vh",
    display: "flex",
    backgroundImage: 'url("/aseets/bg-login.png")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    
  }}
>
      <Box
        sx={{
          flex: 1,
          position: "relative",
          overflow: "hidden",
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >

        <Box sx={{ width: "290", height: "auto" }}>
          <img src={"/aseets/logo-brilhante.png"} style={{ width: "100%", height: "100%" }} />
        </Box>
        <Typography color="textTertiary" sx={{ mt: 2,textAlign:"center", fontSize: 30 }}>Acelere sua carreira<br/> em tecnologia</Typography>
      </Box>
      {passo === 0 && (
        <Box sx={{ width: { xs: "100%", md: "30%" },bgcolor:theme.palette.background.paper, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Box sx={{ width: "400px", p: 5 }}>
            <Box sx={{ display:{xs:"flex",md:"none"} ,justifyContent: "end" }}>
              <Box sx={{ width: "100px", height: "auto" }}>
              <img src={"/aseets/logo-color.svg"} style={{ width: "100%", height: "100%" }} />
              </Box>
            </Box>
            <Box component={"form"} onSubmit={logar} sx={{ display: "flex", flexDirection: "column", mt: 5 }}>
              <Typography sx={{ fontWeight: 'bolder', fontSize: 22, mt: 2 }}>Acesse sua conta</Typography>
              <TextField
                required
                label="Email" sx={{ mt: 5 }}
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

              <Link onClick={()=>setPasso(2)} sx={{fontWeight:"bolder",textDecoration:"none",textAlign:"center",mt:2,cursor:"pointer"}} >Esqueci minha senha</Link>
              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{
                  mt: 2,
                  py: 2,
                  fontSize: "16px",
                  fontWeight: "bold",
                  textTransform: "none",
                  borderRadius: "15px",
                  "&:hover": {
                
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                  mb: 4,
                }}
              >
                Entrar
              </Button>

            </Box>

            <Box
              component="form"
              onClick={() => setPasso(1)}
              sx={{
                cursor: "pointer",
                transition: "all 0.3s ease",
                bgcolor: "#1E2A46", // Azul médio escuro (secundária do tema)
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                height: 65,
                borderRadius: 5,
   
                "&:hover": {
          
                  transform: "translateY(-2px)",
                },
              }}
            >
              <Typography variant="body2" sx={{ color: "#EDEDED", textAlign: "center" }}>
                Não tem uma conta? <br />
                <span style={{ color: "#FFB800", fontWeight: "bolder" }}>
                  Crie sua conta grátis
                </span>
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
      {passo === 1 && (
        <Cadastro setPasso={setPasso} />
      )}
      {passo === 2 && (
        <RecuperarSenha setPasso={setPasso} />
      )}

    </Box>
  )
}