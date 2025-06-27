"use client"
import { Box, Container, Typography, Grid, Card, CardContent, Avatar, Chip } from "@mui/material"
import { School, People, TrendingUp, Verified } from "@mui/icons-material"
import theme from "../../theme/theme"

const Sobre = () => {


  const stats = [
    { icon: <School />, number: "500+", label: "Cursos Disponíveis" },
    { icon: <People />, number: "50k+", label: "Estudantes Ativos" },
    { icon: <TrendingUp />, number: "95%", label: "Taxa de Satisfação" },
    { icon: <Verified />, number: "100+", label: "Instrutores Certificados" },
  ]

  const values = [
    {
      title: "Inovação",
      description: "Sempre na vanguarda das tecnologias mais atuais do mercado",
    },
    {
      title: "Qualidade",
      description: "Conteúdo desenvolvido por profissionais experientes da área",
    },
    {
      title: "Acessibilidade",
      description: "Educação de qualidade ao alcance de todos",
    },
    {
      title: "Comunidade",
      description: "Uma rede de apoio entre estudantes e profissionais",
    },
  ]

  return (
     <Box
      sx={{
        background: "radial-gradient(circle at top left, #1E2A46, #0A1128)",
        position: "relative",
        overflow: "hidden",
        py: { xs: 8, md: 12 },
        
      }}
    >
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
        {/* Header Section */}
        <Box textAlign="center" mb={6}>
          <Chip
            label="🚀 Sobre a Digital Educa"
            sx={{
              backgroundColor: "rgba(255, 193, 7, 0.1)",
              color: "#ffc107",
              mb: 3,
              fontSize: "0.9rem",
            }}
          />
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: "bold",
              mb: 3,
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            Transformando{" "}
            <Box component="span" sx={{ color: "#ffc107" }}>
              vidas
            </Box>{" "}
            através da tecnologia
          </Typography>
          <Typography
            variant="h6"
            sx={{
              maxWidth: "800px",
              mx: "auto",
              lineHeight: 1.6,
              color: "rgba(255, 255, 255, 0.8)",
            }}
          >
            Somos uma plataforma de educação digital focada em capacitar profissionais para o mercado de tecnologia.
            Nossa missão é democratizar o acesso ao conhecimento e acelerar carreiras através de cursos práticos e
            atualizados.
          </Typography>
        </Box>

        {/* Stats Section */}
        <Grid container spacing={4} mb={8}>
          {stats.map((stat, index) => (
            <Grid size={{xs:12,md:6}} key={index}>
              <Card
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  textAlign: "center",
                  py: 3,
                }}
              >
                <CardContent>
                  <Avatar
                    sx={{
                      backgroundColor: "#ffc107",
                      color: "#2c3e50",
                      mx: "auto",
                      mb: 2,
                      width: 56,
                      height: 56,
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                  <Typography variant="h4" component="div" sx={{ fontWeight: "bold", color: "#ffc107", mb: 1 }}>
                    {stat.number}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                    {stat.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Mission Section */}
        <Box mb={8}>
          <Typography variant="h4" component="h2" textAlign="center" gutterBottom sx={{ fontWeight: "bold", mb: 4 }}>
            Nossa Missão
          </Typography>
          <Typography
            variant="h6"
            textAlign="center"
            sx={{
              maxWidth: "900px",
              mx: "auto",
              lineHeight: 1.8,
              color: "rgba(255, 255, 255, 0.9)",
              fontStyle: "italic",
            }}
          >
            "Capacitar pessoas através da educação tecnológica de qualidade, proporcionando as ferramentas necessárias
            para que cada estudante possa construir uma carreira sólida e próspera no mundo digital."
          </Typography>
        </Box>

        {/* Values Section */}
        <Box>
          <Typography variant="h4" component="h2" textAlign="center" gutterBottom sx={{ fontWeight: "bold", mb: 6 }}>
            Nossos Valores
          </Typography>
          <Grid container spacing={4}>
            {values.map((value, index) => (
              <Grid size={{xs:12,md:6}}  key={index}>
                <Card
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    height: "100%",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: "bold", color: "#ffc107" }}>
                      {value.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "rgba(255, 255, 255, 0.8)", lineHeight: 1.6 }}>
                      {value.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}

export default Sobre
