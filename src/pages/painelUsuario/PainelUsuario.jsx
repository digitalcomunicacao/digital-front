import { Box, useMediaQuery } from "@mui/material";
import AppBarUsuario from "../../components/appBarUsuario/AppBarUsuario";
import { Outlet } from "react-router-dom";
import theme from "../../theme/theme";
import { useEffect, useState } from "react";

export const PainelUsuario = () => {
  const [miniDrawer, setMiniDrawer] = useState(false);

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));  // <600px
  const isMdDown = useMediaQuery(theme.breakpoints.down('lg'));  // <1200px

  useEffect(() => {
    if (!isMobile) {
      setMiniDrawer(isMdDown); // ativa miniDrawer automaticamente entre sm e lg
    }
  }, [isMdDown, isMobile]);

  const drawerWidth = miniDrawer ? 72 : 320;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBarUsuario miniDrawer={miniDrawer} setMiniDrawer={setMiniDrawer} />

      <Box
        component="main"
        sx={{
          p: 3,
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
