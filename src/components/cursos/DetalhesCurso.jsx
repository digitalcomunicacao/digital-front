import { Box, Container, Divider, IconButton, Typography, useTheme } from "@mui/material"
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
    const [curso, setCurso] = useState(null);
    const [loading, setLoading] = useState(true);
    const theme = useTheme()
    const navigate = useNavigate()
    const token = localStorage.getItem("token");
    const isLoggedIn = !!token;
    useEffect(() => {
        if (!cursoId) {
            setLoading(false);
            return;
        }

        setLoading(true);

        const fetchCurso = async () => {
            const headers = isLoggedIn ? { Authorization: `Bearer ${token}` } : {};

            // Função auxiliar para fallback em caso de erro
            const buscarPublico = async () => {
                try {
                    const res = await api.get(`/curso/${cursoId}`, { headers: {} });
                    setCurso(res.data);
                } catch {
                    setCurso(null);
                } finally {
                    setLoading(false);
                }
            };

            try {
                if (isLoggedIn) {
                    const res = await api.get(`/curso-selecionado/${cursoId}`, { headers });
                    setCurso(res.data);
                    setLoading(false);
                } else {
                    await buscarPublico();
                }
            } catch (error) {
                console.warn("Erro ao buscar curso-selecionado, tentando público:", error);
                await buscarPublico(); // fallback para curso público
            }
        };

        fetchCurso();
    }, [cursoId, isLoggedIn, token]);


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

        <Box sx={{pb:5}}>
            <IconButton onClick={() => navigate(-1)} sx={{ position:"relative",top:40,display: "flex", gap: 1, borderRadius: 2, alignItems: "center" }}>
                <KeyboardBackspaceIcon sx={{ color: theme.palette.primary.main }} />
                <Typography color="textSecondary">Voltar</Typography>
            </IconButton>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", flexDirection: "column", width: { md: "40%", xs: "100%" } }}>
                    <Typography color="textPrimary" sx={{ fontWeight: "bolder", fontSize: 24 }}>{curso.titulo}</Typography>
                    <Typography color="textSecondary" sx={{ fontSize: 16}}>{curso.descricao}</Typography>
                    <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
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
                <Box sx={{ display: { xs: "none", md: "block" }, width: "450px", height: "250px" }}>
                    <img src={`https://api.digitaleduca.com.vc/${curso.thumbnail}`} style={{ width: "100%", height: "100%", borderRadius: "15px" }} />
                </Box>
            </Box>
            <Box >
                <TabContext value={value}>

                    <Box >
                        <TabList value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab icon={<WidgetsIcon />} iconPosition="start" label="Visão geral" />
                            <Tab icon={<PlayCircleOutlineIcon />} iconPosition="start" label="Conteúdos" />
                        </TabList>

                    </Box>


                    <Box sx={{ width: "100%" }}>
                        <Divider />
                    </Box>

                    <TabPanel sx={{ p: 0, mt: 5 }} value={0}>
                        <VisaoGeral curso={curso} />
                    </TabPanel>
                    <TabPanel sx={{ p: 0, mt: 5 }} value={1}>
                        <ConteudoCurso curso={curso} />
                    </TabPanel>

                </TabContext>

            </Box>
        </Box>
    )
}