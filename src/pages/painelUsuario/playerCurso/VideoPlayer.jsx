import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Avatar,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import { ArrowBack, PlayArrow, MenuOpen, Menu } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactPlayer from "react-player";
import { useTheme } from "@mui/material/styles";

export const VideoPlayer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const modulo = location.state?.modulo;
  const curso = location.state?.curso;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [videoBlobUrl, setVideoBlobUrl] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(modulo?.videos?.[0] || null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchVideo = async () => {
      if (!currentVideo?.url) return;

      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://192.168.15.12:3000/files/${currentVideo.url}`,
          {
            responseType: "blob",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const blobUrl = URL.createObjectURL(response.data);
        setVideoBlobUrl(blobUrl);
      } catch (error) {
        console.error("Erro ao carregar vídeo:", error);
        setVideoBlobUrl(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideo();

    return () => {
      if (videoBlobUrl) {
        URL.revokeObjectURL(videoBlobUrl);
      }
    };
  }, [currentVideo]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", bgcolor: "background.default" }}>
      {/* Top Bar */}
      <Paper elevation={0} sx={{ p: 2, borderBottom: "1px solid #e0e0e0", display: "flex", alignItems: "center", gap: 2 }}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>
        <Avatar
          src={`http://192.168.15.12:3000/${curso.thumbnail}`}
          alt="Thumbnail"
          variant="rounded"
          sx={{ width: 40, height: 40 }}
        />
        <Box sx={{ overflow: "hidden" }}>
          <Typography variant="subtitle1" noWrap fontWeight="bold">
            {curso.titulo}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {modulo.titulo}
          </Typography>
        </Box>
      </Paper>

      {/* Conteúdo principal */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          minHeight: 0,
        }}
      >
        {/* Player */}
        <Box sx={{ flex: 1, p: { xs: 2, md: 4 } }}>
          <Box sx={{ maxWidth: "100%", mx: "auto" }}>
            <Box sx={{ aspectRatio: "16/9", bgcolor: "#000", borderRadius: 2, overflow: "hidden" }}>
              {isLoading ? (
                <Box sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <CircularProgress size={40} />
                </Box>
              ) : videoBlobUrl ? (
                <ReactPlayer url={videoBlobUrl} controls width="100%" height="100%" />
              ) : (
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    gap: 1,
                    p: 2,
                    textAlign: "center",
                  }}
                >
                  <PlayArrow sx={{ fontSize: 50, opacity: 0.4 }} />
                  <Typography variant="body1" sx={{ opacity: 0.6 }}>
                    Vídeo não disponível
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Informações do vídeo */}
            {currentVideo && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  {currentVideo.titulo}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Módulo: {modulo.titulo}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        {/* Drawer lateral (desktop) ou bottom (mobile) */}
        <Box
          sx={{
            width: isMobile ? "100%" : isCollapsed ? 60 : 300,
            height: isMobile ? 350 : "auto",
            borderTop: isMobile ? "1px solid #e0e0e0" : "none",
            borderLeft: isMobile ? "none" : "1px solid #e0e0e0",
            transition: "all 0.3s",
            bgcolor: "background.paper",
            display: "flex",
            flexDirection: "column",
           
            p: 2,
            overflow: "hidden",
          }}
        >
          {/* Botão de colapsar lateral (apenas desktop) */}
          {!isMobile && (
            <Box sx={{ display: "flex", justifyContent: isCollapsed ? "center" : "flex-end" }}>
              <IconButton onClick={() => setIsCollapsed((prev) => !prev)}>
                {isCollapsed ? <MenuOpen /> : <Menu />}
              </IconButton>
            </Box>
          )}

          {/* Lista de vídeos */}
          {!isCollapsed && (
            <>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                gutterBottom
                sx={{ display: isMobile ? "none" : "block" }}
              >
                Vídeos do Módulo
              </Typography>
              {!isMobile && <Divider sx={{ mb: 1 }} />}

              <Box
                sx={{
                  overflowY: "auto",
                  flex: 1,
                }}
              >
                <List dense>
                  {modulo?.videos?.map((video, index) => (
                    <ListItem
                      key={video.id}
                      button
                      selected={video.id === currentVideo?.id}
                      onClick={() => setCurrentVideo(video)}
                      sx={{
                        borderRadius: 1,
                        mb: 1,
                        bgcolor: video.id === currentVideo?.id ? "action.selected" : "transparent",
                        px: 1.5,
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 28,
                          height: 28,
                          fontSize: 14,
                          bgcolor: "primary.main",
                          color: "primary.contrastText",
                          mr: 2,
                        }}
                      >
                        {index + 1}
                      </Avatar>
                      <ListItemText
                        primary={
                          <Typography noWrap variant="body2">
                            {video.titulo}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </>
          )}

          {/* Tooltip colapsado (desktop apenas) */}
          {!isMobile && isCollapsed && (
            <Tooltip title="Expandir lista de vídeos" placement="left">
              <Typography variant="caption" align="center" sx={{ mt: 2 }}>
                {modulo?.videos?.length || 0} vídeos
              </Typography>
            </Tooltip>
          )}
        </Box>
      </Box>
    </Box>
  );
};
