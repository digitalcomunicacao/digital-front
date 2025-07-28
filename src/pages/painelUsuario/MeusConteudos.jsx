import { Box, Divider, Typography, Tabs, Tab, Grid, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { CardCurso } from "../../components/cursos/CardCurso";
import api from "../../config/Api";
import { Subscription } from "../../components/subscription/Subscripition";
import { Ads } from "../../components/ads/Ads";
import { useMiniDrawer } from "../../context/DrawerContext";
import { ProgressoCurso } from "../../components/progressoCurso/ProgressoCurso";
import { useNavigate } from "react-router-dom";
import { RenoveAssinatura } from "../../components/renoveAssinatura/RenoveAssinatura";

export const MeusConteudos = () => {
    const [cursos, setCursos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [tabAtiva, setTabAtiva] = useState(0);
    const { miniDrawer } = useMiniDrawer(); // true ou false
    const token = localStorage.getItem("token");
    const theme = useTheme();
    const navigate = useNavigate()
    useEffect(() => {
        getCursos();
        getCategorias();
    }, []);

    const getCursos = () => {
        api.get("/curso-selecionado/cursos", {
            headers: { Authorization: `Bearer ${token}` },
        }).then(function (response) {
            setCursos(response.data)
            console.log(response)
        }).catch(function (error) {
            console.log(error)
        })
    }
    const getCategorias = () => {
        api.get("categoria/list")
            .then((response) => setCategorias(response.data))
            .catch((error) => console.error(error));
    };

    const handleTabChange = (event, newValue) => {
        setTabAtiva(newValue);
    };

if (cursos.length === 0) {
  return (
    <Box sx={{ mt: 20, textAlign: "center", width: "100%" }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", color: theme.palette.text.primary }}>
        Você ainda não começou nenhum curso!
      </Typography>
      <Typography sx={{ mt: 2, color: theme.palette.text.secondary }}>
        Explore nosso catálogo e comece a aprender agora mesmo.
      </Typography>
      <Box sx={{ mt: 4 }}>
        <button
          onClick={() => navigate("/painel-usuario/catalago")}
          style={{
            backgroundColor: theme.palette.primary.main,
            color: "white",
            padding: "10px 20px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Ver Catálogo
        </button>
      </Box>
    </Box>
  );
}

    return (
        <Box sx={{pb:5}}>


        <Grid container spacing={2}>
            <Grid size={{ xs: 12, lg: miniDrawer ? 10 : 10 }}>
                <Box sx={{ textAlign: 'start', mt: 5 }}>
                    <Typography sx={{ fontSize: 24, fontWeight: 'bolder', color: theme.palette.text.primary }}>
                        Meus conteúdos
                    </Typography>
                    <Typography sx={{ fontSize: 14, color: theme.palette.text.secondary, mt: 2 }}>
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
                            color: theme.palette.text.primary,
                            '&.Mui-selected': {
                                border: 3,
                                color: theme.palette.text.tertiary,
                                borderColor: theme.palette.primary.main,
                                bgcolor: theme.palette.background.contained,
                                fontWeight: 'bold',
                            },

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
                                bgcolor: theme.palette.secondary,
                                color: theme.palette.text.primary,
                                '&.Mui-selected': {
                                    border:3,
                                    color: theme.palette.text.tertiary,
                                    borderColor: theme.palette.primary.main,
                                    bgcolor: theme.palette.background.contained,
                                    fontWeight: 'bold',
                                },
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
                            <Box key={categoria.id} sx={{ mb: 2 }}>
                                <Typography sx={{ fontSize: 20, fontWeight: 'bold', color: theme.palette.text.primary, mb: 2 }}>
                                    {categoria.nome}
                                </Typography>
                                <Divider sx={{ mb: 2 }} />
                                <Grid container spacing={2}>
                                    {cursosDaCategoria.map((curso, index) => (
                                        <Grid size={{ xs: 12, md:6,lg: 4 }}>
                                            <CardCurso key={index} curso={curso} origin="meus-conteudos" />

                                            <Box sx={{ position: "relative", bottom: 131, left: 2,width:"99%"}}>
                                                <ProgressoCurso curso={curso} showText={false} />
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>

                            </Box>
                        );
                    })
                ) : (
                    // Mostrar apenas a categoria selecionada
                    <>

                        <Typography sx={{ fontSize: 20, fontWeight: 'bold', color: theme.palette.text.primary, mb: 2 }}>
                            {categorias[tabAtiva - 1]?.nome}
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={2}>
                            {cursos
                                .filter((curso) => curso.categoria?.id === categorias[tabAtiva - 1]?.id)
                                .map((curso, index) => (
                                    <Grid size={{ xs: 12, md:6,lg: 4 }}>
                                        <CardCurso key={index} curso={curso} origin="meus-conteudos" />
                                     <Box sx={{ position: "relative", bottom: 131, left: 0 }}>
                                            <ProgressoCurso curso={curso}  showText={false}/>
                                        </Box>

                                    </Grid>

                                ))}
                        </Grid>
                    </>
                )}
            </Grid>
            <Grid size={{ xs: 12, lg: miniDrawer ? 2 : 2  }} >
                <Box sx={{ position: 'sticky', mt: 5 }}>
                    <RenoveAssinatura/>
                    <Subscription />
                    <Box sx={{ mt: 5 }}>
                        <Ads />
                    </Box>
                </Box>

            </Grid>
        </Grid>
                </Box>
    );
};
