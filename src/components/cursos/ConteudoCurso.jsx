import { Box, Button, Chip, Divider, Grid, Typography, useTheme } from "@mui/material"
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';
import { useNavigate } from "react-router-dom"
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import { useSnackbar } from "../../context/SnackBarContext";
import api from "../../config/Api";
import { ProgressoCurso } from "../progressoCurso/ProgressoCurso";
import { ProgressoModuloCircular } from "../progressoModulo/ProgressoModulo";
import { RenoveAssinatura } from "../renoveAssinatura/RenoveAssinatura";
export const ConteudoCurso = ({ curso }) => {
  const navigate = useNavigate()
  const theme = useTheme()
  const { showSnackbar } = useSnackbar();
        const user = JSON.parse(localStorage.getItem('user') || '{}');
const handleIniciarJornada = async () => {
  try {
    const token = localStorage.getItem("token");

    // Verifica se o curso já está selecionado
    const response = await api.get("/curso-selecionado/cursos", {
      headers: { Authorization: `Bearer ${token}` }
    });

    const cursosSelecionados = response.data;
    const jaSelecionado = cursosSelecionados.some((c) => c.id === curso.id);

    // Se ainda não foi selecionado, envia para a API
    if (!jaSelecionado) {
      await api.post("/curso-selecionado", { cursoId: curso.id }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showSnackbar("Curso adicionado aos seus conteúdos.");
    }

    // Encontrar o primeiro vídeo não assistido
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

    // Se todos os vídeos foram assistidos, mandar para o primeiro
    if (curso.modulos.length > 0 && curso.modulos[0].videos.length > 0) {
      navigate("/painel-usuario/player", {
        state: {
          cursoId: curso.id,
          moduloId: curso.modulos[0].id,
          videoId: curso.modulos[0].videos[0].id,
        },
      });
    } else {
      showSnackbar("Este curso ainda não tem vídeos.", "warning");
    }

  } catch (err) {
    console.error("Erro ao iniciar jornada:", err);
    showSnackbar(err.response?.data?.message || "Erro ao iniciar jornada", "error");
  }
};


  const handleSelecionarModulo = async (modulo) => {
    try {
      const token = localStorage.getItem("token");

      // Verifica se o curso já está selecionado
      const response = await api.get("/curso-selecionado/cursos", {
        headers: { Authorization: `Bearer ${token}` }
      });

      const cursosSelecionados = response.data;
      const jaSelecionado = cursosSelecionados.some((c) => c.id === curso.id);

      // Se ainda não foi selecionado, envia para a API
      if (!jaSelecionado) {
        await api.post("/curso-selecionado", { cursoId: curso.id }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        showSnackbar("Curso adicionado aos seus conteúdos.");
      }

      // Redireciona para o player
      navigate("/painel-usuario/player", {
        state: {
          cursoId: curso.id,
          moduloId: modulo.id,
        },
      });

    } catch (err) {
      console.error("Erro ao selecionar curso:", err);
      showSnackbar(err.response.data.message, "error");
    }
  };
  return (
    <>
      <Grid container>
        <Grid size={{ xs: 12, lg: 9 }} >
          {curso.modulos.map((modulo, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                mb: 5,
                width: { xs: "100%", md: "90%" },
                cursor: "pointer",
              }}
              onClick={() => handleSelecionarModulo(modulo)}
            >

              <Box sx={{ display: "flex", gap: 1 }}>
                <Box sx={{ borderRadius: 5, border: 1, borderColor: 'divider', width: "100px", textAlign: "center", bgcolor: theme.palette.background.paper }}>
                  <Typography color="textPrimary">Módulo {index + 1}</Typography>
                </Box>
                <Typography color="textPrimary" sx={{ fontWeight: "bolder", fontSize: 20 }}>
                  {modulo.titulo}
                </Typography>
              </Box>

              <Box sx={{
                display: "flex", bgcolor: theme.palette.background.paper, "&:hover": {
                  borderColor: theme.palette.background.paperAzul,
                }, border: 1, borderColor: "divider", p: 2, borderRadius: 5, mt: 5, height: "auto", gap: 2, alignItems: "start"
              }}>
                <ProgressoModuloCircular modulo={modulo} size={80} />

                <Box sx={{ width: "70%" }}>
                  <Typography sx={{ fontSize: 18, fontWeight: "bolder" }}>{modulo.subtitulo}</Typography>
                  <Box sx={{ mt: 1, display: "flex", gap: 0.5, justifyContent: "center", borderRadius: 5, border: 1, borderColor: 'divider', width: "100px", textAlign: "center", bgcolor: theme.palette.background.paper }}>
                    <VideoLibraryOutlinedIcon sx={{ color: theme.palette.background.paperAzul }} />
                    <Typography>
                      {modulo.videos.length} Aulas
                    </Typography>

                  </Box>

                  <Divider variant="fullWidth" sx={{ mt: 2, display: { xs: "none", md: "block" } }} />
                  <Typography sx={{ mt: 2, display: { xs: "none", md: "block" } }}>{modulo.descricao}</Typography>
                </Box>


              </Box>

            </Box>
          ))}
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }}>
          {user.assinante && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, justifyContent: "center", borderRadius: "15px", width: "100%", border: 1, borderColor: 'divider', bgcolor: theme.palette.background.paper, p: 2 }}>
            <ProgressoCurso curso={curso} />
            <Button
              variant="outlined"
              sx={{ fontWeight: "bolder", color: theme.palette.text.primary }}
              endIcon={<PlayCircleOutlinedIcon sx={{ color: theme.palette.primary.main }} />}
              onClick={handleIniciarJornada}
            >
              Iniciar jornada
            </Button>
          </Box>
                 )}
                 <RenoveAssinatura/>
        </Grid>
      </Grid>
    </>

  )
}