import { Box, Container, useMediaQuery } from "@mui/material";
import AppBarUsuario from "../../components/appBarUsuario/AppBarUsuario";
import { Outlet, useLocation } from "react-router-dom";
import theme from "../../theme/theme";
import { useEffect } from "react";
import { useMiniDrawer } from "../../context/DrawerContext";
import api from "../../config/Api";
import { useCursoContext } from "../../context/CursoContext";

export const PainelUsuario = () => {
  const { miniDrawer, setMiniDrawer } = useMiniDrawer();
  const location = useLocation();
  const isPlayerPage = location.pathname.includes("/painel-usuario/player");
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMdDown = useMediaQuery(theme.breakpoints.down('lg'));
      const token = localStorage.getItem("token");
      const { setQuantidadeCursos } = useCursoContext();
    const getCursos = () => {
        api.get("/curso-selecionado/cursos", {
            headers: { Authorization: `Bearer ${token}` },
        }).then(function (response) {
             setQuantidadeCursos(response.data.length); // <-- aqui atualiza o contexto
            console.log(response)
        }).catch(function (error) {
            console.log(error)
        })
    }
    useEffect(()=>{
      getCursos()
    },[])
  useEffect(() => {
    if (!isMobile) {
      setMiniDrawer(isMdDown);
    }
  }, [isMdDown, isMobile, setMiniDrawer]);

  const drawerWidth = miniDrawer ? 72 : 250;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBarUsuario />
            
{isPlayerPage ? (
  <Box
    component="main"
    sx={{
      p: 0,
     mt: { xs: '72px', sm: '80px', md: '95px' },
      ml: isMobile ? 0 : `${drawerWidth}px`,
      width: isMobile ? '100%' : `calc(100% - ${drawerWidth}px)`,
      transition: 'margin-left 0.3s, width 0.3s',
      boxSizing: 'border-box',
    }}
  >
    <Outlet />
  </Box>
) : (
 
<Box
  component="main"
  sx={{
    p: 0,
    mt: { xs: '95px', sm: '80px', md: '95px' },
    ml: isMobile ? 0 : `${drawerWidth}px`,
    width: isMobile ? '100%' : `calc(100% - ${drawerWidth}px)`,
    transition: 'margin-left 0.3s, width 0.3s',
    boxSizing: 'border-box',
  }}
>
 <Container maxWidth="xl">
      <Outlet />
      </Container>
    </Box>

)}

    </Box>
  );
};
