

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

} from "@mui/material"
import { useNavigate } from "react-router-dom";
import api from "../../config/Api";
import { useSnackbar } from "../../context/SnackBarContext";
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
export const CardCurso = ({ curso }) => {
    const { showSnackbar } = useSnackbar();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const theme = useTheme()
    const navigate = useNavigate();
const handleDetalhes = () => {
  navigate("/curso/detalhe", { state: { curso, tab: 1 } });
};
    const handleSelecionarCurso = (cursoId) => {
        const token = localStorage.getItem('token');

        api.post('/curso-selecionado', { cursoId }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                
                showSnackbar('Curso Adicionado em seus conteúdos');
            })
            .catch(error => {
                console.error('Erro ao selecionar curso:', error);
                showSnackbar('voce já adicionou esse curso', 'warning');
            });
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
        <Box>
            <Card
                elevation={0}
                component={"form"}
               onClick={()=>handleDetalhes(curso.id)}
                sx={{
                    mb: 5,
                    height: "285px",
                    position: "relative", // necessário para overlay funcionar
                    border: 2,
                    borderColor: "divider",
                    cursor:"pointer",
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
                        border: 1,
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
                    <CardMedia component="img" height="160px" image={`http://localhost:3000/${curso.thumbnail}`} alt={curso.titulo} />
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




                    {/* Botões de ação */}
                    {/* <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={() => {
                            const user = JSON.parse(localStorage.getItem('user') || '{}');
                            if (user.assinante) {
                                handleSelecionarCurso(curso.id);
                            } else {
                                navigate(token ? "/checkout" : "/login", { state: { curso } });
                            }
                        }}
                        sx={{
                            py: 1.5,
                            fontWeight: "bold",
                            textTransform: "none",
                            borderRadius: 2,
                        }}
                    >
                        {user.assinante ? (
                            "Começar Agora"
                        ) : (
                            "Vire um Assinante"
                        )}

                    </Button>

                    <Button
                        onClick={handleDetalhes}
                        variant="outlined"
                        sx={{
                            minWidth: "auto",
                            px: 2,
                            borderRadius: 2,
                        }}
                    >
                        Detalhes
                        <PlayArrow />
                    </Button>
                </Box> */}
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
                <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                    <Button variant='outlined' sx={{ borderRadius: 5, width: "145px", height: "50px", fontWeight: "bold", fontSize: 17, color: theme.palette.text.primary }}>ACESSAR</Button>
                </Box>
            </Card>
        </Box>
    )
}