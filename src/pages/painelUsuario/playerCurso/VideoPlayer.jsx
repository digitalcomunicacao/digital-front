"use client"

import { useEffect, useState } from "react"
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

export const VideoPlayer = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const modulo = location.state?.modulo
  const curso = location.state?.curso

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const [videoBlobUrl, setVideoBlobUrl] = useState(null)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [currentVideo, setCurrentVideo] = useState(modulo?.videos?.[0] || null)
  const [isLoading, setIsLoading] = useState(false)
  const [watchedVideos, setWatchedVideos] = useState(new Set())

  useEffect(() => {
    const fetchVideo = async () => {
      if (!currentVideo?.url) return

      setIsLoading(true)
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get(`http://10.10.10.214:3000/files/${currentVideo.url}`, {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const blobUrl = URL.createObjectURL(response.data)
        setVideoBlobUrl(blobUrl)
      } catch (error) {
        console.error("Erro ao carregar vídeo:", error)
        setVideoBlobUrl(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchVideo()

    return () => {
      if (videoBlobUrl) {
        URL.revokeObjectURL(videoBlobUrl)
      }
    }
  }, [currentVideo])

  const handleVideoEnd = () => {
    if (currentVideo) {
      setWatchedVideos((prev) => new Set([...prev, currentVideo.id]))
    }
  }

  const getCurrentVideoIndex = () => {
    return modulo?.videos?.findIndex((video) => video.id === currentVideo?.id) || 0
  }

  const getProgressPercentage = () => {
    if (!modulo?.videos?.length) return 0
    return (watchedVideos.size / modulo.videos.length) * 100
  }
  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true)
    } else {
      setIsCollapsed(false)
    }
  }, [isMobile])

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
      {/* Top Bar Enhanced */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 3 },
          background: "rgba(18, 24, 41, 0.95)", // Usando background.paper com transparência
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255, 184, 0, 0.2)", // Primary color border
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
            bgcolor: "#FFB800", // primary.main
            color: "#0A1128", // Texto escuro no amarelo
            "&:hover": { bgcolor: "#dba600" }, // Hover do tema
            boxShadow: 2,
          }}
        >
          <ArrowBack />
        </IconButton>

        <Avatar
          src={`http://10.10.10.214:3000/${curso.thumbnail}`}
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

        {/* Progress indicator */}
        <Box sx={{ display: { xs: "none", md: "block" }, minWidth: 120 }}>
          <Typography variant="caption" color="text.secondary" align="center" display="block">
            Progresso: {watchedVideos.size}/{modulo?.videos?.length || 0}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={getProgressPercentage()}
            sx={{
              mt: 0.5,
              height: 6,
              borderRadius: 3,
              bgcolor: "rgba(160, 160, 160, 0.2)", // text.secondary com transparência
              "& .MuiLinearProgress-bar": {
                borderRadius: 3,
                background: "linear-gradient(45deg, #FFB800 30%, #dba600 90%)", // Gradiente amarelo
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
        {/* Enhanced Player */}
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
              background: "linear-gradient(145deg, #121829, #1E2A46)", // Usando as cores do tema
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
                  background: "linear-gradient(45deg, rgba(255, 184, 0, 0.1), rgba(30, 42, 70, 0.1))", // Primary e secondary
                  zIndex: videoBlobUrl ? -1 : 1,
                  pointerEvents: "none",
                },
              }}
            >
              {isLoading ? (
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
                      color: "#FFB800", // primary.main
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
                <ReactPlayer
                  url={videoBlobUrl}
                  controls
                  playing
                  onEnded={handleVideoEnd}
                  width="100%"
                  height="100%"
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
                  <PlayCircleOutline sx={{ fontSize: 80, opacity: 0.6, color: "#FFB800" }} />
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

          {/* Enhanced Video Info */}
          {currentVideo && (
            <Paper
              elevation={2}
              sx={{
                mt: 3,
                p: 3,

                borderRadius: 3,
                background: "rgba(18, 24, 41, 0.9)", // background.paper com transparência
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 184, 0, 0.1)", // Borda sutil amarela
              }}
            >
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: "#FFB800", // primary.main
                    color: "#0A1128", // Texto escuro
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
                      fontSize: { xs: 13, sm: 14 }, // responsivo
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
                    {watchedVideos.has(currentVideo.id) && (
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

        {/* Enhanced Sidebar */}
        <Paper
          elevation={4}
          sx={{
            width: isMobile ? "100%" : isCollapsed ? 80 : 350,
            height: isMobile ? (isCollapsed ? 80 : 400) : "fit-content", // Altura menor quando colapsada no mobile
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
          {/* Enhanced Header */}
          <Box
            sx={{
              p: 2,
              borderBottom: "1px solid rgba(255, 184, 0, 0.2)",
              background: "linear-gradient(135deg, #1E2A46 0%, #0A1128 100%)", // Gradiente do tema
              color: "#FFFFFF", // text.primary
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
         {((isMobile && isCollapsed || !isCollapsed ) || (!isMobile && !isCollapsed)) && (
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

          {/* Enhanced Video List */}
          {!isCollapsed && (
            <Box sx={{ overflowY: "auto", flex: 1, p: 1 }}>
              <List dense>
                {modulo?.videos?.map((video, index) => (
                  <ListItem key={video.id} disablePadding sx={{ mb: 1 }}>
                    <ListItemButton
                      selected={video.id === currentVideo?.id}
                      onClick={() => {
                        setCurrentVideo(video);
                        if (isMobile) {
                          setIsCollapsed(true); // colapsar após selecionar no mobile
                        }
                      }}
                      sx={{
                        borderRadius: 2,
                        px: 2,
                        py: 1.5,
                        transition: "all 0.2s",
                        "&.Mui-selected": {
                          background: "linear-gradient(135deg, #FFB800 0%, #dba600 100%)", // Gradiente amarelo
                          color: "#0A1128", // Texto escuro no amarelo
                          transform: "translateX(4px)",
                          boxShadow: "0 4px 12px rgba(255, 184, 0, 0.25)",
                        },
                        "&.Mui-selected:hover": {
                          background: "linear-gradient(135deg, #dba600 0%, #c49600 100%)", // Hover mais escuro
                        },
                        "&:hover": {
                          bgcolor: "rgba(30, 42, 70, 0.3)", // secondary com transparência
                          transform: "translateX(2px)",
                        },
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          fontSize: 14,
                          bgcolor: video.id === currentVideo?.id ? "rgba(10, 17, 40, 0.3)" : "#FFB800",
                          color: video.id === currentVideo?.id ? "#0A1128" : "#0A1128",
                          mr: 2,
                          fontWeight: "bold",
                          border: watchedVideos.has(video.id) ? "2px solid #FFB800" : "none",
                        }}
                      >
                        {watchedVideos.has(video.id) ? <CheckCircle fontSize="small" /> : index + 1}
                      </Avatar>
                      <ListItemText
                        primary={
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: video.id === currentVideo?.id ? 600 : 400,
                              lineHeight: 1.3,
                            }}
                          >
                            {video.titulo}
                          </Typography>
                        }
                        secondary={
                          watchedVideos.has(video.id) && (
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

          {/* Collapsed State - agora funciona para mobile e desktop */}
          {isCollapsed && (
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
              <Tooltip title="Expandir lista de vídeos" placement={isMobile ? "top" : "left"}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: isMobile ? "row" : "column",
                    alignItems: "center",
                    gap: isMobile ? 1 : 0,
                  }}
                >
                  <VideoLibrary sx={{ fontSize: isMobile ? 24 : 32, color: "#FFB800" }} />
                  <Box sx={{ display: "flex", flexDirection: isMobile ? "row" : "column", gap: isMobile ? 1 : 0 }}>
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

              {/* Mostrar vídeo atual no mobile quando colapsado */}
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
          )}
        </Paper>
      </Box>
    </Box>
  )
}
