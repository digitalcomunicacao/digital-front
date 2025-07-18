import TabContext from "@mui/lab/TabContext"
import TabPanel from "@mui/lab/TabPanel"
import { Box, Container, Divider, Grid, Tab, Typography } from "@mui/material"
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { useState } from "react";
import TabList from "@mui/lab/TabList";
import VideocamIcon from '@mui/icons-material/Videocam';
import { MeusCursos } from "./MeusCursos";
import { useMiniDrawer } from "../../context/DrawerContext";
import { Subscription } from "../../components/subscription/Subscripition";
import { Ads } from "../../components/ads/Ads";
export const MeusConteudos=()=>{
        const [value, setValue] = useState(0);
           const handleChange = (event, newValue) => {
        setValue(newValue);
    };
  const { miniDrawer } = useMiniDrawer(); // true ou false
    return(
    
            <Box sx={{mt:5}}>
        
                <Typography sx={{fontWeight:"bolder",fontSize:22}}>Meus conteúdos</Typography>
                <Typography color="textSecondary"sx={{fontSize:18}}>Acesse seus conteúdos salvos, assistidos e criados</Typography>
               <Box sx={{ mt: 5 }}>
                    <TabContext value={value}>
                        <Container>
                            <Box sx={{ display: "flex", justifyContent: "start" }}>
                                <TabList value={value} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab icon={<VideocamIcon />} iconPosition="start" label="Em andamento" />
                                    <Tab icon={<PlayCircleOutlineIcon />} iconPosition="start" label="Salvos" />
                                </TabList>

                            </Box>
                        </Container>

                        <Box sx={{ width: "100%" }}>
                            <Divider />
                        </Box>
                      <Grid sx={{ p: 5 }} container spacing={2}>
                            <Grid size={{ xs: 12, md:miniDrawer ? 10:10}}>
                        <TabPanel value={0}>                    
                        <MeusCursos/>
                        </TabPanel>
                        <TabPanel value={1}>
                            <Box>
                                <Typography>Conteudo 2</Typography>
                            </Box>
                        </TabPanel>
                             </Grid>
                           <Grid size={{ xs: 12, md: miniDrawer? 1:2 }}>
                              <Box sx={{ mt: 15 }}>
                                  <Subscription />
                                  <Box sx={{ mt: 5 }}>
                                    <Ads />
                                  </Box>
                                </Box>
                     </Grid>
                        </Grid>
                    </TabContext>

                </Box>
            </Box>
            
    
    )
}