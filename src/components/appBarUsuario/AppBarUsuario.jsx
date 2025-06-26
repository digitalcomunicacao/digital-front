import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  useMediaQuery,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  Facebook,
  Menu as MenuIcon,
  MenuOpen as MenuOpenIcon,
  Style as StyleIcon,
  ImportContacts as ImportContactsIcon,
  Home as HomeIcon,
  ConfirmationNumber as ConfirmationNumberIcon,
  Forum as ForumIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import theme from '../../theme/theme';

const NAVIGATION = [
  { segment: 'home-usuario', title: 'Home', icon: <HomeIcon sx={{ color:theme.palette.primary.main }} /> },
    { kind: 'header', title: 'Progresso' },
  { segment: 'meus-cursos', title: 'Meus conteúdos', icon: <StyleIcon sx={{ color:theme.palette.primary.main }} /> },

  { segment: 'catalago', title: 'Catálogo', icon: <ImportContactsIcon sx={{ color:theme.palette.primary.main }} /> },
  { segment: 'eventos', title: 'Eventos', icon: <ConfirmationNumberIcon sx={{ color:theme.palette.primary.main }} /> },
  { segment: 'forum', title: 'Fórum', icon: <ForumIcon sx={{ color:theme.palette.primary.main }} /> },
];

function AppBarUsuario({ miniDrawer, setMiniDrawer }) {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const drawerWidth = miniDrawer ? 72 : 320;

  const handleNavigate = (segment) => {
    navigate(`/painel-usuario/${segment}`);
    if (isMobile) setMobileOpen(false);
  };

  const handleToggleDrawer = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setMiniDrawer(!miniDrawer);
    }
  };

  const drawerContent = (
    <>
      <Box>
        <List>
          {NAVIGATION.map((item, index) => {
            if (item.kind === 'header') {
              return !miniDrawer ? (
                <Box key={`header-${index}`} sx={{ px: 2, mt: 1, mb: 0.5 }}>
                  <Divider text sx={{ mt: 0.5 }}>
                    <Typography variant="caption" color='secondary' sx={{ pl: 1 }}>
                      {item.title}
                    </Typography>
                  </Divider>
                </Box>
              ) : null;
            }

            const selected = location.pathname.includes(item.segment);
            const button = (
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: miniDrawer ? 'center' : 'flex-start',
                  px: 2.5,
                  color:theme.palette.text.primary,
                 
                  bgcolor: selected ? theme.palette.action.selected : 'transparent',
                  '&:hover': { bgcolor: theme.palette.action.hover },
                }}
                onClick={() => handleNavigate(item.segment)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: miniDrawer ? 0 : 2,
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {!miniDrawer && <ListItemText primary={item.title} />}
              </ListItemButton>
            );

            return (
              <ListItem key={item.segment} disablePadding sx={{ display: 'block' }}>
                {miniDrawer && !isMobile ? (
                  <Tooltip title={item.title} placement="right">{button}</Tooltip>
                ) : (
                  button
                )}
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start' }}>
        <Tooltip title="Facebook">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="primary" size="small">
              <Facebook />
            </IconButton>
            {!miniDrawer && <Typography>Comunidade</Typography>}
          </Box>
        </Tooltip>
      </Box>
    </>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          py: 0.5,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar disableGutters>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleToggleDrawer}
            sx={{ ml: 1 }}
          >
            {(isMobile ? mobileOpen : !miniDrawer) ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isMobile ? 'temporary' : 'persistent'}
        open={isMobile ? mobileOpen : true}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            width: drawerWidth,
            bgcolor: theme.palette.background.default,
            top: '72px',
            height: 'calc(100% - 64px)',
            overflowX: 'hidden',
            transition: 'width 0.3s',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}

export default AppBarUsuario;
