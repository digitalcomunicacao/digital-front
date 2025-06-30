import { Badge, Box, Typography } from "@mui/material";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import theme from "../../theme/theme";

export const Subscription = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const formatExpirationDate = (dateString) => {
    if (!dateString) return 'sem data';
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <>

    {user.assinante && (
        
    <Box
      sx={{
        display: { xs: 'none', sm: 'flex' }, // ❌ esconde em telas pequenas
        alignItems: "center",
        gap: 1,
        bgcolor: theme.palette.primary.main,
        borderRadius: 2,
        p: 1
      }}
    >
      <EmojiEventsIcon fontSize="small" color="secondary" />
      <Typography color="secondary" sx={{ fontSize: 14, fontWeight: "bolder" }}>
        {user.plano} - Expira {formatExpirationDate(user.dataFim)}
      </Typography>
    </Box>
       )}
           </>
  );
  
};
