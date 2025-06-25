import { Box, Typography, Button, Container, Grid, Chip } from "@mui/material"
import { PlayArrow, TrendingUp, School, People } from "@mui/icons-material"
import theme from "../../theme/theme"
import { useNavigate } from "react-router-dom"

export default function Header() {
  const stats = [
    { icon: <School />, value: "500+", label: "Cursos" },
    { icon: <People />, value: "50k+", label: "Estudantes" },
    { icon: <TrendingUp />, value: "95%", label: "Satisfação" },
  ]
const navigate=useNavigate()
  return (
    <Box
      sx={{
        background: "radial-gradient(circle at top left, #1E2A46, #0A1128)",
        position: "relative",
        overflow: "hidden",
        py: { xs: 8, md: 12 },
      }}
    >
      {/* Elementos decorativos de fundo */}
      <Box
        sx={{
          position: "absolute",
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(144, 202, 249, 0.1) 0%, transparent 70%)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -30,
          left: -30,
          width: 150,
          height: 150,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(244, 143, 177, 0.1) 0%, transparent 70%)",
        }}
      />

      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          {/* Conteúdo Principal */}
          <Grid item xs={12} md={8}>
            <Box sx={{ mb: 3 }}>
              <Chip
                label="🚀 Novos cursos toda semana"
                sx={{
                  backgroundColor: "rgba(144, 202, 249, 0.1)",
                  border: "1px solid rgba(144, 202, 249, 0.3)",
                  mb: 3,
                }}
              />
            </Box>

            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: "bold",
                color: theme.palette.text.primary,
                mb: 3,
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                lineHeight: 1.2,
              }}
            >
              Acelere sua{" "}
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(45deg, #FFB800, #1E2A46)", // Amarelo + Azul escuro
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                carreira
              </Box>{" "}
              em tecnologia
            </Typography>


            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.secondary,
                mb: 4,
                lineHeight: 1.6,
                maxWidth: 600,
              }}
            >
              Aprenda com os melhores profissionais do mercado através de cursos práticos e atualizados. Do básico ao
              avançado, temos o conteúdo perfeito para você.
            </Typography>

            {/* Botões de Ação */}
            <Box sx={{ display: "flex", gap: 2, mb: 6, flexWrap: "wrap" }}>
              <Button
              onClick={()=>navigate('/login')}
                variant="contained"
                size="large"
                startIcon={<PlayArrow />}
                sx={{
                  py: 1.5,
                  px: 4,
                  fontSize: "1.1rem",
                  textTransform: "none",
                  borderRadius: 3,
                  backgroundColor: "#FFB800", // amarelo da logo
                  color: "#0A1128",           // azul escuro para contraste
                  boxShadow: "0 6px 20px rgba(255, 184, 0, 0.3)",
                  "&:hover": {
                    backgroundColor: "#e6a900",
                    boxShadow: "0 10px 28px rgba(255, 184, 0, 0.4)",
                  },
                }}
              >
                Começar Agora
              </Button>

              <Button
                variant="outlined"
                size="large"
                sx={{
                  py: 1.5,
                  px: 4,
                  fontSize: "1.1rem",
                  textTransform: "none",
                  borderRadius: 3,
                  color: "#FFB800", // texto amarelo
                  borderColor: "#FFB800",
                  "&:hover": {
                    backgroundColor: "rgba(255, 184, 0, 0.1)",
                    borderColor: "#e6a900",
                  },
                }}
              >
                Ver Cursos 
              </Button>

            </Box>

            {/* Estatísticas */}
            <Grid container spacing={4}>
              {stats.map((stat, index) => (
                <Grid item xs={4} key={index}>
                  <Box sx={{ textAlign: "center" }}>
                    <Box
                      sx={{
                        color: "#90caf9",
                        mb: 1,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: "bold",
                        color: "white",
                        mb: 0.5,
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "rgba(255, 255, 255, 0.7)",
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Imagem/Ilustração */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                position: "relative",
                textAlign: "center",
                display: { xs: "none", md: "block" },
              }}
            >
              <Box
                sx={{
                  width: 300,
                  height: 300,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, rgba(144, 202, 249, 0.2), rgba(244, 143, 177, 0.2))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",

                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #1e1e1e, #2d2d2d)",
                  },
                  border: 2
                }}
              >
                <School
                  sx={{
                    fontSize: 120,
                    color: "#90caf9",
                    position: "relative",
                    zIndex: 1,
                  }}
                />
                <Box sx={{ ml: 2, width: "120px", height: "50px" }}>
                  <img src='/aseets/logo-digital-educa.png' style={{ width: "100%", height: "100%" }} />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
