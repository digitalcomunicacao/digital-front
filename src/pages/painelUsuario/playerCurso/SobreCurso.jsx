import { Avatar, Box, Button, Grid, IconButton, Typography } from "@mui/material"
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SchoolIcon from '@mui/icons-material/School';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import theme from "../../../theme/theme";
export const SobreCurso = ({ curso }) => {
    return (
        <Grid container>
            <Grid size={{ xs: 12, md: 8 }} >
                <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 5, width: { xs: "100%", md: "90%" }, bgcolor: theme.palette.background.paper }}>
                    <Box sx={{ p: 3 }}>
                        <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", gap: 1 }}>
                            <Box sx={{ width: "100%", height: "auto" }}>
                                <img src={`http://10.10.10.214:3000/${curso.thumbnail}`} style={{ width: "100%", height: "100%" }} />
                            </Box>
                        </Box>

                        <Typography sx={{fontSize: { xs: 12, md: 16 }, mt: 2 }}>{curso.aprendizagem}</Typography>

                    </Box>
                </Box>
                <Box sx={{ mt: 5, border: 1, borderColor: 'divider', width: { xs: "100%", md: "90%" }, borderRadius: 5, bgcolor: theme.palette.background.paper }}>
                    <Box sx={{ p: 3 }}>
                        <Typography color="textSecondary" sx>Educador</Typography>
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
                <Box sx={{ mt: 5, border: 1, borderColor: 'divider', width: { xs: "100%", md: "90%" }, borderRadius: 5, bgcolor: theme.palette.background.paper }}>
                    <Box sx={{ p: 3 }}>
                        <Typography color="textSecondary" sx>Detalhes</Typography>
                        <Box sx={{ display: "flex", gap: 25 }}>
                            <Box>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
                                    <AccessTimeIcon sx={{ color: theme.palette.text.secondary }} />
                                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                                        <Typography color="textSecondary" sx={{ fontSize: 14 }}>Horas de estudo</Typography>
                                        <Typography color="textPrimary" sx={{ fontSize: 14 }}>Aprox. 11h</Typography>
                                    </Box>

                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
                                    <SchoolIcon sx={{ color: theme.palette.text.secondary }} />
                                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                                        <Typography color="textSecondary" sx={{ fontSize: 14 }}>Aulas</Typography>
                                        <Typography color="textPrimary" sx={{ fontSize: 14 }}>
                                            {curso.modulos.reduce((acc, modulo) => acc + modulo.videos.length, 0)}
                                        </Typography>
                                    </Box>

                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
                                    <SignalCellularAltIcon sx={{ color: theme.palette.text.secondary }} />
                                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                                        <Typography color="textSecondary" sx={{ fontSize: 14 }}>Nível de dificuldade</Typography>
                                        <Typography color="textPrimary" sx={{ fontSize: 14 }}>{curso.level}</Typography>
                                    </Box>
                                </Box>
                            </Box>

                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Typography color="textPrimary" >Pré-requisitos</Typography>
                            <Typography color="textSecondary">Recomendações para o melhor proveito dos conteúdos e facilidade de aplicação prática</Typography>
                            <Typography color="textPrimary">{curso.requisitos}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Grid>

        </Grid>





    )
}