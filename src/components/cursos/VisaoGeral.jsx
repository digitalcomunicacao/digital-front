import { Avatar, Box, Button, Grid, IconButton, Typography, useTheme } from "@mui/material"
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SchoolIcon from '@mui/icons-material/School';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import { useNavigate } from "react-router-dom";
import { RenoveAssinatura } from "../renoveAssinatura/RenoveAssinatura";
import ReactPlayer from "react-player";
import { useState } from "react";
export const VisaoGeral = ({ curso }) => {
    const navigate = useNavigate()
    const theme=useTheme()
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLight, setIsLight] = useState(true);
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
        <Grid container spacing={2}>
            <Grid size={{ xs: 12,lg: 9 }} >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: { xs: "column", xl: "row" }, borderRadius: 5, gap: { xs: 2, md: 10 }, border: 1, borderColor: "divider", p: 5, bgcolor: theme.palette.background.paper }}>
                    <Box
                        sx={{
                            width: {xs:"100%",lg:"550px"},
                            height: "320px",
                            
                            position: "relative",
                            border: 3,
                            borderColor: "divider",
                            borderRadius: 2,
                            overflow: "hidden",
                            backgroundColor: "#000", // previne flash branco
                            "&::before": {
                                content: '""',
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: "linear-gradient(45deg, rgba(255, 184, 0, 0.1), rgba(30, 42, 70, 0.1))",
                                zIndex: 1,
                                pointerEvents: "none",
                            },
                        }}
                    >
                        <ReactPlayer
                            url={curso.modulos[0]?.videos[0]?.url}
                            light={isLight}
                            playing={isPlaying}
                            onStart={() => {
                                setIsPlaying(true);
                                setIsLight(false);
                            }}
                            playIcon={
                                <Box
                                    onClick={() => {
                                        setIsPlaying(true);
                                        setIsLight(false);
                                    }}
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: "50%",
                                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 0 24 24" width="48" fill="#fff">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </Box>
                            }
                            controls
                            width="100%"
                            height="100%"
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                zIndex: 2
                            }}
                        />

                        {!isPlaying && (
                            <Box
                                sx={{
                                    position: "absolute",
                                    bottom: 10,
                                    left: 10,
                                    zIndex: 3,
                                    color: "#fff",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                                    padding: "6px 12px",
                                    borderRadius: "8px"
                                }}
                            >
                                <Typography sx={{ fontWeight: "bold" }}>{curso.modulos[0]?.videos[0]?.titulo}</Typography>
                                <AccessTimeIcon sx={{ fontSize: 16 }} />
                                <Typography sx={{ fontSize: 14 }}>3min</Typography>
                            </Box>
                        )}
                    </Box>


                    <Box sx={{ width: { xs: "100%", lg: "50%" } }}>
                        <Typography sx={{ textAlign: "start", fontSize: { xs: 12, md: 16 } }}>O curso Marketing Previsível foi criado para empreendedores e profissionais que querem dominar estratégias de marketing que realmente funcionam. Com uma abordagem prática e focada em resultados, você vai aprender a criar campanhas previsíveis, que geram vendas de forma constante e escalável. O curso Marketing Previsível foi criado para empreendedores e profissionais que querem dominar estratégias de marketing que realmente funcionam. Com uma abordagem prática e focada em resultados, você vai aprender a criar campanhas previsíveis, que geram vendas de forma constante e escalável.</Typography>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row", justifyContent: "space-between" } }}>
                    <Box sx={{ mt: 5, border: 1, borderColor: 'divider', width: { xs: "100%", md: "50%" }, borderRadius: 5,  bgcolor: theme.palette.background.paper }}>
                        <Box sx={{ p: 3 }}>
                            <Box sx={{ borderRadius: 5, border: 1, borderColor: 'divider', width: "100px", textAlign: "center", bgcolor: theme.palette.background.contained }}>
                                <Typography color="textSecondary" sx={{ fontSize: 17, color: theme.palette.text.tertiary }}>Educador</Typography>
                            </Box>

                            <Box sx={{ display: "flex", alignItems: "center", mb: 2, mt: 2 }}>
                                <Avatar src={curso.instrutor.nome} sx={{ width: 32, height: 32, mr: 1 }} />
                                <Box>
                                    <Typography color="textPrimary" sx={{ fontWeight: "bolder", fontSize: { xs: 14, md: 16 } }}>
                                        {curso.instrutor.nome}
                                    </Typography>
                                    <Typography color="textSecondary" sx={{ fontSize: { xs: 12, md: 16 } }}>
                                        {curso.instrutor.formacao}
                                    </Typography>
                                </Box>

                            </Box>
                            <Typography sx={{ fontSize: { xs: 12, md: 16 }, mt: 2 }}>{curso.instrutor.sobre}</Typography>
                        </Box>
                    </Box>


                    <Box sx={{ mt: 5, border: 1, borderColor: 'divider', width: { xs: "100%", md: "45%" }, borderRadius: 5, bgcolor: theme.palette.background.paper }}>
                        <Box sx={{ p: 3 }}>
                            <Box sx={{ borderRadius: 5, border: 1, borderColor: 'divider', width: "100px", textAlign: "center", bgcolor: theme.palette.background.contained }}>
                                <Typography color="textSecondary" sx={{ fontSize: 17, color: theme.palette.text.tertiary }}>Detalhes</Typography>
                            </Box>
                            <Box sx={{ display: "flex" }}>
                                <Box>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
                                        <AccessTimeIcon sx={{ color: theme.palette.text.secondary }} />
                                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                                            <Typography color="textPrimary" sx={{ fontSize: 14 }}>Horas de estudo</Typography>
                                            <Typography color="textSecondary" sx={{ fontSize: 14 }}>Aprox. {calcularDuracaoTotal()} DE AULAS</Typography>
                                        </Box>

                                    </Box>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
                                        <SchoolIcon sx={{ color: theme.palette.text.secondary }} />
                                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                                            <Typography color="textprimary" sx={{ fontSize: 14 }}>Aulas</Typography>
                                            <Typography color="textSecondary" sx={{ fontSize: 14 }}>
                                                {curso.modulos.reduce((acc, modulo) => acc + modulo.videos.length, 0)}
                                            </Typography>
                                        </Box>

                                    </Box>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
                                        <SignalCellularAltIcon sx={{ color: theme.palette.text.secondary }} />
                                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                                            <Typography color="textprimary" sx={{ fontSize: 14 }}>Nível de dificuldade</Typography>
                                            <Typography color="textSecondary" sx={{ fontSize: 14 }}>{curso.level}</Typography>
                                        </Box>
                                    </Box>
                                </Box>

                            </Box>
                            <Box sx={{ mt: 2 }}>
                                <Typography color="textPrimary" >Pré-requisitos:</Typography>
                                <Typography color="textSecondary">Recomendações para o melhor proveito dos conteúdos e facilidade de aplicação prática</Typography>
                                <Typography color="textPrimary" sx={{ fontWeight: "bolder" }}>* {curso.requisitos}</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Grid>


            <Grid size={{ xs: 12, lg: 3 }} container sx={{ justifyContent: "flex-end", alignItems: "start", }}>
                <RenoveAssinatura />
            </Grid>
        </Grid>





    )
}