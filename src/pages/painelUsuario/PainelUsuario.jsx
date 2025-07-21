import { Box, useMediaQuery } from "@mui/material";
import AppBarUsuario from "../../components/appBarUsuario/AppBarUsuario";
import { Outlet, useLocation } from "react-router-dom";
import theme from "../../theme/theme";
import { useEffect } from "react";
import { useMiniDrawer } from "../../context/DrawerContext";

export const PainelUsuario = () => {
  const { miniDrawer, setMiniDrawer } = useMiniDrawer();
  const location = useLocation();
  const isPlayerPage = location.pathname.includes("/painel-usuario/curso/player");
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMdDown = useMediaQuery(theme.breakpoints.down('lg'));

  useEffect(() => {
    if (!isMobile) {
      setMiniDrawer(isMdDown);
    }
  }, [isMdDown, isMobile, setMiniDrawer]);

  const drawerWidth = miniDrawer ? 72 : 250;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBarUsuario />
      <Box
        component="main"
        sx={{
          p: isPlayerPage ? 0 : 0,
          mt: '64px',
          ml: isMobile ? 0 : `${drawerWidth}px`,
          width: isMobile ? '100%' : `calc(100% - ${drawerWidth}px)`,
          transition: 'margin-left 0.3s, width 0.3s',
          boxSizing: 'border-box',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
