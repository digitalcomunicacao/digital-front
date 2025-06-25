import { Box, Container, Typography } from "@mui/material"
import theme from "../../theme/theme"

export const Cursos = () => {
    return (
        <Box sx={{
            background: "radial-gradient(circle at top left, #1E2A46, #0A1128)",
            position: "relative",
            overflow: "hidden",
            py: { xs: 8, md: 12 },
        }}>
      
            <Box
                sx={{
                    position: "absolute",
                    bottom: -30,
                    left: -30,
                    width: 150,
                    height: 150,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(244, 143, 177, 0.1) 0%, transparent 70%)",
                }}
            />
                  <Box
                sx={{
                    position: "absolute",
                    top: -50,
                    right: -50,
                    width: 200,
                    height: 200,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(144, 202, 249, 0.1) 0%, transparent 70%)",
                }}
            />
            <Container>
                <Box sx={{textAlign:'center'}}>
        <Typography sx={{fontSize: 30,fontWeight:'bolder',color:theme.palette.text.primary}}>Nossos Cursos</Typography>
            <Typography  sx={{fontSize:20,color:theme.palette.text.secondary,mt:2}}>Explore nossa coleção de cursos cuidadosamente selecionados<br/> para acelerar sua carreira em tecnologia</Typography>
                </Box>
    
            </Container>
           
        </Box>
    )
}