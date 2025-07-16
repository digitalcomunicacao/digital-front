"use client"

import { useEffect, useRef, useState } from "react"
import {
  Box,
  Paper,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Avatar,
  CircularProgress,
  useMediaQuery,
  ListItemButton,
  Chip,
  LinearProgress,
} from "@mui/material"
import { ArrowBack, MenuOpen, Menu, PlayCircleOutline, CheckCircle, VideoLibrary } from "@mui/icons-material"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import ReactPlayer from "react-player"
import { useTheme } from "@mui/material/styles"
import ContadorPlayer from "./ContadorPlayer"
import api from "../../../config/Api"

export const VideoPlayer = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [curso, setCurso] = useState(location.state?.curso || null)
  const [modulo, setModulo] = useState(location.state?.modulo || null)
  const [currentVideo, setCurrentVideo] = useState(modulo?.videos?.[0] || null)
  const [videoBlobUrl, setVideoBlobUrl] = useState(null)
  const [progressoInicial, setProgressoInicial] = useState(0)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingProgresso, setLoadingProgresso] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [nextVideo, setNextVideo] = useState(null)
  const [showCountdownOverlay, setShowCountdownOverlay] = useState(false)
  const [countdown, setCountdown] = useState(null)

  const [progressoPronto, setProgressoPronto] = useState(false)
  const [hasSeeked, setHasSeeked] = useState(false)
  const [isPlayerReady, setIsPlayerReady] = useState(false)
  const [maxProgressoSalvo, setMaxProgressoSalvo] = useState(0)

  const playerRef = useRef(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const token = localStorage.getItem("token")

  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true)
    } else {
      setIsCollapsed(false)
    }
  }, [isMobile])

  const fetchCursosAtualizados = async () => {
    try {
      const response = await api.get("/curso-selecionado/cursos", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const cursos = response.data
      const cursoAtualizado = cursos.find((c) => c.id === curso?.id)
      if (!cursoAtualizado) return navigate("/painel-usuario/meus-cursos")

      const moduloAtualizado = cursoAtualizado.modulos.find((m) => m.id === modulo?.id)
      if (!moduloAtualizado) return navigate("/painel-usuario/meus-cursos")

      setCurso(cursoAtualizado)
      setModulo(moduloAtualizado)
    } catch (err) {
      console.error("Erro ao buscar cursos:", err)
      navigate("/painel-usuario/meus-cursos")
    }
  }

  useEffect(() => {
    if (!curso || !modulo) return navigate("/painel-usuario/meus-cursos")
    fetchCursosAtualizados()
  }, [])

  useEffect(() => {
    if (!modulo?.videos?.length) return

    const primeiroNaoConcluido = modulo.videos.find((v) => !v.progresso?.concluido)
    setCurrentVideo(primeiroNaoConcluido || modulo.videos[modulo.videos.length - 1])
  }, [modulo])

  const getProgressoVideo = async (videoId) => {
    setLoadingProgresso(true)
    setProgressoPronto(false)
    try {
      const response = await api.get(`/progresso-video/${videoId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const segundos = response.data?.segundos || 0
      setProgressoInicial(segundos)
    } catch (err) {
      console.error("Erro ao buscar progresso:", err)
      setProgressoInicial(0)
    } finally {
      setProgressoPronto(true)
      setLoadingProgresso(false)
    }
  }

  const getVideoBlob = async (videoUrl) => {
    try {
      const response = await api.get(`/files/${videoUrl}`, {
        responseType: "blob",
        headers: { Authorization: `Bearer ${token}` },
      })
      const blobUrl = URL.createObjectURL(response.data)
      setVideoBlobUrl(blobUrl)
    } catch (err) {
      console.error("Erro ao carregar vídeo:", err)
      setVideoBlobUrl(null)
    }
  }

  useEffect(() => {
    if (!currentVideo?.url) return

    setIsLoading(true)
    setHasSeeked(false)
    setProgressoPronto(false)
    setIsPlayerReady(false)
    setVideoBlobUrl(null)

    getProgressoVideo(currentVideo.id)
      .then(() => getVideoBlob(currentVideo.url))
      .finally(() => setIsLoading(false))

    return () => {
      if (videoBlobUrl) URL.revokeObjectURL(videoBlobUrl)
    }
  }, [currentVideo])

  // ✅ Realiza o seekTo com segurança
  useEffect(() => {
    if (
      isPlayerReady &&
      progressoPronto &&
      !hasSeeked &&
      playerRef.current &&
      videoBlobUrl
    ) {
      // Pequeno atraso para garantir montagem
      setTimeout(() => {
        playerRef.current.seekTo(progressoInicial, "seconds")
        setHasSeeked(true)
      }, 500)
    }
  }, [isPlayerReady, progressoPronto, hasSeeked, videoBlobUrl])

  // ⏱ Salva progresso a cada 10s
  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current && currentVideo?.id) {
        const tempoAtual = playerRef.current.getCurrentTime()
        const duracao = currentVideo.duracao || 0
        const concluido = tempoAtual >= duracao - 2

        if (tempoAtual > maxProgressoSalvo) {
          api.patch("/progresso-video", {
            videoId: currentVideo.id,
            segundos: Math.floor(tempoAtual),
            concluido,
          }, {
            headers: { Authorization: `Bearer ${token}` },
          }).catch((err) => {
            console.error("Erro ao salvar progresso:", err)
          })

          setMaxProgressoSalvo(tempoAtual)
        }
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [currentVideo, maxProgressoSalvo])

  // ▶ Ao terminar vídeo
  const handleVideoEnd = async () => {
    if (!currentVideo) return

    setCurrentVideo((prev) => ({
      ...prev,
      progresso: { ...(prev.progresso || {}), concluido: true },
    }))

    modulo.videos = modulo.videos.map((v) =>
      v.id === currentVideo.id
        ? { ...v, progresso: { ...(v.progresso || {}), concluido: true } }
        : v
    )

    try {
      await api.patch("/progresso-video", {
        videoId: currentVideo.id,
        segundos: currentVideo.duracao,
        concluido: true,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      })
    } catch (err) {
      console.error("Erro ao concluir vídeo:", err)
    }

    const currentIndex = modulo.videos.findIndex((v) => v.id === currentVideo.id)
    const next = modulo.videos[currentIndex + 1]
    setNextVideo(next)

    if (next) {
      setShowCountdownOverlay(true)
      setCountdown(5)
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(interval)
            setShowCountdownOverlay(false)
            setCurrentVideo(next)
            setNextVideo(null)
            setIsPlaying(true)
            return null
          }
          return prev - 1
        })
      }, 1000)
    }
  }

  // Helpers
  const getCurrentVideoIndex = () =>
    modulo?.videos?.findIndex((v) => v.id === currentVideo?.id) || 0

  const getProgressPercentage = () => {
    const total = modulo?.videos?.length || 1
    const concluidos = modulo?.videos?.filter((v) => v.progresso?.concluido).length || 0
    return (concluidos / total) * 100
  }


  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true)
    } else {
      setIsCollapsed(false)
    }
  }, [isMobile])
  const videosConcluidos = modulo?.videos?.filter(
    (v) => v.progresso?.concluido === true
  ).length || 0

  const totalVideos = modulo?.videos?.length || 0

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "radial-gradient(circle at top left, #1E2A46, #0A1128)",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Top Bar */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 3 },
          background: "rgba(18, 24, 41, 0.95)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255, 184, 0, 0.2)",
          display: "flex",
          alignItems: "center",
          gap: 2,
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <IconButton
          onClick={() => navigate(-1)}
          sx={{
            bgcolor: "#FFB800",
            color: "#0A1128",
            "&:hover": { bgcolor: "#dba600" },
            boxShadow: 2,
          }}
        >
          <ArrowBack />
        </IconButton>

        <Avatar
          src={`https://api.digitaleduca.com.vc/${curso.thumbnail}`}
          alt="Thumbnail"
          variant="rounded"
          sx={{
            width: { xs: 40, md: 50 },
            height: { xs: 40, md: 50 },
            boxShadow: 3,
            border: "2px solid white",
          }}
        />

        <Box sx={{ overflow: "hidden", flex: 1 }}>
          <Typography variant={isMobile ? "subtitle1" : "h6"} noWrap fontWeight="bold" sx={{ color: "text.primary" }}>
            {curso.titulo}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            noWrap
            sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}
          >
            <VideoLibrary fontSize="small" />
            {modulo.titulo}
          </Typography>
        </Box>

        <Box sx={{ display: { xs: "none", md: "block" }, minWidth: 120 }}>
          <Typography variant="caption" color="text.secondary" align="center" display="block">
            Progresso: {videosConcluidos}/{totalVideos}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={getProgressPercentage()}
            sx={{
              mt: 0.5,
              height: 6,
              borderRadius: 3,
              bgcolor: "rgba(160, 160, 160, 0.2)",
              "& .MuiLinearProgress-bar": {
                borderRadius: 3,
                background: "linear-gradient(45deg, #FFB800 30%, #dba600 90%)",
              },
            }}
          />

        </Box>
      </Paper>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          minHeight: 0,
          gap: { xs: 0, md: 3 },
          p: { xs: 0, md: 3 },
        }}
      >
        {/* Player */}
        <Box
          sx={{
            flex: 1,
            p: { xs: 2, md: 0 },
            display: "flex",
            flexDirection: "column",
          }}
        >
       <Paper
  elevation={8}
  sx={{
    borderRadius: { xs: 2, md: 4 },
    overflow: "hidden",
    background: "linear-gradient(145deg, #121829, #1E2A46)",
    position: "relative",
  }}
>
  <Box
    sx={{
      aspectRatio: "16/9",
      position: "relative",
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background:
          "linear-gradient(45deg, rgba(255, 184, 0, 0.1), rgba(30, 42, 70, 0.1))",
        zIndex: videoBlobUrl ? -1 : 1,
        pointerEvents: "none",
      },
    }}
  >
    {(isLoading || loadingProgresso) ? (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          color: "white",
        }}
      >
        <CircularProgress
          size={60}
          thickness={4}
          sx={{
            color: "#FFB800",
            "& .MuiCircularProgress-circle": {
              strokeLinecap: "round",
            },
          }}
        />
        <Typography variant="body1" sx={{ opacity: 0.8 }}>
          Carregando vídeo...
        </Typography>
      </Box>
    ) : videoBlobUrl ? (
      <>
      <Box
  onContextMenu={(e) => e.preventDefault()} // ← aqui
  sx={{
    aspectRatio: "16/9",
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background:
        "linear-gradient(45deg, rgba(255, 184, 0, 0.1), rgba(30, 42, 70, 0.1))",
      zIndex: videoBlobUrl ? -1 : 1,
      pointerEvents: "none",
    },
  }}>


        <ReactPlayer
          ref={playerRef}
          url={videoBlobUrl}
          controls
         playing={isPlaying && hasSeeked}
          onEnded={handleVideoEnd}
          width="100%"
          height="100%"
onReady={() => {
  setIsPlayerReady(true)
}}


          config={{
            file: {
              attributes: {
                controlsList: "nodownload",
              },
            },
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />

        {showCountdownOverlay && countdown !== null && (
          <ContadorPlayer countdown={countdown} nextVideo={nextVideo} />
        )}
          </Box>
      </>
    ) : (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          gap: 2,
          p: 4,
          textAlign: "center",
        }}
      >
        <PlayCircleOutline
          sx={{ fontSize: 80, opacity: 0.6, color: "#FFB800" }}
        />
        <Typography variant="h6" sx={{ opacity: 0.8 }}>
          Vídeo não disponível
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.6 }}>
          Tente novamente mais tarde
        </Typography>
      </Box>
    )}
  </Box>
</Paper>


          {/* Video Info */}
          {currentVideo && (
            <Paper
              elevation={2}
              sx={{
                mt: 3,
                p: 3,
                borderRadius: 3,
                background: "rgba(18, 24, 41, 0.9)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 184, 0, 0.1)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: "#FFB800",
                    color: "#0A1128",
                    fontWeight: "bold",
                  }}
                >
                  {getCurrentVideoIndex() + 1}
                </Avatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    gutterBottom
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: 13, sm: 14 },
                      whiteSpace: "pre-line",
                      wordBreak: "break-word",
                    }}
                  >
                    {currentVideo.titulo}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1,
                      mt: 1,
                    }}
                  >
                    <Chip
                      label={`Módulo: ${modulo.titulo}`}
                      size="small"
                      sx={{
                        bgcolor: "#1E2A46",
                        color: "#FFFFFF",
                        maxWidth: "100%",
                        fontSize: { xs: 10, sm: 12 },
                      }}
                    />
                    {currentVideo?.progresso?.concluido && (
                      <Chip
                        icon={<CheckCircle fontSize="small" />}
                        label="Assistido"
                        size="small"
                        sx={{
                          bgcolor: "#FFB800",
                          color: "#0A1128",
                          maxWidth: "100%",
                          fontSize: { xs: 10, sm: 12 },
                        }}
                      />
                    )}
                  </Box>
                </Box>
              </Box>
            </Paper>
          )}
        </Box>

        {/* Sidebar */}
        <Paper
          elevation={4}
          sx={{
            width: isMobile ? "100%" : isCollapsed ? 80 : 350,
            height: isMobile ? (isCollapsed ? 80 : 400) : "fit-content",
            maxHeight: isMobile ? (isCollapsed ? 80 : 400) : "calc(100vh - 200px)",
            borderRadius: { xs: "16px 16px 0 0", md: 3 },
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            background: "rgba(18, 24, 41, 0.95)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 184, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            position: isMobile ? "fixed" : "static",
            bottom: isMobile ? 0 : "auto",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              p: 2,
              borderBottom: "1px solid rgba(255, 184, 0, 0.2)",
              background: "linear-gradient(135deg, #1E2A46 0%, #0A1128 100%)",
              color: "#FFFFFF",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              {((isMobile && isCollapsed) || !isCollapsed) && (
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Lista de Vídeos
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>
                    {modulo?.videos?.length || 0} vídeos disponíveis
                  </Typography>
                </Box>
              )}

              <IconButton onClick={() => setIsCollapsed((prev) => !prev)} sx={{ color: "white", ml: "auto" }}>
                {isCollapsed ? <MenuOpen /> : <Menu />}
              </IconButton>
            </Box>
          </Box>

          {isCollapsed ? (
            // Modo colapsado (ícone + tooltip + info atual)
            <Box
              sx={{
                p: 2,
                textAlign: "center",
                display: "flex",
                flexDirection: isMobile ? "row" : "column",
                alignItems: "center",
                justifyContent: isMobile ? "space-between" : "center",
                gap: isMobile ? 2 : 1,
              }}
            >
              <Tooltip
                title={
                  <Box sx={{ p: 1 }}>
                    <Typography variant="body2" fontWeight={600}>
                      Expandir lista de vídeos
                    </Typography>
                    <Typography variant="caption" sx={{ color: "gray" }}>
                      {modulo?.videos?.length || 0} vídeos
                    </Typography>
                    <Typography variant="caption" sx={{ color: "gray" }}>
                      Assistindo: {getCurrentVideoIndex() + 1}/{modulo?.videos?.length || 0}
                    </Typography>
                    {currentVideo?.progresso?.concluido && (
                      <Typography
                        variant="caption"
                        sx={{
                          color: "success.main",
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          mt: 0.5,
                        }}
                      >
                        <CheckCircle fontSize="inherit" /> Concluído
                      </Typography>
                    )}
                  </Box>
                }
                placement={isMobile ? "top" : "left"}
                arrow
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: isMobile ? "row" : "column",
                    alignItems: "center",
                    gap: isMobile ? 1 : 0,
                    cursor: "pointer",
                  }}
                >
                  <VideoLibrary sx={{ fontSize: isMobile ? 24 : 32, color: "#FFB800" }} />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: isMobile ? "row" : "column",
                      gap: isMobile ? 1 : 0,
                    }}
                  >
                    <Typography variant="caption" sx={{ color: "#A0A0A0" }}>
                      {modulo?.videos?.length || 0} vídeos
                    </Typography>
                    {isMobile && (
                      <Typography variant="caption" sx={{ color: "#A0A0A0" }}>
                        • {getCurrentVideoIndex() + 1}/{modulo?.videos?.length || 0}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Tooltip>

              {isMobile && currentVideo && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1, minWidth: 0 }}>
                  <Avatar
                    sx={{
                      width: 24,
                      height: 24,
                      fontSize: 12,
                      bgcolor: "#FFB800",
                      color: "#0A1128",
                      fontWeight: "bold",
                    }}
                  >
                    {getCurrentVideoIndex() + 1}
                  </Avatar>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#FFFFFF",
                      fontWeight: 500,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {currentVideo.titulo}
                  </Typography>
                </Box>
              )}
            </Box>
          ) : (
            // Modo expandido (lista de vídeos)
            <Box sx={{ overflowY: "auto", flex: 1, p: 1 }}>
              <List dense>
                {modulo?.videos?.map((video, index) => (
                  <ListItem key={video.id} disablePadding sx={{ mb: 1 }}>
                    <ListItemButton
                      selected={video.id === currentVideo?.id}
                      onClick={() => {
                        setCurrentVideo(video)
                        if (isMobile) setIsCollapsed(true)
                      }}
                      sx={{
                        borderRadius: 2,
                        px: 2,
                        py: 1.5,
                        transition: "all 0.2s",
                        "&.Mui-selected": {
                          background: "linear-gradient(135deg, #FFB800 0%, #dba600 100%)",
                          color: "#0A1128",
                          transform: "translateX(4px)",
                          boxShadow: "0 4px 12px rgba(255, 184, 0, 0.25)",
                        },
                        "&.Mui-selected:hover": {
                          background: "linear-gradient(135deg, #dba600 0%, #c49600 100%)",
                        },
                        "&:hover": {
                          bgcolor: "rgba(30, 42, 70, 0.3)",
                          transform: "translateX(2px)",
                        },
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          fontSize: 14,
                          fontWeight: "bold",
                          mr: 2,
                          bgcolor: video.id === currentVideo?.id ? "rgba(10, 17, 40, 0.3)" : "#FFB800",
                          color: "#0A1128",
                          border: video.progresso?.concluido ? "2px solid #FFB800" : "none",
                        }}
                      >
                        {video.progresso?.concluido ? <CheckCircle fontSize="small" /> : index + 1}
                      </Avatar>
                      <ListItemText
                        primary={
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: video.id === currentVideo?.id ? 600 : 400,
                              lineHeight: 1.3,
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {video.titulo}
                          </Typography>
                        }
                        secondary={
                          video.progresso?.concluido && (
                            <Typography
                              variant="caption"
                              sx={{
                                color: video.id === currentVideo?.id ? "rgba(255,255,255,0.8)" : "success.main",
                                fontWeight: 500,
                              }}
                            >
                              ✓ Concluído
                            </Typography>
                          )
                        }
                      />

                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}


        </Paper>
      </Box>
    </Box>
  )
}
