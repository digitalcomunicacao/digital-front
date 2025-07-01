

import { AccessTime, PlayArrow, BookmarkBorder } from "@mui/icons-material"
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

} from "@mui/material"
import { useNavigate } from "react-router-dom";
import api from "../../config/Api";
import { useSnackbar } from "../../context/SnackBarContext";
export const CardCurso = ({ curso }) => {
    const { showSnackbar } = useSnackbar();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
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

    const token = localStorage.getItem('token')
    return (
        <Card sx={{
            width: { xs: "100%", md: "350px" }, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
            "&:hover": {
                boxShadow: "0 12px 32px rgba(255, 184, 0, 0.4)", // brilho amarelo
                transform: "translateY(-2px)",
            },
        }}>
            <Box sx={{ position: "relative" }}>
                <CardMedia component="img" height="200" image={`http://localhost:3000/${curso.thumbnail}`} alt={curso.titulo} />
                <Chip
                    label={curso.level}
                    size="small"
                    sx={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        backgroundColor: "primary.main",
                        color: "primary.contrastText",
                        fontWeight: "bold",
                    }}
                />

                <Box
                    sx={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        backgroundColor: "rgba(0,0,0,0.6)",
                        borderRadius: "50%",
                        p: 1,
                        cursor: "pointer",
                        "&:hover": {
                            backgroundColor: "rgba(0,0,0,0.8)",
                        },
                    }}
                >
                    <BookmarkBorder sx={{ color: "white", fontSize: 20 }} />
                </Box>
            </Box>
            <CardContent sx={{ p: 3 }}>
                {/* Categoria */}
                <Typography
                    variant="caption"
                    sx={{
                        color: "primary.main",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        letterSpacing: 1,
                    }}
                >

                </Typography>

                {/* Título */}
                <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                        fontWeight: "bold",
                        mb: 1,
                        lineHeight: 1.3,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                    }}
                >
                    {curso.titulo}
                </Typography>

                {/* Descrição */}
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mb: 2,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        lineHeight: 1.5,
                    }}
                >
                    {curso.descricao}
                </Typography>

                {/* Instrutor */}
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar src={curso.instrutor.nome} sx={{ width: 32, height: 32, mr: 1 }} />
                    <Box>
                        <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                            {curso.instrutor.nome}
                        </Typography>
                    </Box>
                </Box>

                {/* Informações do curso */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <AccessTime sx={{ fontSize: 16, color: "text.secondary" }} />
                        <Typography variant="caption" color="text.secondary">
                            duracao
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <PlayArrow sx={{ fontSize: 16, color: "text.secondary" }} />
                        <Typography variant="caption" color="text.secondary">
                            {curso.modulos.reduce((acc, modulo) => acc + modulo.videos.length, 0)} aulas
                        </Typography>
                    </Box>
                </Box>

                {/* Rating */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                    <Rating precision={0.1} size="small" readOnly />
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>

                    </Typography>
                    <Typography variant="caption" color="text.secondary">

                    </Typography>
                </Box>

                {/* Preço */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: "bold",
                            color: "primary.main",
                        }}
                    >
                        R$ {curso.preco.toFixed(2).replace(".", ",")}
                    </Typography>

                </Box>

                {/* Botões de ação */}
                <Box sx={{ display: "flex", gap: 1 }}>
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
                </Box>
            </CardContent>
        </Card>
    )
}