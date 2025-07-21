import { Avatar, Box, Button, Grid, IconButton, Typography } from "@mui/material"
import theme from "../../theme/theme"
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SchoolIcon from '@mui/icons-material/School';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import { useNavigate } from "react-router-dom";
import { RenoveAssinatura } from "../renoveAssinatura/RenoveAssinatura";
import ReactPlayer from "react-player";
export const VisaoGeral = ({ curso }) => {
    const navigate = useNavigate()

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
            <Grid size={{ xs: 12, md: 8 }} >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: { xs: "column", md: "row" }, borderRadius: 5, gap: { xs: 2, md: 10 }, border: 1, borderColor: "divider", p: 5, bgcolor: theme.palette.background.paper }}>
                    <Box sx={{ width: { xs: "100%", md: "50%" }, height: "300px" }}>
                        <ReactPlayer
                            url={curso.modulos[0]?.videos[0]?.url}
                            controls
                            width="100%"
                            height="100%"

                        />
                    </Box>
                    <Box sx={{ width: { xs: "100%", md: "50%" } }}>
                        <Typography sx={{ textAlign: "start", fontSize: { xs: 12, md: 16 } }}>{curso.descricao}</Typography>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row", justifyContent: "space-between" } }}>
                    <Box sx={{ mt: 5, border: 1, borderColor: 'divider', width: { xs: "100%", md: "50%" }, borderRadius: 5, bgcolor: theme.palette.background.paper }}>
                        <Box sx={{ p: 3 }}>
                            <Box sx={{ borderRadius: 5, border: 1, borderColor: 'divider', width: "100px", textAlign: "center", bgcolor: theme.palette.background.paper }}>
                                <Typography color="textSecondary" sx={{ fontSize: 17, color: theme.palette.text.primary }}>Educador</Typography>
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
                            <Box sx={{ borderRadius: 5, border: 1, borderColor: 'divider', width: "100px", textAlign: "center", bgcolor: theme.palette.background.paper }}>
                                <Typography color="textSecondary" sx={{ fontSize: 17, color: theme.palette.text.primary }}>Detalhes</Typography>
                            </Box>
                            <Box sx={{ display: "flex" }}>
                                <Box>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
                                        <AccessTimeIcon sx={{ color: theme.palette.text.secondary }} />
                                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                                            <Typography color="textprimary" sx={{ fontSize: 14 }}>Horas de estudo</Typography>
                                            <Typography color="textTertiary" sx={{ fontSize: 14 }}>Aprox. {calcularDuracaoTotal()} DE AULAS</Typography>
                                        </Box>

                                    </Box>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
                                        <SchoolIcon sx={{ color: theme.palette.text.secondary }} />
                                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                                            <Typography color="textprimary" sx={{ fontSize: 14 }}>Aulas</Typography>
                                            <Typography color="textTertiary" sx={{ fontSize: 14 }}>
                                                {curso.modulos.reduce((acc, modulo) => acc + modulo.videos.length, 0)}
                                            </Typography>
                                        </Box>

                                    </Box>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
                                        <SignalCellularAltIcon sx={{ color: theme.palette.text.secondary }} />
                                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                                            <Typography color="textprimary" sx={{ fontSize: 14 }}>Nível de dificuldade</Typography>
                                            <Typography color="textTertiary" sx={{ fontSize: 14 }}>{curso.level}</Typography>
                                        </Box>
                                    </Box>
                                </Box>

                            </Box>
                            <Box sx={{ mt: 2 }}>
                                <Typography color="textPrimary" >Pré-requisitos:</Typography>
                                <Typography color="textTertiary">Recomendações para o melhor proveito dos conteúdos e facilidade de aplicação prática</Typography>
                                <Typography color="textPrimary" sx={{ fontWeight: "bolder" }}>* {curso.requisitos}</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Grid>


            <Grid size={{ xs: 12, md: 4 }}>
                <RenoveAssinatura />
            </Grid>
        </Grid>





    )
}