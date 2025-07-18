
import { Box, TextField, Typography, useTheme} from "@mui/material"
export const PlanoSelecionado=({plano})=>{
    const theme=useTheme()
    return(
        <Box sx={{display:"flex",justifyContent:"space-between",gap:5,border:1}}>
           <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderRadius: 5,
              p: 5,
              bgcolor: theme.palette.background.paper,
              border:1,
              borderColor: theme.palette.background.paperAzul,
            width:"50%"
            }}
          >
            <Box sx={{ width: "45%" }}>
              <Box sx={{ width: "115px", height: "65px" }}>
                <img src={plano.intervalo==="year" ? "aseets/logo-dark.png":"aseets/logo-prata.png"} alt="logo" style={{ width: "100%", height: "100%" }} />
              </Box>
              <Typography color="textTertiary" sx={{ mt: 2 }}>
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
                    fontWeight: "bold"
                  }}
                >
                  1
                </Typography>
              </Box>

              <Box sx={{ textAlign: "center" }}>
                <Typography color="textTertiary" sx={{ fontSize: 20 }}>
                  Assinatura {plano.nome}
                </Typography>
                <Box
                  sx={{
                    border: 1,
                    borderColor: "divider",
                    p: 1,
                    borderRadius: 5,
                    mt: 1
                  }}
                >
                  <Typography color="textTertiary" sx={{ fontSize: 22 }}>
                    {plano.nome}
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: 42, fontWeight: "bolder", mt: 2 }}>
                  R$ {plano.preco.toFixed(2)}
                </Typography>
              </Box>
            </Box>
          </Box>
               <Box sx={{display:"flex",justifyContent:"end",border:1,borderRadius:5,p:5,bgcolor: theme.palette.background.paper,borderColor: theme.palette.background.paperAzul,}}>
                <Box>
                    <Typography>Dados Pessoais</Typography>
                <TextField fullWidth label="Nome Completo"/>
                <Box sx={{display:"flex",justifyContent:"space-between",gap:5,mt:2}}>
                <TextField label="Telefone" sx={{width:"50%"}}/>
                <TextField label="Email" sx={{width:"50%"}}/>
                </Box>
               
                </Box>
               
            </Box>
             </Box>
    )
}