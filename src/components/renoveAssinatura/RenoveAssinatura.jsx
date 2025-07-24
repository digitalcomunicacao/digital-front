import { Box, Button, Typography, useTheme } from "@mui/material"
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useNavigate } from "react-router-dom";
export const RenoveAssinatura = () => {
    const theme = useTheme()
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const navigate=useNavigate()
    return (
        <>
        {!user.assinante && (
        <Box sx={{ width: "100%", height: "auto", border: 1, bgcolor: theme.palette.background.paper, borderColor: "divider", borderRadius: 5 }}>
            <Box sx={{ p: 5, textAlign: "center", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", gap: 3 }}>
                <Box sx={{ width: 90, height: 50 }}>
                    <img src="/aseets/logo-dark.png" style={{ width: "100%", height: "100%" }} />
                </Box>
                <Typography sx={{ fontWeight: "bolder", fontSize: 23, lineHeight: 1 }}>Renove sua assinatura</Typography>
                <Box>
                   <Typography color="textPrimary" sx={{fontSize:45,fontWeight:"bolder"}}><span style={{fontSize:15,fontWeight:"normal"}}>R$</span>49,00</Typography>
                    <Typography color="textSecondary" sx={{fontSize:12}}>ou R$ 350/anual</Typography>
                </Box>
                <Button variant="outlined" onClick={()=>navigate('/checkout')} sx={{ fontSize: 17, fontWeight: "bolder", color: theme.palette.text.primary }} fullWidth endIcon={<OpenInNewIcon />}>Assinar</Button>
            </Box>
        </Box>
           )}
             </>
    )
}