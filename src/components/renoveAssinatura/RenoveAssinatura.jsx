import { Box, Button, Typography, useTheme } from "@mui/material"
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
export const RenoveAssinatura = () => {
    const theme = useTheme()
    return (
        <Box sx={{ width: "100%", height: "50%", border: 1,bgcolor:theme.palette.background.paper, borderColor: "divider", borderRadius: 5 }}>
            <Box sx={{p:5,textAlign:"center",display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center",gap:5}}>
                <Box sx={{width:90,height:50}}>
                    <img src="/aseets/logo-dark.png" style={{width:"100%",height:"100%"}}/>
                </Box>
                <Typography sx={{fontWeight:"bolder",fontSize:23,lineHeight:1}}>Renove sua assinatura</Typography>
                <Button variant="outlined" sx={{fontSize:17,fontWeight:"bolder",color:theme.palette.text.primary}} fullWidth endIcon={<OpenInNewIcon />}>Assinar</Button>
            </Box>
        </Box>
    )
}