import { Box, Container, Typography } from "@mui/material"
import { Cursos } from "../../components/cursos/Cursos"
import { CardCurso } from "../../components/cursos/CardCurso"
import api from "../../config/Api"
import { useEffect, useState } from "react"
import theme from "../../theme/theme"

export const Catalago =()=>{
    const [cursos,setCursos]=useState([])
    const getCursos=()=>{
        api.get('curso/cursos',{
        }).then(function(response){
            console.log(response)
            setCursos(response.data)
        }).catch(function(error){
            console.log(error)
        })
    }
    useEffect(()=>{
        getCursos()
    },[])
    return(
          <Container>
                <Box sx={{ textAlign: 'start',mt:5}}>
                    <Typography sx={{ fontSize: 30, fontWeight: 'bolder', color: theme.palette.text.primary }}>Catálogo</Typography>
                    <Typography sx={{ fontSize: 20, color: theme.palette.text.secondary, mt: 2 }}>Navegue por todo o conteúdo da DigitalEduca</Typography>
                </Box>
                <Box sx={{display:"flex",gap:5,flexWrap:"wrap",flexDirection:{xs:"column",md:"row"},mt:10}}>
                {cursos.map((curso,index)=>(              
                <CardCurso key={index} curso={curso}/>
                  ))}
                </Box>
            </Container>
    )
}