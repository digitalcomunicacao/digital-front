"use client"

import { useState, useRef, useEffect } from "react"
import {
  Box,
  Typography,
  IconButton,
  Slider,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Breadcrumbs,
  Link,
} from "@mui/material"
import {
  PlayArrow,
  Pause,
  VolumeUp,
  VolumeOff,
  Fullscreen,
  SkipPrevious,
  SkipNext,
  ArrowBack,
  CheckCircle,
  RadioButtonUnchecked,
  AccessTime,
  PanoramaFishEye,
} from "@mui/icons-material"
import { useLocation, useNavigate } from "react-router-dom"
import api from "../../../config/Api"

function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
}

export default function VideoPlayer() {
  const location = useLocation()
  const navigate = useNavigate()
  const curso = location.state?.curso

  const firstModuleWithVideos = curso?.modulos?.find((m) => m.videos?.length > 0) || null
  const [currentModule, setCurrentModule] = useState(firstModuleWithVideos)
  const [currentVideo, setCurrentVideo] = useState(firstModuleWithVideos?.videos?.[0] || null)
  const [videoUrl, setVideoUrl] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(100)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [progress, setProgress] = useState(0)
  const videoRef = useRef(null)




useEffect(() => {
  if (!currentVideo) return;

  const token = localStorage.getItem("token");
  const videoPath = currentVideo.url;

  api
    .get(`/files/${encodeURIComponent(videoPath)}`, {  // encode aqui
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      const url = URL.createObjectURL(res.data);
      setVideoUrl(url);
    })
    .catch((err) => {
      console.error("Erro ao carregar vídeo:", err);
      setVideoUrl(null);
    });
}, [currentVideo]);




  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateTime = () => setCurrentTime(video.currentTime)
    const updateDuration = () => setDuration(video.duration)
    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100)
      }
    }

    video.addEventListener("timeupdate", updateTime)
    video.addEventListener("timeupdate", updateProgress)
    video.addEventListener("loadedmetadata", updateDuration)

    return () => {
      video.removeEventListener("timeupdate", updateTime)
      video.removeEventListener("timeupdate", updateProgress)
      video.removeEventListener("loadedmetadata", updateDuration)
    }
  }, [videoUrl])

  const togglePlay = () => {
    if (videoRef.current) {
      isPlaying ? videoRef.current.pause() : videoRef.current.play()
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (_, newValue) => {
    if (videoRef.current) {
      videoRef.current.volume = newValue / 100
      setVolume(newValue)
    }
  }

  const handleProgressChange = (_, newValue) => {
    if (videoRef.current && duration) {
      videoRef.current.currentTime = (newValue / 100) * duration
    }
  }

  const selectVideo = (video, modulo) => {
    setCurrentModule(modulo)
    setCurrentVideo(video)
    setVideoUrl(null)
    setIsPlaying(false)
    setCurrentTime(0)
    setProgress(0)
  }

  const goToPreviousVideo = () => {
    const index = currentModule.videos.findIndex((v) => v.id === currentVideo.id)
    if (index > 0) {
      selectVideo(currentModule.videos[index - 1], currentModule)
    }
  }

  const goToNextVideo = () => {
    const index = currentModule.videos.findIndex((v) => v.id === currentVideo.id)
    if (index < currentModule.videos.length - 1) {
      selectVideo(currentModule.videos[index + 1], currentModule)
    }
  }

  const toggleFullscreen = () => {
    if (videoRef.current) {
      document.fullscreenElement
        ? document.exitFullscreen()
        : videoRef.current.requestFullscreen()
    }
  }

  const getProgressIcon = (video) => {
    if (video.progresso === 100) return <CheckCircle sx={{ color: "#4caf50" }} />
    if (video.progresso > 0) return <PanoramaFishEye sx={{ color: "#ff9800" }} />
    return <RadioButtonUnchecked sx={{ color: "#9e9e9e" }} />
  }

  if (!curso) return <Typography sx={{ p: 4 }}>Curso não encontrado.</Typography>
  if (!currentModule || !currentVideo) return <Typography sx={{ p: 4 }}>Nenhum vídeo disponível.</Typography>

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", color: "text.primary" }}>
      <Paper elevation={0} sx={{ display: "flex", alignItems: "center", gap: 2, p: 2, borderBottom: "1px solid #374151" }}>
        <IconButton sx={{ color: "text.primary" }} onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>
        <Breadcrumbs separator="/">
          <Link underline="hover" color="inherit">{curso.titulo}</Link>
          <Typography color="text.secondary">{currentModule.titulo}</Typography>
        </Breadcrumbs>
      </Paper>

      <Box sx={{ display: "flex", height: "calc(100vh - 73px)" }}>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", bgcolor: "#000" }}>
          <Box sx={{ flex: 1, position: "relative" }}>
<video
  ref={videoRef}
  style={{ width: "100%", height: "100%", objectFit: "contain" }}
  src={videoUrl || null}
  poster="/placeholder.svg"
  controls={false}
/>
            <Box sx={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)", p: 2 }}>
              <Slider value={progress} onChange={handleProgressChange} sx={{ color: "#f44336" }} />
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <IconButton onClick={goToPreviousVideo} sx={{ color: "white" }}><SkipPrevious /></IconButton>
                  <IconButton onClick={togglePlay} sx={{ color: "white" }}>
                    {isPlaying ? <Pause sx={{ fontSize: 32 }} /> : <PlayArrow sx={{ fontSize: 32 }} />}
                  </IconButton>
                  <IconButton onClick={goToNextVideo} sx={{ color: "white" }}><SkipNext /></IconButton>
                  <IconButton onClick={toggleMute} sx={{ color: "white" }}>{isMuted ? <VolumeOff /> : <VolumeUp />}</IconButton>
                  <Slider value={volume} onChange={handleVolumeChange} sx={{ width: 100, color: "white" }} />
                  <Typography variant="body2" sx={{ color: "white" }}>
                    {formatDuration(currentTime)} / {formatDuration(duration)}
                  </Typography>
                </Box>
                <IconButton onClick={toggleFullscreen} sx={{ color: "white" }}><Fullscreen /></IconButton>
              </Box>
            </Box>
          </Box>
        </Box>

        <Paper elevation={0} sx={{ width: 320, borderLeft: "1px solid #374151", bgcolor: "background.paper" }}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6">Conteúdo</Typography>
            <Typography variant="body2" color="text.secondary">{currentModule.titulo}</Typography>
          </Box>
          <Divider />
          <List disablePadding>
            {curso.modulos.map((modulo) =>
              modulo.videos.map((video, index) => (
                <Box key={video.id}>
                  <ListItem
                    button
                    onClick={() => selectVideo(video, modulo)}
                    sx={{
                      py: 2,
                      bgcolor: currentVideo?.id === video.id ? "#374151" : "transparent",
                      borderLeft: currentVideo?.id === video.id ? "4px solid #f44336" : "4px solid transparent",
                      "&:hover": { bgcolor: "#374151" },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <Box sx={{ width: 24, height: 24, borderRadius: "50%", bgcolor: "#374151", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>{index + 1}</Box>
                    </ListItemIcon>
                    <ListItemText
                      primary={<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>{getProgressIcon(video)}<Typography variant="body2" sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{video.titulo}</Typography></Box>}
                      secondary={<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><AccessTime sx={{ fontSize: 12, color: "text.secondary" }} /><Typography variant="caption" color="text.secondary">{formatDuration(video.duracao)}</Typography>{video.progresso > 0 && video.progresso < 100 && (<Typography variant="caption" sx={{ color: "#ff9800" }}>({video.progresso}%)</Typography>)}</Box>}
                    />
                  </ListItem>
                  <Divider sx={{ bgcolor: "#374151" }} />
                </Box>
              ))
            )}
          </List>
        </Paper>
      </Box>
    </Box>
  )
}
