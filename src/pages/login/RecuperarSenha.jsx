import { Box, Button, IconButton, InputAdornment, Link, TextField, Typography, useTheme } from "@mui/material"
import api from "../../config/Api"
import { useSnackbar } from "../../context/SnackBarContext";
import { useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from "react-router-dom";
import { useThemeMode } from "../../context/ThemeContext";
export const RecuperarSenha = ({ setPasso }) => {
    const [email, setEmail] = useState()
    const [loading, setLoading] = useState(false)
    const [emailEnviado, setEmailEnviado] = useState(false)
    const navigate=useNavigate()
      const { darkMode, toggleTheme } = useThemeMode();
    const theme = useTheme()
    const { showSnackbar } = useSnackbar();
    const handleEnviarSenha = (e) => {
        e.preventDefault()
        setLoading(true)
        api.post("reset-password/request", {
            email: email
        }).then(function (response) {
            setLoading(false)
            console.log(response)
            setEmailEnviado(true)
            showSnackbar(response.data.message, 'success');
        }).catch(function (error) {
            console.log(error)
            setEmailEnviado(false)
            setLoading(false)
            showSnackbar(error.response.data.message, 'error');
        })
    }
    return (
  <Box sx={{ width: { xs: "100%", md: "30%" }, bgcolor: theme.palette.background.paper, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Box sx={{ width: "400px", p: 5, bgcolor: theme.palette.background.paper, borderRadius: 2, }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <IconButton onClick={() => setPasso(0)} disableRipple sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <ArrowBackIcon />
                        <Typography>Voltar</Typography>
                    </IconButton>
                       <Box sx={{ display:{xs:"flex",md:"none"} ,justifyContent: "center" }}>
              <Box sx={{ width: "100px", height: "auto" }}>
                            <img src={darkMode? "/aseets/logo-brilhante.png" :"/aseets/logo-color.svg"} style={{ width: "100%", height: "100%" }} />
              </Box>
            </Box>
                </Box>
                {!emailEnviado && (


                    <Box component={"form"} onSubmit={handleEnviarSenha} sx={{ display: "flex", flexDirection: "column", mt: 5}}>
                        <Typography sx={{ fontWeight: 'bolder', fontSize: 23, mt: 2, textAlign: "center" }}>Redefinir senha</Typography>
                        <Typography color="textSecondary" sx={{ fontSize: "15px", textAlign: "center", mt: 2 }}>Por favor, informe seu email e enviaremos um link para a recuperacão da sua senha</Typography>
                        <TextField
                            label="Email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Digite seu email"
                            sx={{ mt: 5 }}
                        />
                        <Button
                            loading={loading}
                            loadingPosition="start"
                            fullWidth
                            startIcon={<SendIcon />}
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
                )}

                {emailEnviado && (
                    <Box component={"form"} onSubmit={handleEnviarSenha} sx={{ display: "flex", flexDirection: "column", mt: 5 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "center" }}>
                            <Typography sx={{ fontWeight: 'bolder', fontSize: 23, textAlign: "center" }}>Tudo certo</Typography>
                            <CheckIcon fontSize="large" color="success" />
                        </Box>


                        <Typography color="textSecondary" sx={{ fontSize: "15px", textAlign: "center", mt: 2 }}>Para sua segurança, enviamos um link para recuperação de senha para seu e-mail, através de suporte@digitaleduca.com.vc
                            Verifique na sua caixa de entrada ou spam</Typography>
                        <Button
                            loading={loading}
                            loadingPosition="start"
                            fullWidth
                            variant="contained"
                            onClick={()=>setPasso(0)}

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
                            ok, entendi
                        </Button>
                    </Box>
                )}

            </Box>
        </Box>
    )
}