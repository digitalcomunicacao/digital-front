import { Box, Button, IconButton, InputAdornment, Link, TextField, Typography } from "@mui/material"
import api from "../../config/Api"
import { useSnackbar } from "../../context/SnackBarContext";
import { useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
export const RecuperarSenha = ({ setPasso }) => {
    const [email,setEmail]=useState()
    const [loading,setLoading]=useState(false)
    const { showSnackbar } = useSnackbar();
    const handleEnviarSenha=(e)=>{
        e.preventDefault()
        setLoading(true)
        api.post("reset-password/request",{
        email:email
        }).then(function(response){
        setLoading(false)
        console.log(response)
            showSnackbar(response.data.message,'success');
        }).catch(function(error){
        console.log(error)
         setLoading(false)
            showSnackbar(error.response.data.message, 'error');
        })
    }
    return (
        <Box sx={{ width: { xs: "100%", md: "50%" }, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Box sx={{ width: "400px", p: 5 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <IconButton onClick={()=>setPasso(0)} disableRipple sx={{display:"flex",alignItems:"center",gap:1}}>
                        <ArrowBackIcon/>
                        <Typography>Voltar</Typography>
                    </IconButton>
                    <Box sx={{ width: "100px", height: "auto" }}>
                        <img src='/aseets/logo-digital-educa.png' style={{ width: "100%", height: "100%" }} />
                    </Box>
                </Box>
                <Box component={"form"} onSubmit={handleEnviarSenha} sx={{ display: "flex", flexDirection: "column", mt: 5 }}>
                    <Typography sx={{ fontWeight: 'bolder', fontSize: 23, mt: 2, textAlign: "center" }}>Redefinir senha</Typography>
                    <Typography color="textSecondary" sx={{ fontSize: "15px", textAlign: "center", mt: 2 }}>Por favor, informe seu email e enviaremos um link para a recuperacão da sua senha</Typography>
                    <TextField
                        label="Email"
                        required
                        onChange={(e)=>setEmail(e.target.value)}
                        placeholder="Digite seu email"
                        sx={{ mt: 5 }}
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
    )
}