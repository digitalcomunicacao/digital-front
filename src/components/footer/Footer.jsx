import { Box, Container, Grid, Typography, Link, IconButton, Divider, TextField, Button } from "@mui/material"
import { Facebook, Twitter, Instagram, LinkedIn, YouTube, Email, Phone, LocationOn, Send } from "@mui/icons-material"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: <Facebook />, url: "#", label: "Facebook" },
    { icon: <Instagram />, url: "#", label: "Instagram" },
    { icon: <Twitter />, url: "#", label: "Twitter" },
    { icon: <LinkedIn />, url: "#", label: "LinkedIn" },
    { icon: <YouTube />, url: "#", label: "YouTube" },
  ]

  const quickLinks = [
    { label: "Início", url: "#" },
    { label: "Cursos", url: "#" },
    { label: "Sobre", url: "#" },
    { label: "Blog", url: "#" },
    { label: "Contato", url: "#" },
  ]

  const courseCategories = [
    { label: "Desenvolvimento Web", url: "#" },
    { label: "Mobile", url: "#" },
    { label: "Data Science", url: "#" },
    { label: "DevOps", url: "#" },
    { label: "UI/UX Design", url: "#" },
  ]

  const supportLinks = [
    { label: "Central de Ajuda", url: "#" },
    { label: "Política de Privacidade", url: "#" },
    { label: "Termos de Uso", url: "#" },
    { label: "FAQ", url: "#" },
    { label: "Suporte Técnico", url: "#" },
  ]

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1a252f",
        color: "white",
        pt: 6,
        pb: 3,
      }}
    >
      <Container maxWidth="lg">
        {/* Main Footer Content */}
        <Grid container spacing={4} mb={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Box mb={3}>
              <Typography variant="h5" component="div" sx={{ fontWeight: "bold", mb: 2, color: "#ffc107" }}>
                digital educa
              </Typography>
              <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)", lineHeight: 1.6, mb: 3 }}>
                Transformando carreiras através da educação tecnológica de qualidade. Aprenda com os melhores
                profissionais do mercado e acelere sua jornada no mundo da tecnologia.
              </Typography>

              {/* Contact Info */}
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Email sx={{ mr: 1, fontSize: "1rem", color: "#ffc107" }} />
                  <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                    contato@digitaleduca.com.br
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Phone sx={{ mr: 1, fontSize: "1rem", color: "#ffc107" }} />
                  <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                    (11) 9999-9999
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <LocationOn sx={{ mr: 1, fontSize: "1rem", color: "#ffc107" }} />
                  <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                    São Paulo, SP - Brasil
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: "bold", color: "#ffc107" }}>
              Links Rápidos
            </Typography>
            <Box>
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  sx={{
                    display: "block",
                    color: "rgba(255, 255, 255, 0.7)",
                    textDecoration: "none",
                    mb: 1,
                    fontSize: "0.9rem",
                    "&:hover": {
                      color: "#ffc107",
                      textDecoration: "underline",
                    },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Course Categories */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: "bold", color: "#ffc107" }}>
              Categorias
            </Typography>
            <Box>
              {courseCategories.map((category, index) => (
                <Link
                  key={index}
                  href={category.url}
                  sx={{
                    display: "block",
                    color: "rgba(255, 255, 255, 0.7)",
                    textDecoration: "none",
                    mb: 1,
                    fontSize: "0.9rem",
                    "&:hover": {
                      color: "#ffc107",
                      textDecoration: "underline",
                    },
                  }}
                >
                  {category.label}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Support */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: "bold", color: "#ffc107" }}>
              Suporte
            </Typography>
            <Box>
              {supportLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  sx={{
                    display: "block",
                    color: "rgba(255, 255, 255, 0.7)",
                    textDecoration: "none",
                    mb: 1,
                    fontSize: "0.9rem",
                    "&:hover": {
                      color: "#ffc107",
                      textDecoration: "underline",
                    },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: "bold", color: "#ffc107" }}>
              Newsletter
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)", mb: 2, fontSize: "0.9rem" }}>
              Receba novidades e dicas exclusivas
            </Typography>
            <Box component="form" sx={{ mb: 2 }}>
              <TextField
                fullWidth
                placeholder="Seu e-mail"
                variant="outlined"
                size="small"
                sx={{
                  mb: 1,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "white",
                    fontSize: "0.9rem",
                    "& fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.3)",
                    },
                    "&:hover fieldset": {
                      borderColor: "#ffc107",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ffc107",
                    },
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "rgba(255, 255, 255, 0.5)",
                    opacity: 1,
                  },
                }}
              />
              <Button
                fullWidth
                variant="contained"
                endIcon={<Send />}
                sx={{
                  backgroundColor: "#ffc107",
                  color: "#1a252f",
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  "&:hover": {
                    backgroundColor: "#ffb300",
                  },
                }}
              >
                Inscrever
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)", mb: 3 }} />

        {/* Bottom Footer */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "rgba(255, 255, 255, 0.6)", textAlign: { xs: "center", md: "left" } }}
          >
            © {currentYear} Digital Educa. Todos os direitos reservados.
          </Typography>

          {/* Social Media Links */}
          <Box sx={{ display: "flex", gap: 1 }}>
            {socialLinks.map((social, index) => (
              <IconButton
                key={index}
                href={social.url}
                aria-label={social.label}
                sx={{
                  color: "rgba(255, 255, 255, 0.6)",
                  "&:hover": {
                    color: "#ffc107",
                    backgroundColor: "rgba(255, 193, 7, 0.1)",
                  },
                }}
              >
                {social.icon}
              </IconButton>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
