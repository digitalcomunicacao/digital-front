import { Box, Divider, Typography, Tabs, Tab } from "@mui/material";
import { useEffect, useState } from "react";
import { CardCurso } from "../../components/cursos/CardCurso";
import api from "../../config/Api";
import theme from "../../theme/theme";

export const Catalago = () => {
  const [cursos, setCursos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [tabAtiva, setTabAtiva] = useState(0);

  useEffect(() => {
    getCursos();
    getCategorias();
  }, []);

  const getCursos = () => {
    api.get("curso/cursos")
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
    <Box sx={{ p: 5 }}>
      <Box sx={{ textAlign: 'start', mt: 5 }}>
        <Typography sx={{ fontSize: 24, fontWeight: 'bolder', color: theme.palette.text.primary }}>
          Catálogo
        </Typography>
        <Typography sx={{ fontSize: 14, color: theme.palette.text.tertiary, mt: 2 }}>
          Navegue por todo o conteúdo da DigitalEduca
        </Typography>
      </Box>

      <Divider sx={{ mt: 2, mb: 3 }} />

      {/* Tabs de categorias */}
      <Tabs
        value={tabAtiva}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 4}}
      >
        {categorias.map((categoria, index) => (
          <Tab key={categoria.id} label={categoria.nome} sx={{border:1,borderRadius:5,ml:2,bgcolor:theme.palette.background.paper}} />
        ))}
      </Tabs>

      {/* Cursos da categoria selecionada */}
      <Box sx={{ display: "flex", gap: 5, flexWrap: "wrap", flexDirection: { xs: "column", md: "row" } }}>
        {cursos
          .filter(curso => curso.categoria?.id === categorias[tabAtiva]?.id)
          .map((curso, index) => (
            <CardCurso key={index} curso={curso} />
          ))}
      </Box>
    </Box>
  );
};
