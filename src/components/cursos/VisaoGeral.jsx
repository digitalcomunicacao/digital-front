import { Avatar, Box, Button, Grid, Typography } from "@mui/material"
import theme from "../../theme/theme"

export const VisaoGeral = ({ curso }) => {
    return (
        <Grid container  >
        <Grid  size={{xs:12,md:8}}>
            <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 5,width:{xs:"100%",md:"90%"},bgcolor: theme.palette.background.paper }}>
                <Box sx={{p:3}}>

          
              <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", gap: 1}}>
                   <Box sx={{ width: "150px", height: "150px" }}>
                    <img src={`http://10.10.10.214:3000/${curso.thumbnail}`} style={{ width: "100%", height: "100%" }} />
                 </Box>
            </Box>
            
                    <Typography sx={{fontSize:{xs:14,md:16},mt:2}}>{curso.aprendizagem}</Typography>
                
            </Box>
                  </Box>
            <Box sx={{ mt:5,border: 1, borderColor: 'divider',width:{xs:"100%",md:"90%"},borderRadius: 5, bgcolor: theme.palette.background.paper}}>
                <Box sx={{p:3}}>
                         <Typography color="textSecondary" sx>Educador</Typography>
                 <Box sx={{ display: "flex", alignItems: "center", mb: 2,mt:2}}>
                    <Avatar src={curso.instrutor.nome} sx={{ width: 32, height: 32, mr: 1 }} />
                    <Box>
                        <Typography color="textPrimary" sx={{ fontWeight: "bolder",fontSize:"16px"}}>
                            {curso.instrutor.nome}
                        </Typography>
                        <Typography color="textSecondary" sx={{fontSize:14}}>
                            {curso.instrutor.formacao}
                        </Typography>
                    </Box>
                    
                </Box>
                    <Typography  sx={{fontSize:{xs:14,md:16},mt:2}}>{curso.instrutor.sobre}</Typography>
            </Box>
                </Box>
            </Grid>
                <Grid size={{xs:12,md:4}}>
                <Box
                sx={{
                    mt:{xs:10,md:0},
                    height: "200px",
                    border: 1,
                    borderColor: "divider",
                    p: 3,
                    borderRadius: 5,
                }}
         >
                <Typography color="textPrimary" sx={{ fontWeight: "bolder", fontSize: 16 }}>
                    Inicie sua jornada na programação
                </Typography>
                <Typography color="textSecondary" sx={{ fontSize: 16, mt: 2 }}>
                    Inicie sua jornada na programação com um curso gratuito.
        </Typography>
             <Button fullWidth variant="contained" sx={{ boxShadow: "0 12px 32px rgba(255, 184, 0, 0.4)", fontWeight: "bolder", fontSize: 18, mt: 2 }}>
                    Começar Jornada
                </Button>
             </Box>
            </Grid>
        </Grid>
  




    )
}