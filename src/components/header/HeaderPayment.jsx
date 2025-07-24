import { AppBar, Box, Button,Container,Toolbar, Typography, useTheme } from "@mui/material"
import { useThemeMode } from "../../context/ThemeContext";
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
export const HeaderPayment = () => {
    const theme = useTheme()
      const { darkMode, toggleTheme } = useThemeMode();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" elevation={0} sx={{
                borderBottom: 1,
                borderColor: "divider",
                zIndex: theme.zIndex.drawer + 1,
                bgcolor: theme.palette.background.paper,
                py: 2
            }}>
                <Container>

            
                <Toolbar sx={{display:"flex",justifyContent:"space-between"}}>
                 <Box  sx={{ cursor: "pointer", ml: 2, width: "94px", height: "52px" }}>
                               <img src={!darkMode ? "/aseets/logo-color.svg" : "/aseets/logo-digital-educa.png"} style={{ width: "100%", height: "100%" }} />
                             </Box>
                             <Box sx={{display:"flex",alignItems:"center",gap:1}}>
                                <VerifiedUserOutlinedIcon color="success" sx={{fontSize:"40px"}}/>
                                  <Box sx={{border:1,borderRadius:5,p:1}}>
                            <Typography sx={{fontWeight:"bolder",fontSize:19}}>Compra Segura</Typography>
                        </Box>
                             </Box>
                      

                </Toolbar>
                    </Container>
            </AppBar>
        </Box>
    )
}