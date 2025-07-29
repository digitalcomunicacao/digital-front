import { Avatar, Box, CircularProgress, Typography, useTheme } from "@mui/material";

export const Subscription = () => {
  const theme = useTheme()
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (!user.assinante || !user.dataFim || !user.dataInicio) return null;

  const now = new Date();
  const dataInicio = new Date(user.dataInicio);
  const dataFim = new Date(user.dataFim);

  const duracaoTotal = dataFim.getTime() - dataInicio.getTime();
  const tempoPassado = now.getTime() - dataInicio.getTime();

  let progresso = (tempoPassado / duracaoTotal) * 100;
  if (progresso < 0) progresso = 0;
  if (progresso > 100) progresso = 100;

  const diffTime = dataFim.getTime() - now.getTime();
  const diasRestantes = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  return (
    <>
    </>
    // <Box sx={{
    //   display: "flex", flexDirection: "column", width: "100%", height: "auto", bgcolor: theme.palette.background.default,
    //   p: 3,
    //   border: 1,
    //   borderColor: "divider",
    //   borderRadius: 5,
    // }}>
    //   <Box sx={{ textAlign: "center" }}>
    //     <Box sx={{ display: "flex", justifyContent: "center" }}>
    //       <Avatar sx={{ bgcolor: theme.palette.primary.main, color: theme.palette.text.tertiary }}>{user.nome?.charAt(0)?.toUpperCase()}</Avatar>
    //     </Box>
    //     <Typography sx={{ mt: 1, fontSize: 16, fontWeight: "bolder" }}>{user.nome}</Typography>
    //     <Typography color="textTertiary" sx={{ mt: 1, fontSize: 14 }}>{user.email}</Typography>
    //   </Box>

    //   <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: "column", gap: 2 }}>
    //     <Box
    //       sx={{
    //         display: "flex",
    //         flexDirection: 'column',
    //         alignItems: 'center',
    //         justifyContent: 'center',
    //       }}
    //     >
    //       <Box sx={{ position: 'relative', display: 'inline-flex' }}>
    //         {/* Círculo de fundo branco */}
    //         <CircularProgress
    //           variant="determinate"
    //           value={100}
    //           size={100}
    //           thickness={5}
    //           sx={{
    //             color: theme.palette.primary.light, // fundo
    //           }}
    //         />

    //         <CircularProgress
    //           variant="determinate"
    //           value={progresso}
    //           size={100}
    //           thickness={5}
    //           sx={{
    //             color: theme.palette.primary.dark, // preenchimento
    //             position: 'absolute',
    //             left: 0,
    //             top: 0,
    //           }}
    //         />


    //         {/* Conteúdo dentro do círculo */}
    //         <Box
    //           sx={{
    //             top: 0,
    //             left: 0,
    //             bottom: 0,
    //             right: 0,
    //             position: 'absolute',
    //             display: 'flex',
    //             alignItems: 'center',
    //             justifyContent: 'center',
    //             flexDirection: 'column',
    //           }}
    //         >
    //           <Typography sx={{ fontWeight: "bold", fontSize: 10 }}>Restam</Typography>
    //           <Typography sx={{ fontWeight: "bold", fontSize: 24 }}>{diasRestantes}</Typography>
    //           <Typography sx={{ fontSize: 10 }}>Dias</Typography>
    //         </Box>
    //       </Box>
    //     </Box>

    //     <Box sx={{ textAlign: "center" }}>
    //       <Box sx={{ border: 1, p: 1, borderRadius: 5, textAlign: "center", borderColor: "success.main" }}>
    //         <Typography sx={{ fontSize: 14, fontWeight: "bolder" }}>Assinatura Ativa</Typography>
    //       </Box>
    //       <Typography sx={{ fontSize: 12 }}>Sua assinatura expira</Typography>
    //       <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>13/07/2026</Typography>
    //     </Box>
    //   </Box>
    // </Box>
  );
};
