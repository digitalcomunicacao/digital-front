import { useEffect, useState } from "react"
import api from "../../config/Api"
import { Card, CardContent, Typography, Chip, Box, Avatar } from "@mui/material"
import theme from "../../theme/theme"
import { useNavigate } from "react-router-dom"

export const MeusCursos=()=>{
    const [curso,setCurso]=useState([])
    const getMeusCursos=()=>{
        api.get('/curso/meus-cursos',{
        headers:{
            Authorization:"Bearer "+ localStorage.getItem("token")
        }
    }).then(function(response){
        console.log(response)
        setCurso(response.data)
    }).catch(function(error){
        console.log(error)
    })
    }
    const navigate = useNavigate()

const handleIrParaCurso = (curso) => {
  navigate("/painel-usuario/curso", { state: { curso } })
}
    useEffect(()=>{
        getMeusCursos()
    },[])

    return(
        <Box sx={{display:"flex",gap:5,flexWrap:{xs:"nowrap",md:"wrap"},flexDirection:{xs:"column",md:"row"}}}>
            {curso.map((curso,index)=>(

          
            <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
         
        }}
      >
        <Card
        onClick={() => handleIrParaCurso(curso)}
          sx={{
           width: { xs: "100%", md: "400px" }, height:"300px",boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
            "&:hover": {
                boxShadow: "0 12px 32px rgba(255, 184, 0, 0.4)", // brilho amarelo
                transform: "translateY(-2px)",
            },
          }}
        >
          <CardContent sx={{ padding: 3 }}>
            {/* Logo do Angular */}
            <Box sx={{ marginBottom: 3 }}>
            
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    
                    fontSize: "18px",
                    fontWeight: "bold",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <img src={"http://10.10.10.59:3000/"+curso.thumbnail} style={{width:"100%",height:"100%"}}/>
                </Box>
              </Box>
       

            {/* Informações do Curso */}
            <Box sx={{ marginBottom: 3 }}>
              <Typography
                variant="caption"
                sx={{
                  color: "#9ca3af",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  marginBottom: 1,
                  display: "block",
                }}
              >
                Aulas •  {curso.modulos.reduce((acc, modulo) => acc + modulo.videos.length, 0)}
              </Typography>
              <Typography
                
                sx={{
                  color: "#ffffff",
                  fontWeight: 600,
                  fontSize:{xs:14,md:20}
                }}
              >
               {curso.titulo}
              </Typography>
            </Box>

            {/* Tags/Badges */}
            <Box sx={{ display: "flex", flexWrap: {xs:"unset",md:"wrap"},overflowX:{xs:"auto",md:"unset"},gap: 1.5 }}>
              <Chip
                label="INICIANTE"
                icon={
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      backgroundColor: "#10b981",
                      borderRadius: "50%",
                      marginLeft: "8px !important",
                    }}
                  />
                }
                sx={{
                  backgroundColor: "#374151",
                  color: "#d1d5db",
                  "& .MuiChip-label": {
                    fontSize: "0.75rem",
                    fontWeight: 500,
                  },
                  "&:hover": {
                    backgroundColor: "#4b5563",
                  },
                }}
              />

              <Chip
                label="ANGULAR"
                icon={
                  <Avatar
                    sx={{
                      width: "16px !important",
                      height: "16px !important",
                      backgroundColor: "#ef4444",
                      fontSize: "10px",
                      fontWeight: "bold",
                      marginLeft: "8px !important",
                    }}
                  >
                    A
                  </Avatar>
                }
                sx={{
                  backgroundColor: "#374151",
                  color: "#d1d5db",
                  "& .MuiChip-label": {
                    fontSize: "0.75rem",
                    fontWeight: 500,
                  },
                  "&:hover": {
                    backgroundColor: "#4b5563",
                  },
                }}
              />

              <Chip
                label="JAVASCRIPT"
                icon={
                  <Box
                    component="span"
                    sx={{
                      color: "#fbbf24",
                      fontSize: "12px",
                      fontWeight: "bold",
                      marginLeft: "8px !important",
                    }}
                  >
                    JS
                  </Box>
                }
                sx={{
                  backgroundColor: "#374151",
                  color: "#d1d5db",
                  "& .MuiChip-label": {
                    fontSize: "0.75rem",
                    fontWeight: 500,
                  },
                  "&:hover": {
                    backgroundColor: "#4b5563",
                  },
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
         ))}
        </Box>
    )
}