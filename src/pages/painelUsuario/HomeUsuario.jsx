import { Box, Divider,Grid,Typography, useTheme } from "@mui/material"
import { useEffect, useState } from "react"
import api from "../../config/Api"
import { ProgressoCurso } from "../../components/progressoCurso/ProgressoCurso"
import { RenoveAssinatura } from "../../components/renoveAssinatura/RenoveAssinatura"
import { Subscription } from "../../components/subscription/Subscripition"
import { useMiniDrawer } from "../../context/DrawerContext"
import { Ads } from "../../components/ads/Ads"

export const HomeUsuario = () => {
  const [cursos, setCursos] = useState([])
      const { miniDrawer } = useMiniDrawer(); // true ou false
  const theme = useTheme()
  const token = localStorage.getItem("token");
  const getCursos = () => {
    api.get("/curso-selecionado/cursos", {
      headers: { Authorization: `Bearer ${token}` },
    }).then(function (response) {
      setCursos(response.data)
      console.log(response)
    }).catch(function (error) {
      console.log(error)
    })
  }
  useEffect(() => {
    getCursos()
  }, [])
  return (
    <Grid container>
            <Grid size={{ xs: 12, lg: miniDrawer ? 10 : 10}} >
        <Box sx={{mt:5}}>
          <Typography sx={{ fontWeight: "bolder", fontSize: { xs: 16, md: 24 } }}>Continuar estudando</Typography>
          <Box sx={{ display: "flex", gap: { xs: 2, md: 5 }, p: 2,overflowX:"auto"}}>
            {cursos.map((curso, index) => (
              <Box key={index}>
                <Box sx={{
                  width:{xs:"250px",md:"300px"}, height: "auto", border: 1, p: 2, display: "flex", alignItems: "start", gap: 2, borderRadius: 3,
                  borderColor: "divider",
                  boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
                }}>
                  <Box sx={{ width: 50, height: 50, boxShadow: "rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px", border: 2, borderColor: theme.palette.text.tertiary, borderRadius: 1 }}>
                    <img src={"https://api.digitaleduca.com.vc/" + curso.thumbnail} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </Box>
                  <Typography sx={{ fontSize: 16, fontWeight: "bolder", color: theme.palette.text.secondary }}>{curso.titulo}</Typography>
                </Box>

                <Box sx={{ position: "relative", bottom: 35, left: 30, px: 5 }}>
                  <ProgressoCurso curso={curso} showText={false} />
                </Box>

              </Box>
            ))}
          </Box>

        </Box>
      </Grid>
      <Divider sx={{ mt: 2, mb: 3 }} />
      <Grid size={{ xs: 12, lg: miniDrawer ? 2 : 2 }} >
        <Box sx={{ position: 'sticky', mt: 5 }}>
          <RenoveAssinatura />
          <Subscription />
          <Box sx={{ mt: 5 }}>
            <Ads/>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}