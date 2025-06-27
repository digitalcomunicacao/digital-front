import { Box, Button, Chip, Container, Divider, IconButton, Typography } from "@mui/material"
import ResponsiveAppBar from "../customAppBar/ResponsiveAppBar"
import { useLocation, useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import theme from "../../theme/theme";
import { useState } from "react";
import WidgetsIcon from '@mui/icons-material/Widgets';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { VisaoGeral } from "./VisaoGeral";
import { ConteudoCurso } from "./ConteudoCurso";
export const DetalhesCurso = () => {
    const location = useLocation();
    const curso = location.state?.curso;
    const navigate = useNavigate()
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    if (!curso) return <div>Curso não encontrado</div>;
    return (
        <>
            <ResponsiveAppBar />
            <Box sx={{ mt: { xs: 10, md: 15 } }}>
             <Container>
                    <IconButton onClick={() => navigate(-1)} sx={{ display: "flex", gap: 1, borderRadius: 2, alignItems: "center" }}>
                        <KeyboardBackspaceIcon sx={{ color: theme.palette.text.secondary }} />
                        <Typography color="textSecondary">Voltar</Typography>
                    </IconButton>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <Typography color="textPrimary" sx={{ fontWeight:"bolder",fontSize: {xs:20,md:30} }}>{curso.titulo}</Typography>
                            <Typography color="textSecondary" sx={{ fontSize:{xs:16,md:18}, width: { xs: "100%", md: "60%" } }}>{curso.descricao}</Typography>
                            <Box>
                                <Chip
                                    label={curso.level}
                                    size="small"
                                    sx={{
                                        mt: 2,
                                        backgroundColor: "primary.main",
                                        color: "primary.contrastText",
                                        fontWeight: "bold",
                                    }}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ display: { xs: "none", md: "block" }, width: "400px", height: "auto" }}>
                            <img src={`http://10.10.10.214:3000/${curso.thumbnail}`} style={{ width: "100%", height: "100%", borderRadius: 30, boxShadow: "0 12px 32px rgba(255, 184, 0, 0.4)", }} />
                        </Box>
                    </Box>
                </Container>
                <Box sx={{ mt: 5 }}>
                    <TabContext value={value}>
                        <Container>
                            <Box sx={{ display: "flex", justifyContent: "start" }}>
                                <TabList value={value} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab icon={<WidgetsIcon />} iconPosition="start" label="Visão geral" />
                                    <Tab icon={<PlayCircleOutlineIcon />} iconPosition="start" label="Conteúdos" />
                                </TabList>

                            </Box>
                        </Container>

                        <Box sx={{ width: "100%" }}>
                            <Divider />
                        </Box>
                        <Container>
                        <TabPanel value={0}>
                            <VisaoGeral curso={curso} />
                        </TabPanel>
                        <TabPanel value={1}>
                           <ConteudoCurso curso={curso}/>
                        </TabPanel>
                         </Container>
                    </TabContext>

                </Box>
            </Box>

        </>
    )
}