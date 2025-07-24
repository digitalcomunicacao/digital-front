import { Box, CircularProgress, useTheme } from "@mui/material";
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';

export const ProgressoModuloCircular = ({ modulo, size = 80 }) => {
  const theme = useTheme();

  const calcularProgressoModulo = () => {
    let duracaoTotal = 0;
    let segundosAssistidos = 0;

    modulo.videos?.forEach((video) => {
      duracaoTotal += video.duracao || 0;
      if (video.progresso && typeof video.progresso.segundos === "number") {
        segundosAssistidos += video.progresso.segundos;
      } else {
        segundosAssistidos += video.segundos || 0;
      }
    });

    if (duracaoTotal === 0) return 0;
    return Math.round((segundosAssistidos / duracaoTotal) * 100);
  };

  const progresso = calcularProgressoModulo();

  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        width: size,
        height: size,
      }}
    >
      {/* Círculo de fundo - cinza */}
<CircularProgress
  variant="determinate"
  value={100}
  size={size}
  thickness={5}
  sx={{
    color: theme.palette.primary.light, // fundo da barra
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 1,
  }}
/>

{/* Círculo de progresso */}
<CircularProgress
  variant="determinate"
  value={progresso}
  size={size}
  thickness={5}
  sx={{
    color: theme.palette.primary.dark, // preenchimento da barra
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 2,
    transition: "all 0.3s ease",
  }}
/>
      {/* Ícone centralizado */}
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: theme.palette.background.paperAzul,
          zIndex: 3,
          userSelect: "none",
        }}
      >
        <PlayCircleOutlinedIcon sx={{ fontSize: size * 0.5,color:theme.palette.text.primary}} />
      </Box>
    </Box>
  );
};
