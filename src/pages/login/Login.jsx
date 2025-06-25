import { Box, Button, Link, TextField, Typography } from "@mui/material"
import theme from "../../theme/theme"
import { useState } from "react"
import { Cadastro } from "./Cadastro"

export const Login = () => {
  const [passo, setPasso] = useState(0)
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
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >

        <Box sx={{ width: "150px", height: "auto" }}>
          <img src='/aseets/logo-digital-educa.png' style={{ width: "100%", height: "100%" }} />
        </Box>
        <Typography sx={{ mt: 2, fontWeight: 'bolder', fontSize: 30 }}>Acelere sua carreira em tecnologia</Typography>
      </Box>
      {passo === 0 ? (
        <Box sx={{width:"50%",display:"flex",justifyContent:"center",alignItems:"center"}}>
         
        <Box sx={{ width: "400px", p: 5 }}>
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Box sx={{ width: "100px", height: "auto" }}>
              <img src='/aseets/logo-digital-educa.png' style={{ width: "100%", height: "100%" }} />
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", mt: 5 }}>
            <Typography sx={{ fontWeight: 'bolder', fontSize: 30, mt: 2 }}>Acesse sua conta</Typography>
            <TextField label="Email" sx={{ mt: 5 }} />
            <TextField label="Senha" sx={{ mt: 5 }} />
            <Link sx={{ textAlign: "end", mt: 2 }}>Esqueci minha senha</Link>
            <Button
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
              height: 70,
              borderRadius: 5,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
              "&:hover": {
                boxShadow: "0 12px 32px rgba(255, 184, 0, 0.4)", // brilho amarelo
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
      ) : (
        <Cadastro setPasso={setPasso} />
      )}

    </Box>
  )
}