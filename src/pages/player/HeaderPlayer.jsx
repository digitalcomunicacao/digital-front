import { Box, Button, IconButton, Typography, useTheme } from "@mui/material"
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { useNavigate } from "react-router-dom";
export const HeaderPlayer = ({ titulo, subtitulo, thumb }) => {
  const theme = useTheme()
  const navigate = useNavigate();
  return (
    <Box sx={{ border: 1, width: "100%", bgcolor: theme.palette.background.paper, borderColor: 'divider', p: 2 }}>
      <Box sx={{ display: "flex", gap: 2 }}>
        <IconButton
        disableRipple
          onClick={() => navigate(-1)}
          sx={{
          
          }}
        >
          <ArrowBackOutlinedIcon fontSize="small" />
        </IconButton>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Box sx={{ width: 50, height: 50, boxShadow: "rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px", border: 2, borderColor: theme.palette.text.tertiary, borderRadius: 1 }}>
            <img src={"https://api.digitaleduca.com.vc/" + thumb} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: "bolder", fontSize: { xs: 16, md: 20 } }}>{titulo}</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <VideoLibraryOutlinedIcon sx={{ color: theme.palette.text.secondary }} />
              <Typography color="textSecondary" sx={{ fontSize: { xs: 12, md: 14 } }}>{subtitulo}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}