

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

} from "@mui/material"
import { useNavigate } from "react-router-dom";
import api from "../../config/Api";
import { useSnackbar } from "../../context/SnackBarContext";
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

export const CardCurso = ({ curso }) => {
    const { showSnackbar } = useSnackbar();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const theme=useTheme()
    const navigate = useNavigate();
    const handleDetalhes = () => {
        navigate("/curso/detalhe", { state: { curso } });
    };
    const handleSelecionarCurso = (cursoId) => {
        const token = localStorage.getItem('token');

        api.post('/curso-selecionado', { cursoId }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log('Curso selecionado:', response.data);
                showSnackbar('Curso Adicionado em seus conteúdos');
            })
            .catch(error => {
                console.error('Erro ao selecionar curso:', error);
                showSnackbar('voce já adicionou esse curso', 'warning');
            });
    };
    console.log(curso)
    const token = localStorage.getItem('token')
    return (
        <Box>

            <Box>

            </Box>
            <Card elevation={0} sx={{
                width: { xs: "100%", md: "380px" }, height: "285px", border: 2, borderColor: "divider", borderRadius: 5, backgroundColor: theme.palette.background.paper,
                "&:hover": {
                    border: 3,
                    borderColor: theme.palette.background.paperAzul,
                    height: "385px",
                    transition: "0.6s",

                },
            }}>
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
                        <Typography color="textSecondary" sx={{ fontSize: 12, fontWeight: "bold" }}>{curso.level}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <PlayCircleOutlineIcon />
                        <Typography color="textSecondary" sx={{ fontSize: 12, fontWeight: "bold" }}>+120H DE AULAS</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <WorkspacePremiumIcon />
                        <Typography color="textSecondary" sx={{ fontSize: 12, fontWeight: "bold" }}>CERTIFICADO</Typography>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                    <Button variant='outlined' sx={{ borderRadius: 5, width: "145px", height: "50px", fontWeight: "bold", fontSize: 17, color: theme.palette.text.primary }}>ACESSAR</Button>
                </Box>
            </Card>
        </Box>
    )
}