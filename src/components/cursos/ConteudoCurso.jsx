import { Box, Button, Chip, Divider, Grid, Typography, useTheme } from "@mui/material"
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';
import { useNavigate } from "react-router-dom"
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import { useSnackbar } from "../../context/SnackBarContext";
import api from "../../config/Api";
export const ConteudoCurso = ({ curso }) => {
  const navigate = useNavigate()
  const theme = useTheme()
  const { showSnackbar } = useSnackbar();
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
      showSnackbar("Erro ao acessar o módulo", "error");
    }
  };
  return (
    <>
      <Grid container>
        <Grid size={{ xs: 12, md: 8 }} >
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
                display: "flex", flexDirection: { xs: "column", md: "row" }, "&:hover": {
                  border: 3,
                  borderColor: theme.palette.background.paperAzul,
                }, border: 1, borderColor: "divider", p: 2, borderRadius: 5, mt: 5, height: "250px", gap: 2, alignItems: { xs: "center", md: "start" }
              }}>
                <PlayCircleOutlinedIcon sx={{ fontSize: "80px", color: theme.palette.background.paperAzul }} />
                <Box sx={{ width: "70%", mt: 2 }}>
                  <Typography sx={{ fontSize: 18, fontWeight: "bolder" }}>{modulo.subtitulo}</Typography>
                  <Box sx={{ mt: 1, display: "flex", gap: 0.5, justifyContent: "center", borderRadius: 5, border: 1, borderColor: 'divider', width: "100px", textAlign: "center", bgcolor: theme.palette.background.paper }}>
                    <VideoLibraryOutlinedIcon sx={{ color: theme.palette.background.paperAzul }} />
                    <Typography>
                      {modulo.videos.length} Aulas
                    </Typography>

                  </Box>

                  <Divider variant="fullWidth" sx={{ mt: 2 }} />
                  <Typography sx={{ mt: 2 }}>{modulo.descricao}</Typography>
                </Box>


              </Box>

            </Box>
          ))}
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box
            sx={{
              mt: { xs: 10, md: 0 },
              height: "220px",
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
            <Button fullWidth variant="contained" onClick={() => navigate("/checkout")} sx={{ boxShadow: "0 12px 32px rgba(255, 184, 0, 0.4)", fontWeight: "bolder", fontSize: 18, mt: 2 }}>
              Começar Jornada
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>

  )
}