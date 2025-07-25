import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  CircularProgress,
  IconButton,
  useMediaQuery,
  AppBar,
  Toolbar,
  Divider,
  Grid,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import api from "../../config/Api";
import { HeaderPlayer } from "./HeaderPlayer";



export const VideoPlayer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const [canPlay, setCanPlay] = useState(!isIOS); // iOS = false, outros = true

  console.log("location.state:", location.state); // Veja o que vem no state da rota

  const { cursoId, moduloId } = location.state || {};

  console.log("cursoId:", cursoId, "moduloId:", moduloId);

  const [curso, setCurso] = useState(null);
  const [moduloSelecionado, setModuloSelecionado] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);
  const [videoProgress, setVideoProgress] = useState(0);

  const playerRef = useRef(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!cursoId || !moduloId) {
      console.log("cursoId ou moduloId ausentes, redirecionando...");
      navigate("/painel-usuario/meus-cursos");
      return;
    }
    const fetchCurso = async () => {
      setLoading(true);
      try {
        // Busca curso direto pelo id
        const { data: cursoData } = await api.get(`/curso-selecionado/${cursoId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Curso recebido da API:", cursoData);

        if (!cursoData) {
          console.log("Curso não encontrado com id:", cursoId);
          navigate("/painel-usuario/meus-cursos");
          return;
        }
        setCurso(cursoData);

        // Filtra o módulo dentro do curso
        const modulo = cursoData.modulos.find((m) => m.id === Number(moduloId));
        if (!modulo) {
          console.log("Módulo não encontrado com id:", moduloId);
          navigate("/painel-usuario/meus-cursos");
          return;
        }
        setModuloSelecionado(modulo);
        console.log("Módulo selecionado:", modulo);

        // Escolhe vídeo inicial (primeiro vídeo não concluído ou o último)
        const initialVideo =
          modulo.videos.find((v) => !(v.progresso?.concluido)) || modulo.videos[modulo.videos.length - 1];
        setCurrentVideo(initialVideo);
        console.log("Vídeo inicial:", initialVideo);
      } catch (error) {
        console.error("Erro ao carregar curso:", error);
        navigate("/painel-usuario/meus-cursos");
      } finally {
        setLoading(false);
      }
    };

    fetchCurso();

  }, [cursoId, moduloId, navigate, token]);

  useEffect(() => {
    if (!currentVideo) return;

    const fetchProgresso = async () => {
      try {
        const res = await api.get(`/progresso-video/${currentVideo.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Progresso do vídeo recebido:", res.data);
        setVideoProgress(res.data?.segundos || 0);
      } catch (err) {
        console.log("Erro ao buscar progresso do vídeo:", err);
        setVideoProgress(0);
      }
    };

    fetchProgresso();
  }, [currentVideo, token]);

  const onPlayerReady = () => {
    console.log("Player pronto, vídeo:", currentVideo);
    if (playerRef.current && videoProgress > 0) {
      console.log("Seek para progresso salvo:", videoProgress);
      playerRef.current.seekTo(videoProgress, "seconds");
    }
  };

  useEffect(() => {
    if (!currentVideo || !playerRef.current) return;

    const interval = setInterval(() => {
      const playedSeconds = playerRef.current.getCurrentTime();
      const duration = currentVideo.duracao || 0;
      const concluido = playedSeconds >= duration - 2;

      api
        .patch(
          "/progresso-video",
          {
            videoId: currentVideo.id,
            segundos: Math.floor(playedSeconds),
            concluido,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .catch((e) => console.error("Erro ao salvar progresso", e));
    }, 10000);

    return () => clearInterval(interval);
  }, [currentVideo, token]);

  const handleVideoEnd = async () => {
    if (!curso || !moduloSelecionado || !currentVideo) return;

    console.log("Vídeo finalizado:", currentVideo.titulo);

    const duracaoFinal = currentVideo.duracao;

    try {
      // Marca como concluído com 100% progresso
      await api.patch(
        "/progresso-video",
        {
          videoId: currentVideo.id,
          segundos: duracaoFinal,
          concluido: true,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      currentVideo.progresso = { concluido: true, segundos: duracaoFinal };

      // Avança para o próximo vídeo
      const currentIndex = moduloSelecionado.videos.findIndex((v) => v.id === currentVideo.id);
      let nextVideo = moduloSelecionado.videos[currentIndex + 1];

      if (nextVideo) {
        console.log("Indo para próximo vídeo no módulo:", nextVideo.titulo);
        setCurrentVideo(nextVideo);
        if (isMobile) setDrawerOpen(false);
        return;
      }

      const moduloIndex = curso.modulos.findIndex((m) => m.id === moduloSelecionado.id);
      const nextModulo = curso.modulos[moduloIndex + 1];

      if (nextModulo && nextModulo.videos.length) {
        console.log("Indo para próximo módulo:", nextModulo.titulo);
        setModuloSelecionado(nextModulo);

        const videoInicial =
          nextModulo.videos.find((v) => !(v.progresso?.concluido)) || nextModulo.videos[0];
        setCurrentVideo(videoInicial);

        if (isMobile) setDrawerOpen(false);
        return;
      }

      alert("Parabéns! Você concluiu todos os vídeos do curso.");
    } catch (e) {
      console.error("Erro ao marcar vídeo como concluído:", e);
    }
  };


  if (loading || !curso || !moduloSelecionado) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: theme.palette.background.default,
        }}
      >
        <CircularProgress color="warning" />
      </Box>
    );
  }

  return (
    <Box>
      <Box>
        <HeaderPlayer titulo={curso.titulo} subtitulo={moduloSelecionado.titulo} thumb={curso.thumbnail} />
      </Box>

      <Grid container spacing={2} sx={{ p: 5 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Box
            sx={{

              aspectRatio: "16/9",

              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                position: "relative",
                borderRadius: "16px", // ou "16px"
                overflow: "hidden", // ESSENCIAL pra cortar as bordas do vídeo
              }}
            >
              {isIOS && !canPlay && (
                <Box
                  onClick={() => setCanPlay(true)}
                  sx={{
                    position: "absolute",
                    inset: 0,
                    bgcolor: "rgba(0,0,0,0.6)",
                    zIndex: 10,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  ▶ Começar video
                </Box>
              )}

              <ReactPlayer
                ref={playerRef}
                url={currentVideo.url}
                width="100%"
                height="100%"
                playing={canPlay}
                controls
                playsinline
                onEnded={handleVideoEnd}
                onReady={onPlayerReady}
                config={{
                  file: {
                    attributes: {
                      controlsList: "nodownload",
                      playsInline: true,
                    },
                  },
                }}
              />

            </Box>


          </Box>
          <Box sx={{ borderRadius: 5, bgcolor: theme.palette.background.paper, p: 3, mt: 2 }}>
            <Box sx={{ display: "flex", gap: 1, alignItems: "start" }}>
              <Box
                sx={{
                  bgcolor: "primary.main",
                  color: "white",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: "50%",
                  fontSize: 18,
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: 32,
                  minHeight: 32,
                }}
              >
                1
              </Box>
              <Box>
                <Typography sx={{ fontWeight: "bolder", fontSize: {xs:14,md:16} }}>{currentVideo.titulo}</Typography>

                <Typography color="text.secondary" sx={{ fontSize:{xs:12,md:14},mt: 1, fontWeight: "bolder" }}>
                  {moduloSelecionado.titulo}
                </Typography>

              </Box>

            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          {isMobile ? (
            <>
              <Box
                sx={{
                  position: "fixed",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  bgcolor: "background.paper",
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                  boxShadow: 6,
                  maxHeight: drawerOpen ? "60vh" : 60,
                  overflow: "hidden",
                  transition: "max-height 0.3s ease",
                  zIndex: 1000, // abaixo do AppBar e Header
                }}
                onClick={() => setDrawerOpen(!drawerOpen)}
              >
                <Box sx={{ p: 2 }}>
                  <Typography sx={{ fontWeight: "bolder", fontSize: 16 }}>
                    Lista de Vídeos
                  </Typography>
                  <Typography color="textSecondary" sx={{ fontSize: 12 }}>
                    {moduloSelecionado?.videos?.length || 0} vídeos disponíveis
                  </Typography>
                </Box>
                <Divider />
                {drawerOpen && (
                  <List>
                    {moduloSelecionado.videos.map((video, i) => (
                      <ListItem key={video.id} disablePadding>
                        <ListItemButton
                          selected={video.id === currentVideo.id}
                          onClick={(e) => {
                            e.stopPropagation(); // impede recolher ao clicar
                            setCurrentVideo(video);
                          }}
                          sx={{ gap: 1 }}
                        >
                          <Box
                            sx={{
                              bgcolor: "primary.main",
                              color: "white",
                              px: 1.5,
                              py: 0.5,
                              borderRadius: "50%",
                              fontSize: 14,
                              fontWeight: "bold",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              minWidth: 28,
                              minHeight: 28,
                            }}
                          >
                            {i + 1}
                          </Box>
                          <ListItemText
                            primary={
                              <Typography sx={{ fontWeight: "bold", fontSize: 14 }}>
                                {video.titulo}
                              </Typography>
                            }
                            secondary={video.progresso?.concluido ? "Concluído" : ""}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                )}
              </Box>
            </>
          ) : (
            <Drawer
              variant="persistent"
              anchor="right"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              sx={{
                width: { md: "25%", lg: "25%", xl: "20%" },
                "& .MuiDrawer-paper": {
                  width: { md: "25%", lg: "25%", xl: "20%" },
                  boxSizing: "border-box",
                  borderRadius: 5,
                  top: 220,
                  height: "fit-content",
                  marginRight: 2,
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", p: 2, justifyContent: "space-between" }}>
                <Box>
                  <Typography sx={{ fontWeight: "bolder", fontSize: 16 }}>Lista de Vídeos</Typography>
                  <Typography color="textSecondary" sx={{ fontSize: 12 }}>
                    {moduloSelecionado?.videos?.length || 0} vídeos disponíveis
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <List>
                {moduloSelecionado.videos.map((video, i) => (
                  <ListItem key={video.id} disablePadding>
                    <ListItemButton
                      selected={video.id === currentVideo.id}
                      onClick={() => setCurrentVideo(video)}
                      sx={{ gap: 1 }}
                    >
                      <Box
                        sx={{
                          bgcolor: "primary.main",
                          color: "white",
                          px: 1.5,
                          py: 0.5,
                          borderRadius: "50%",
                          fontSize: 14,
                          fontWeight: "bold",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          minWidth: 28,
                          minHeight: 28,
                        }}
                      >
                        {i + 1}
                      </Box>
                      <ListItemText
                        primary={<Typography sx={{ fontWeight: "bold", fontSize: 14 }}>{video.titulo}</Typography>}
                        secondary={video.progresso?.concluido ? "Concluído" : ""}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Drawer>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}