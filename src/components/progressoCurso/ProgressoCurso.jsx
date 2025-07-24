import { Box, LinearProgress, Typography, useTheme } from "@mui/material";

export const ProgressoCurso = ({ curso, showText = true }) => {
  const theme = useTheme();

  const calcularProgresso = () => {
    let duracaoTotal = 0;
    let segundosAssistidos = 0;

    curso.modulos?.forEach((modulo) => {
      modulo.videos?.forEach((video) => {
        duracaoTotal += video.duracao || 0;
        if (video.progresso && typeof video.progresso.segundos === "number") {
          segundosAssistidos += video.progresso.segundos;
        } else {
          segundosAssistidos += video.segundos || 0;
        }
      });
    });

    if (duracaoTotal === 0) return 0;
    return Math.round((segundosAssistidos / duracaoTotal) * 100);
  };

  const progresso = calcularProgresso();

  return (
    <Box>
      {showText && (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>Progresso</Typography>
          <Typography sx={{ fontWeight: "bolder" }}>{progresso}%</Typography>
        </Box>
      )}
      <LinearProgress
        variant="determinate"
        value={progresso}
        sx={{
          width: "100%",
          height: 8,
          borderRadius: 3,
          mt: 1,
          backgroundColor: theme.palette.primary.light, // fundo da barra
          "& .MuiLinearProgress-bar": {
            borderRadius: 5,
            backgroundColor: theme.palette.primary.dark, // preenchimento da barra
          },
        }}
      />

    </Box>
  );
};
