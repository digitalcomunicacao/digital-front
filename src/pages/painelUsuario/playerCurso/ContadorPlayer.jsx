// CountdownOverlay.jsx
import React from "react"
import { Box, Typography, CircularProgress, Fade, Zoom } from "@mui/material"

const ContadorPlayer = ({ countdown, nextVideo }) => {
  return (
    <Fade in={countdown > 0} timeout={500}>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(135deg, rgba(10, 17, 40, 0.95) 0%, rgba(30, 42, 70, 0.95) 100%)",
          backdropFilter: "blur(20px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          color: "white",
        }}
      >
        <Typography variant="h6" sx={{ opacity: 0.8, mb: 1 }}>
          Próximo vídeo
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#FFB800", textAlign: "center", mb: 3 }}>
          {nextVideo?.titulo}
        </Typography>

        <Box sx={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", mb: 3 }}>
          <CircularProgress
            variant="determinate"
            value={(6 - countdown) * 20}
            size={120}
            thickness={4}
            sx={{
              color: "#FFB800",
            }}
          />
          <Box sx={{ position: "absolute" }}>
            <Zoom in={true} key={countdown}>
              <Typography
                variant="h2"
                sx={{ fontWeight: "bold", color: "#FFB800", textShadow: "0 0 20px rgba(255, 184, 0, 0.5)" }}
              >
                {countdown}
              </Typography>
            </Zoom>
          </Box>
        </Box>

        <Typography variant="body1" sx={{ opacity: 0.9 }}>
          O vídeo começará em instantes...
        </Typography>
      </Box>
    </Fade>
  )
}

export default ContadorPlayer
