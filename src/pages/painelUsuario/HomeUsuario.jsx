import { Box, Container, Divider, Grid, Tab, Tabs, Typography, useTheme } from "@mui/material"
import { useEffect, useState } from "react"
import api from "../../config/Api"
import { ProgressoCurso } from "../../components/progressoCurso/ProgressoCurso"
import { RenoveAssinatura } from "../../components/renoveAssinatura/RenoveAssinatura"
import { Subscription } from "../../components/subscription/Subscripition"
import { useMiniDrawer } from "../../context/DrawerContext"
import { Ads } from "../../components/ads/Ads"
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import { useNavigate } from "react-router-dom"
import TabPanel from "@mui/lab/TabPanel"
import { Lancamentos } from "../../components/lancamentos/Lancamentos"
import TabContext from "@mui/lab/TabContext"
import { Eventos } from "../../components/eventos/eventos"
export const HomeUsuario = () => {
  const [cursos, setCursos] = useState([])
  const { miniDrawer } = useMiniDrawer(); // true ou false
  const navigate = useNavigate();
  const theme = useTheme()
  const token = localStorage.getItem("token");
  const [tabAtiva, setTabAtiva] = useState(0);
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
  const handleIniciarJornada = (curso) => {

    // Tenta encontrar o primeiro vídeo não assistido
    for (const modulo of curso.modulos) {
      for (const video of modulo.videos) {
        if (!video.assistido) {
          navigate("/painel-usuario/player", {
            state: {
              cursoId: curso.id,
              moduloId: modulo.id,
              videoId: video.id,
            },
          });
          return;
        }
      }
    }

    // Se todos foram assistidos, manda pro primeiro vídeo do primeiro módulo
    if (curso.modulos.length > 0 && curso.modulos[0].videos.length > 0) {
      navigate("/painel-usuario/player", {
        state: {
          cursoId: curso.id,
          moduloId: curso.modulos[0].id,
          videoId: curso.modulos[0].videos[0].id,
        },
      });
    } else {
      console.warn("Curso sem vídeos.");
    }
  };
  useEffect(() => {
    getCursos()
  }, [])
  const handleTabChange = (event, newValue) => {
    setTabAtiva(newValue);
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: miniDrawer ? 10 : 10 }} >
          {cursos.length > 0 && (
            <Box sx={{ mt: 5 }}>
              <Typography sx={{ fontWeight: "bolder", fontSize: { xs: 16, md: 24 } }}>Continuar estudando</Typography>
              <Box sx={{ display: "flex", gap: { xs: 2, md: 5 }, p: 2, overflowX: "auto" }}>
                {cursos.map((curso, index) => (
                  <Box key={index}>
                    <Box onClick={() => handleIniciarJornada(curso)} sx={{
                      cursor: "pointer",
                      width: { xs: "250px", md: "300px" }, height: "auto", border: 1, p: 2, display: "flex", alignItems: "start", gap: 2, borderRadius: 3,
                      borderColor: "divider",
                      boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
                    }}>

                      <Box sx={{ width: 50, height: 50, boxShadow: "rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px", border: 2, borderColor: theme.palette.text.tertiary, borderRadius: 1 }}>
                        <img src={"https://api.digitaleduca.com.vc/" + curso.thumbnail} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </Box>
                      <Typography sx={{ fontSize: 16, fontWeight: "bolder", color: theme.palette.text.secondary }}>{curso.titulo}</Typography>
                      <PlayCircleFilledWhiteOutlinedIcon />
                    </Box>
                    <Box sx={{ position: "relative", bottom: 25, left: 30, px: 5 }}>
                      <ProgressoCurso curso={curso} showText={false} />
                    </Box>

                  </Box>
                ))}
              </Box>

              <Divider variant="fullWidth" sx={{ mt: 2, mb: 3 }} />

            </Box>
          )}


          <Box sx={{ mt: cursos.length > 0 ? 0 : 5 }}>
            <Typography sx={{ fontWeight: "bolder", fontSize: { xs: 16, md: 24 } }}>Veja o que vem aí</Typography>
            <Typography sx={{ color: theme.palette.text.secondary, fontSize: { xs: 12, md: 14 } }}>Descubra as novidades do Digital Educa</Typography>
            <Box sx={{ mt: 5 }}>
              <TabContext value={String(tabAtiva)}>
                <Tabs
                  value={String(tabAtiva)}
                  onChange={(event, newValue) => setTabAtiva(Number(newValue))}
                  variant="scrollable"
                  scrollButtons="auto"
                  sx={{
                    mb: 4,
                    '& .MuiTabs-indicator': {
                      display: 'none',
                    },
                  }}
                >
                  <Tab
                    label="Lançamentos"
                    value="0"
                    sx={{
                      width: "125px",
                      height: "15px",
                      minWidth: "unset",
                      border: 1,
                      borderRadius: 5,

                      color: theme.palette.text.primary,
                      '&.Mui-selected': {
                        color: theme.palette.text.tertiary,
                        borderColor: theme.palette.primary.main,
                        bgcolor: theme.palette.background.contained,
                        fontWeight: 'bold',
                      },
                    }}
                  />
                  <Tab
                    label="Eventos"
                    value="1"
                    sx={{
                      width: "150px",
                      height: "15px",
                      border: 1,
                      borderRadius: 5,
                      ml: 2,
                      bgcolor: theme.palette.secondary,
                      color: theme.palette.text.primary,
                      '&.Mui-selected': {
                        color: theme.palette.text.tertiary,
                        borderColor: theme.palette.primary.main,
                        bgcolor: theme.palette.background.contained,
                        fontWeight: 'bold',
                      },
                    }}
                  />
                </Tabs>

                {/* Agora sim: os painéis abaixo das tabs */}
                <TabPanel value="0" sx={{ p: 0, mt: 2 }}>
                  <Lancamentos />
                </TabPanel>
                <TabPanel value="1" sx={{ p: 0, mt: 2 }}>
                  <Eventos />
                </TabPanel>
              </TabContext>

            </Box>
          </Box>

        </Grid>

        <Grid size={{ xs: 12, lg: miniDrawer ? 2 : 2 }} >
          <Box sx={{ position: 'sticky', mt: 5 }}>
            <RenoveAssinatura />
            <Subscription />
            <Box sx={{ mt: 5 }}>
              <Ads />
            </Box>
          </Box>
        </Grid>
      </Grid>

    </Box>
  )
}