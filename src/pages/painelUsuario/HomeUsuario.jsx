"use client"

import { useEffect, useState } from "react"
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  Grid,
  Stack,
  Avatar,
  IconButton,
  CircularProgress,
} from "@mui/material"
import { CalendarToday, PlayArrow, BookmarkBorder, FilterList, ChevronRight } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import api from "../../config/Api"


const mockCourses = [
  {
    id: "1",
    title: "NLW Agents",
    description: "Crie um projeto completo do zero e alcance o próximo nível em programação, em apenas uma semana.",
    date: "07 - 10",
    time: "JUL",
    type: "EVENTO",
    level: "INICIANTE",
    technology: "React",
    isLive: true,
    isFree: true,
    status: "EM_BREVE",
  },
  {
    id: "2",
    title: "Tech English: Inglês para devs",
    description:
      "Hello, dev! 👋 Todas as TERÇAS e QUINTAS, às 10h da manhã, na plataforma Zoom, oferecemos aulas gratuitas de inglês na...",
    date: "26",
    time: "JUN",
    type: "CONTEÚDO",
    level: "INICIANTE",
    technology: "Carreira",
    status: "FINALIZADO",
  },
  {
    id: "3",
    title: "React Native: Expo Router e SQLite",
    description:
      "Neste módulo, você irá aprender a como criar aplicações mobile multiplataforma usando o Expo Router para criação de rotas...",
    date: "26",
    time: "JUN",
    type: "CONTEÚDO",
    level: "INTERMEDIÁRIO",
    technology: "React Native",
    status: "DISPONÍVEL",
  },
  {
    id: "4",
    title: "Go: Continuando no MVC",
    description:
      "Vamos continuar as aulas sobre Arquitetura MVC? Nessas novas aulas você irá ver sobre Services, regras de negócios e...",
    date: "26",
    time: "JUN",
    type: "CONTEÚDO",
    level: "INTERMEDIÁRIO",
    technology: "Go",
    status: "DISPONÍVEL",
  },
  {
    id: "5",
    title: "Next.js 15: Novidades e Performance",
    description:
      "Descubra todas as novidades do Next.js 15, incluindo melhorias de performance, novos hooks e recursos avançados.",
    date: "15",
    time: "JUL",
    type: "NOVIDADE",
    level: "AVANÇADO",
    technology: "Next.js",
    status: "EM_BREVE",
  },
  {
    id: "6",
    title: "TypeScript Avançado: Patterns e Boas Práticas",
    description:
      "Aprenda patterns avançados do TypeScript, utility types, decorators e como estruturar projetos grandes.",
    date: "22",
    time: "JUL",
    type: "CONTEÚDO",
    level: "AVANÇADO",
    technology: "TypeScript",
    status: "EM_BREVE",
  },
]

const filterOptions = ["TODOS OS LEMBRETES", "EVENTOS", "CONTEÚDOS", "NOVIDADES DA PLATAFORMA", "OFERTAS"]

const getTechnologyColor = (tech) => {
  const colors = {
    React: "#61DAFB",
    "React Native": "#61DAFB",
    "Next.js": "#000000",
    TypeScript: "#3178C6",
    Go: "#00ADD8",
    Carreira: "#FFB800",
  }
  return colors[tech] || "#FFB800"
}

const getLevelColor = (level) => {
  const colors = {
    INICIANTE: "#4CAF50",
    INTERMEDIÁRIO: "#FF9800",
    AVANÇADO: "#F44336",
  }
  return colors[level] || "#FFB800"
}

export default function HomeUsuario() {
  const [selectedFilter, setSelectedFilter] = useState("TODOS OS LEMBRETES")
  const [cursoContinua, setCursoContinua] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await api.get("/curso-selecionado/cursos", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })

        const cursos = response.data
    
      for (const curso of cursos) {
  for (const modulo of curso.modulos) {
    for (const video of modulo.videos) {
      if (!video.progresso?.concluido) {
        const todosVideos = curso.modulos.flatMap((m) => m.videos)
        const segundosTotais = todosVideos.reduce((acc, v) => acc + (v.duracao || 0), 0)
        const segundosAssistidos = todosVideos.reduce(
          (acc, v) => acc + (v.progresso?.segundos || 0),
          0
        )
        const progressoPercentual = Math.floor((segundosAssistidos / Math.max(segundosTotais, 1)) * 100)

        setCursoContinua({
          titulo: curso.titulo,
          progresso: progressoPercentual,
          thumbnail: curso.thumbnail,
          modulo,
          curso: {
            ...curso,
            modulos: undefined,
          },
        })

        return
      }
    }
  }
}


      } catch (err) {
        console.error("Erro ao carregar cursos:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCursos()
  }, [])

  const handleContinuarCurso = () => {
    if (cursoContinua) {
      navigate("/painel-usuario/curso/player", {
        state: {
          curso: cursoContinua.curso,
          modulo: cursoContinua.modulo,
        },
      })
    }
  }
  const continueCourse = {
    title: "Angular - Curso Introdutório",
    progress: 65,
    technology: "Angular",
  }

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          background: "radial-gradient(circle at top left, #1E2A46, #0A1128)",
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          {/* Continue de onde parou */}
          <Box mb={6}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              Continue de onde parou
            </Typography>

            {isLoading ? (
              <CircularProgress color="primary" />
            ) : cursoContinua ? (
              <Card
                onClick={handleContinuarCurso}
                sx={{
                  background: "linear-gradient(135deg, #121829 0%, #1E2A46 100%)",
                  border: "1px solid rgba(255, 184, 0, 0.2)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(255, 184, 0, 0.15)",
                  },
                }}
              >
                <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: "#DD0031",
                      width: 56,
                      height: 56,
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      overflow: "hidden", // <-- garante que a imagem fique dentro do círculo
                    }}
                  >
                    {cursoContinua.thumbnail ? (
                      <img
                        src={"https://api.digitaleduca.com.vc/" + cursoContinua.thumbnail}
                        alt={cursoContinua.titulo}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      cursoContinua.titulo[0]
                    )}
                  </Avatar>

                  <Box flex={1}>
                    <Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase" }}>
                      CURSO
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {cursoContinua.titulo}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                      <Box
                        sx={{
                          width: 100,
                          height: 4,
                          bgcolor: "rgba(255, 184, 0, 0.2)",
                          borderRadius: 2,
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          sx={{
                            width: `${cursoContinua.progresso}%`,
                            height: "100%",
                            bgcolor: "primary.main",
                          }}
                        />
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {cursoContinua.progresso}%
                      </Typography>
                    </Box>
                  </Box>
                  <ChevronRight sx={{ color: "text.secondary" }} />
                </CardContent>
              </Card>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Nenhum curso em andamento.
              </Typography>
            )}
          </Box>

          {/* Veja o que vem aí */}
          <Box>
            <Box mb={3}>
              <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
                Veja o que vem aí
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Descubra as novidades da Rocketseat
              </Typography>
            </Box>

            {/* Filtros */}
            <Box mb={4}>
              <Stack direction="row" spacing={2} sx={{ mb: 2, flexWrap: { xs: "nowrap", md: "wrap" }, overflowX: { xs: "auto", md: "unset" }, gap: 1 }}>
                {filterOptions.map((filter) => (
                  <Chip
                    key={filter}
                    label={filter}
                    onClick={() => setSelectedFilter(filter)}
                    variant={selectedFilter === filter ? "filled" : "outlined"}
                    sx={{
                      bgcolor: selectedFilter === filter ? "primary.main" : "transparent",
                      color: selectedFilter === filter ? "#0A1128" : "text.primary",
                      borderColor: selectedFilter === filter ? "primary.main" : "rgba(255, 184, 0, 0.3)",
                      "&:hover": {
                        bgcolor: selectedFilter === filter ? "primary.main" : "rgba(255, 184, 0, 0.1)",
                      },
                    }}
                  />
                ))}
                <IconButton size="small" sx={{ color: "text.secondary" }}>
                  <FilterList />
                </IconButton>
              </Stack>
            </Box>

            {/* Lista de Cursos */}
            <Grid container spacing={3}>
              {mockCourses.map((course, index) => (
                <Grid item xs={12} key={course.id}>
                  <Card
                    sx={{
                      background: "linear-gradient(135deg, #121829 0%, #1A1F35 100%)",
                      border: `2px solid ${index === 0 ? "#FFB800" : "rgba(255, 255, 255, 0.1)"}`,
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      position: "relative",
                      overflow: "visible",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 12px 30px rgba(0, 0, 0, 0.3)",
                        border: "2px solid rgba(255, 184, 0, 0.5)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: 4,
                        bgcolor: getTechnologyColor(course.technology),
                      }}
                    />

                    <CardContent sx={{ p: 3 }}>
                      <Grid container spacing={3} alignItems="center">
                        <Grid item>
                          <Box sx={{ textAlign: "center", minWidth: 60 }}>
                            <Typography variant="h4" sx={{ fontWeight: 700, lineHeight: 1, color: "primary.main" }}>
                              {course.date}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                color: "text.secondary",
                                textTransform: "uppercase",
                                fontWeight: 600,
                              }}
                            >
                              {course.time}
                            </Typography>
                          </Box>
                        </Grid>

                        <Grid item xs>
                          <Box>
                            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                              <Typography
                                variant="caption"
                                sx={{
                                  color: "text.secondary",
                                  textTransform: "uppercase",
                                  fontWeight: 600,
                                }}
                              >
                                {course.type}
                              </Typography>
                              {course.isFree && (
                                <Chip
                                  label="GRÁTIS"
                                  size="small"
                                  sx={{
                                    bgcolor: "#4CAF50",
                                    color: "white",
                                    fontSize: "0.7rem",
                                    height: 20,
                                  }}
                                />
                              )}
                              {course.status === "FINALIZADO" && (
                                <Chip
                                  label="FINALIZADO"
                                  size="small"
                                  sx={{
                                    bgcolor: "rgba(255, 255, 255, 0.1)",
                                    color: "text.secondary",
                                    fontSize: "0.7rem",
                                    height: 20,
                                  }}
                                />
                              )}
                            </Stack>

                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: "text.primary" }}>
                              {course.title}
                            </Typography>

                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                              {course.description}
                            </Typography>

                            <Stack direction="row" spacing={1} flexWrap="wrap">
                              <Chip
                                label={course.level}
                                size="small"
                                sx={{
                                  bgcolor: getLevelColor(course.level),
                                  color: "white",
                                  fontSize: "0.75rem",
                                }}
                              />
                              <Chip
                                label={course.technology}
                                size="small"
                                sx={{
                                  bgcolor: getTechnologyColor(course.technology),
                                  color: course.technology === "Next.js" ? "white" : "#000",
                                  fontSize: "0.75rem",
                                }}
                              />
                            </Stack>
                          </Box>
                        </Grid>

                        <Grid item>
                          <Stack direction="row" spacing={1}>
                            {course.status === "EM_BREVE" && (
                              <Button variant="contained" startIcon={<CalendarToday />} sx={{ minWidth: 140 }}>
                                Garantir ingresso
                              </Button>
                            )}
                            {course.status === "DISPONÍVEL" && (
                              <Button variant="contained" startIcon={<PlayArrow />} sx={{ minWidth: 120 }}>
                                Assistir
                              </Button>
                            )}
                            {course.status === "FINALIZADO" && (
                              <Button variant="outlined" startIcon={<PlayArrow />} sx={{ minWidth: 120 }}>
                                Ver gravação
                              </Button>
                            )}
                            <IconButton sx={{ color: "text.secondary", "&:hover": { color: "primary.main" } }}>
                              <BookmarkBorder />
                            </IconButton>
                            <IconButton sx={{ color: "text.secondary" }}>
                              <ChevronRight />
                            </IconButton>
                          </Stack>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box textAlign="center" mt={4}>
              <Button variant="outlined" size="large" sx={{ minWidth: 200, py: 1.5 }}>
                Ver mais
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  )
}
