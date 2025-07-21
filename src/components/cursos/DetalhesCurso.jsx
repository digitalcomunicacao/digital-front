import { Box,Divider, IconButton, Typography, useTheme } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useEffect, useState } from "react";
import WidgetsIcon from '@mui/icons-material/Widgets';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { VisaoGeral } from "./VisaoGeral";
import { ConteudoCurso } from "./ConteudoCurso";
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import api from "../../config/Api";
export const DetalhesCurso = () => {
    const location = useLocation();
    const cursoId = location.state?.cursoId;
    const navigate = useNavigate()
    const theme=useTheme()
    const [curso, setCurso] = useState(null);
    const [loading, setLoading] = useState(true);

useEffect(() => {
  if (!cursoId) {
    setLoading(false);
    return;
  }

  setLoading(true);
  api.get(`/curso/${cursoId}`)
    .then(res => {
      setCurso(res.data);
      console.log(res)
    })
    .catch(() => {
      setCurso(null);
    })
    .finally(() => setLoading(false));
}, [cursoId]);
   const tab = location.state?.tab;
    const [value, setValue] = useState(tab ?? 0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

if (loading) return <div>Carregando curso...</div>;

if (!curso) return <div>Curso não encontrado</div>;
        const calcularDuracaoTotal = () => {
        const totalSegundos = curso.modulos.reduce((soma, modulo) => {
            const segundosModulo = modulo.videos?.reduce((acc, video) => acc + (video.duracao || 0), 0) || 0;
            return soma + segundosModulo;
        }, 0);

        const totalMinutos = Math.floor(totalSegundos / 60);
        const horas = Math.floor(totalMinutos / 60);

        if (horas >= 1) {
            return `${horas}H`;
        } else {
            return `${totalMinutos}min`;
        }
    };

    return (
     
            <Box sx={{p:{xs:2,md:5}}}>
                    <IconButton onClick={() => navigate(-1)} sx={{ display: "flex", gap: 1, borderRadius: 2, alignItems: "center"}}>
                        <KeyboardBackspaceIcon sx={{ color: theme.palette.text.secondary }} />
                        <Typography color="textSecondary">Voltar</Typography>
                    </IconButton>
                    <Box sx={{ display: "flex",alignItems: "center",justifyContent:"space-between"}}>
                        <Box sx={{ display: "flex", flexDirection: "column",width:{md:"40%",xs:"100%"}}}>
                            <Typography color="textPrimary" sx={{ fontWeight: "bolder",fontSize:24 }}>{curso.titulo}</Typography>
                            <Typography color="textTertiary" sx={{ fontSize:16, width: { xs: "100%", md: "60%" }}}>{curso.descricao}</Typography>
                               <Box sx={{display: "flex",gap:2,mt:2}}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <SignalCellularAltIcon />
                        <Typography color="textSecondary" sx={{ fontSize: 10, fontWeight: "bold", textTransform: "uppercase" }}>{curso.level}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <PlayCircleOutlineIcon />
                        <Typography color="textSecondary" sx={{ fontSize: 10, fontWeight: "bold" }}>
                            + {calcularDuracaoTotal()} DE AULAS
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <WorkspacePremiumIcon />
                        <Typography color="textSecondary" sx={{ fontSize: 10, fontWeight: "bold" }}>CERTIFICADO</Typography>
                    </Box>
                </Box>
                        </Box>
                        <Box sx={{ display: { xs: "none", md: "block" }, width: "600px", height: "auto"}}>
                            <img src={`https://api.digitaleduca.com.vc/${curso.thumbnail}`} style={{ width: "100%", height: "100%",borderRadius:"15px"}} />
                        </Box>
                    </Box>
                <Box>
                    <TabContext value={value}>
                     
                            <Box sx={{ display: "flex", justifyContent: "start" }}>
                                <TabList value={value} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab icon={<WidgetsIcon />} iconPosition="start" label="Visão geral" />
                                    <Tab icon={<PlayCircleOutlineIcon />} iconPosition="start" label="Conteúdos" />
                                </TabList>

                            </Box>
                      

                        <Box sx={{ width: "100%" }}>
                            <Divider />
                        </Box>
               
                            <TabPanel value={0}>
                                <VisaoGeral curso={curso} />
                            </TabPanel>
                            <TabPanel value={1}>
                                <ConteudoCurso curso={curso} />
                            </TabPanel>
                       
                    </TabContext>

                </Box>
            </Box>
    )
}