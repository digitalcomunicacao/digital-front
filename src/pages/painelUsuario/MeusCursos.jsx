import { useEffect, useState } from "react"
import api from "../../config/Api"
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Avatar,
  LinearProgress,
} from "@mui/material"
import { useNavigate } from "react-router-dom"

export const MeusCursos = () => {
  const [curso, setCurso] = useState([])

  const getMeusCursos = () => {
    api
      .get("/curso-selecionado/cursos", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(function (response) {
        console.log("cursos selecionaods",response)
        setCurso(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const navigate = useNavigate()

  const handleIrParaCurso = (curso) => {
    navigate("/painel-usuario/curso", { state: { curso } })
  }

  useEffect(() => {
    getMeusCursos()
  }, [])

  return (
    <Box
      sx={{
        display: "flex",
        gap: 5,
        flexWrap: { xs: "nowrap", md: "wrap" },
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      {curso.map((curso, index) => {
        // Calcula total de vídeos do curso
        const totalVideos = curso.modulos.reduce(
          (acc, modulo) => acc + modulo.videos.length,
          0
        )
        // Calcula vídeos concluídos
        const videosConcluidos = curso.modulos.reduce((acc, modulo) => {
          return (
            acc + modulo.videos.filter((video) => video.progresso?.concluido)
              .length
          )
        }, 0)
        // Calcula percentual de conclusão
        const progressoPercentual =
          totalVideos > 0 ? (videosConcluidos / totalVideos) * 100 : 0

        return (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              cursor:"pointer"
            }}
          >
            <Card
              onClick={() => handleIrParaCurso(curso)}
              sx={{
                width: { xs: "100%", md: "400px" },
                height: 450,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                "&:hover": {
                  boxShadow: "0 12px 32px rgba(255, 184, 0, 0.4)", // brilho amarelo
                  transform: "translateY(-2px)",
                },
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardContent sx={{ padding: 3 }}>
                {/* Thumbnail */}
                <Box sx={{ marginBottom: 3 }}>
                  <Box
                    sx={{
                      width: "100%",
                      height: "auto",
                      fontSize: "18px",
                      fontWeight: "bold",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    <img
                      src={"https://api.digitaleduca.com.vc/" + curso.thumbnail}
                      alt={curso.titulo}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Box>
                </Box>

                {/* Informações do Curso */}
                <Box sx={{ marginBottom: 3 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#9ca3af",
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      marginBottom: 1,
                      display: "block",
                    }}
                  >
                    Aulas • {totalVideos}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#ffffff",
                      fontWeight: 600,
                      fontSize: { xs: 14, md: 20 },
                    }}
                  >
                    {curso.titulo}
                  </Typography>
                </Box>

                {/* Progresso */}
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 0.5 }}
                  >
                    Progresso: {videosConcluidos} / {totalVideos} vídeos
                    concluídos
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={progressoPercentual}
                    sx={{
                      height: 8,
                      borderRadius: 5,
                      backgroundColor: "#374151",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "#FFB800",
                      },
                    }}
                  />
                </Box>

                {/* Tags/Badges */}
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: { xs: "unset", md: "wrap" },
                    overflowX: { xs: "auto", md: "unset" },
                    gap: 1.5,
                  }}
                >
                  <Chip
                    label="INICIANTE"
                    icon={
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          backgroundColor: "#10b981",
                          borderRadius: "50%",
                          marginLeft: "8px !important",
                        }}
                      />
                    }
                    sx={{
                      backgroundColor: "#374151",
                      color: "#d1d5db",
                      "& .MuiChip-label": {
                        fontSize: "0.75rem",
                        fontWeight: 500,
                      },
                      "&:hover": {
                        backgroundColor: "#4b5563",
                      },
                    }}
                  />

                  <Chip
                    label="ANGULAR"
                    icon={
                      <Avatar
                        sx={{
                          width: "16px !important",
                          height: "16px !important",
                          backgroundColor: "#ef4444",
                          fontSize: "10px",
                          fontWeight: "bold",
                          marginLeft: "8px !important",
                        }}
                      >
                        A
                      </Avatar>
                    }
                    sx={{
                      backgroundColor: "#374151",
                      color: "#d1d5db",
                      "& .MuiChip-label": {
                        fontSize: "0.75rem",
                        fontWeight: 500,
                      },
                      "&:hover": {
                        backgroundColor: "#4b5563",
                      },
                    }}
                  />

                  <Chip
                    label="JAVASCRIPT"
                    icon={
                      <Box
                        component="span"
                        sx={{
                          color: "#fbbf24",
                          fontSize: "12px",
                          fontWeight: "bold",
                          marginLeft: "8px !important",
                        }}
                      >
                        JS
                      </Box>
                    }
                    sx={{
                      backgroundColor: "#374151",
                      color: "#d1d5db",
                      "& .MuiChip-label": {
                        fontSize: "0.75rem",
                        fontWeight: 500,
                      },
                      "&:hover": {
                        backgroundColor: "#4b5563",
                      },
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>
        )
      })}
    </Box>
  )
}
