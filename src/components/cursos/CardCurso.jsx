

import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Chip,
    Button,
    Box,
    Avatar,
    Rating,
    useTheme,
    Link,
    Grid,

} from "@mui/material"
import { useNavigate } from "react-router-dom";
import api from "../../config/Api";
import { useSnackbar } from "../../context/SnackBarContext";
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
export const CardCurso = ({ curso }) => {
    const theme = useTheme()
    const navigate = useNavigate();
    const handleDetalhes = () => {
        navigate("/painel-usuario/curso/detalhe", { state: { cursoId: curso.id } });
    };
    const token = localStorage.getItem('token')
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
      
            <Grid  size={{xs:12,md:4}}>        
            <Card
                elevation={0}
                component={"form"}
                onClick={() => handleDetalhes(curso.id)}
                sx={{
                    height: "285px",
                    position: "relative", // necessário para overlay funcionar
                    border: 2,
                    borderColor: "divider",
                    cursor: "pointer",
                    borderRadius: 5,
                    backgroundColor: theme.palette.background.paper,
                    overflow: "hidden",
                    "&:hover": {
                        border: 3,
                        borderColor: theme.palette.background.paperAzul,
                    },
                    "&:hover .card-overlay": {
                        opacity: 1,
                        pointerEvents: "auto",
                    },
                }}
            >
                <Box
                    className="card-overlay"
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: "20%",
                        bgcolor: theme.palette.background.paper, backdropFilter: "blur(2px)",
                        border: 0,
                        color: "#fff",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: 0,
                        pointerEvents: "none",
                        transition: "opacity 0.4s ease",
                        zIndex: 1,
                        borderBottomLeftRadius: 3,
                        textAlign: "center",
                    }}
                >
                    <Box sx={{ position: "absolute", right: 5, color: theme.palette.primary.main }}>
                        <OpenInNewIcon />
                    </Box>
                    <Link sx={{ textDecoration: "none", fontWeight: "bolder" }}>Acessar</Link>

                </Box>
                <Box sx={{ position: "relative" }}>
                    <CardMedia component="img" height="160px" image={`https://api.digitaleduca.com.vc/${curso.thumbnail}`} alt={curso.titulo} />
                    <Chip
                        label={curso.level}
                        size="small"
                        sx={{
                            position: "absolute",
                            top: 12,
                            right: 12,
                            backgroundColor: "primary.main",
                            color: "primary.contrastText",
                            fontWeight: "bold",
                        }}
                    />
                </Box>
                <CardContent sx={{ p: 2 }}>
                    {/* Título */}
                    <Typography
                        sx={{ fontSize: 19, fontWeight: "bold" }}
                    >
                        {curso.titulo}
                    </Typography>
                </CardContent>
                <Box sx={{ borderTop: 1, borderBottom: 1, borderColor: "divider", display: "flex", justifyContent: "space-between", p: 1 }}>
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

            </Card>
                </Grid>

         
    
    )
}