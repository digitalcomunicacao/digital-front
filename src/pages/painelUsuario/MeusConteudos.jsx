import { Box, Divider, Typography, Tabs, Tab, Grid, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { CardCurso } from "../../components/cursos/CardCurso";
import api from "../../config/Api";
import { Subscription } from "../../components/subscription/Subscripition";
import { Ads } from "../../components/ads/Ads";
import { useMiniDrawer } from "../../context/DrawerContext";

export const MeusConteudos = () => {
    const [cursos, setCursos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [tabAtiva, setTabAtiva] = useState(0);
    const { miniDrawer } = useMiniDrawer(); // true ou false
    const theme = useTheme();
    useEffect(() => {
        getCursos();
        getCategorias();
    }, []);

    const getCursos = () => {
        api.get("/curso-selecionado/cursos")
            .then((response) => setCursos(response.data))
            .catch((error) => console.error(error));
    };


    const getCategorias = () => {
        api.get("categoria/list")
            .then((response) => setCategorias(response.data))
            .catch((error) => console.error(error));
    };

    const handleTabChange = (event, newValue) => {
        setTabAtiva(newValue);
    };

    return (
        <Grid sx={{ p: 5 }} container spacing={2}>
            <Grid size={{ xs: 12, md: miniDrawer ? 10 : 10 }}>
                <Box sx={{ textAlign: 'start', mt: 5 }}>
                    <Typography sx={{ fontSize: 24, fontWeight: 'bolder', color: theme.palette.text.primary }}>
                        Meus conteúdos
                    </Typography>
                    <Typography sx={{ fontSize: 14, color: theme.palette.text.tertiary, mt: 2 }}>
                      Acesse os seus conteúdos assistidos 
                    </Typography>
                </Box>

                <Divider sx={{ mt: 2, mb: 3 }} />

                {/* Tabs de categorias */}
                <Tabs
                    value={tabAtiva}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        mb: 4,
                        '& .MuiTabs-indicator': {
                            display: 'none',
                        },
                    }}
                >
                    <Tab
                        label="Todos"
                        sx={{
                            width: "125px",
                            height: "15px",
                            border: 1,
                            borderRadius: 5,
                            ml: 2,
                            bgcolor: theme.palette.background.paper,
                            color: theme.palette.text.primary,
                        }}
                    />
                    {categorias.map((categoria) => (
                        <Tab
                            key={categoria.id}
                            label={categoria.nome}
                            sx={{
                                width: "150px",
                                height: "15px",
                                border: 1,
                                borderRadius: 5,
                                ml: 2,
                                bgcolor: theme.palette.background.paper,
                                color: theme.palette.text.primary,
                            }}
                        />
                    ))}
                </Tabs>

                {/* Conteúdo de cursos */}
                {tabAtiva === 0 ? (
                    // Mostrar todas as categorias com seus cursos agrupados
                    categorias.map((categoria) => {
                        const cursosDaCategoria = cursos.filter(
                            (curso) => curso.categoria?.id === categoria.id
                        );

                        if (cursosDaCategoria.length === 0) return null;

                        return (
                            <Box key={categoria.id} sx={{ mb: 6 }}>
                                <Typography sx={{ fontSize: 20, fontWeight: 'bold', color: theme.palette.text.primary, mb: 2 }}>
                                    {categoria.nome}
                                </Typography>
                                <Divider sx={{ mb: 2 }} />
                                <Box sx={{ display: 'flex', gap: "2%", minHeight: 400, flexWrap: 'wrap', flexDirection: { xs: 'column', md: 'row' } }}>
                                    {cursosDaCategoria.map((curso, index) => (
                                        <CardCurso key={index} curso={curso} />
                                    ))}
                                </Box>
                            </Box>
                        );
                    })
                ) : (
                    // Mostrar apenas a categoria selecionada
                    <>
                        <Typography sx={{ fontSize: 20, fontWeight: 'bold', color: theme.palette.text.primary, mb: 2 }}>
                            {categorias[tabAtiva - 1]?.nome}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: "space-between", minHeight: 400, flexWrap: 'wrap', flexDirection: { xs: 'column', md: 'row' } }}>
                            {cursos
                                .filter((curso) => curso.categoria?.id === categorias[tabAtiva - 1]?.id)
                                .map((curso, index) => (
                                    <CardCurso key={index} curso={curso} />
                                ))}
                        </Box>
                    </>
                )}
            </Grid>
            <Grid size={{ xs: 12, md: miniDrawer ? 1 : 2 }} >
                <Box sx={{ position: 'sticky', top: '80px' }}>
                    <Subscription />
                    <Box sx={{ mt: 5 }}>
                        <Ads />
                    </Box>
                </Box>

            </Grid>
        </Grid>
    );
};
