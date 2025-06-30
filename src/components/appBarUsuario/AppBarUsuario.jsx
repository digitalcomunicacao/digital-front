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
  Badge,
  Paper,
  InputBase,
  MenuItem,
  Avatar,
  Menu,
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
  Search,
} from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate, useLocation } from 'react-router-dom';
import theme from '../../theme/theme';
import { Subscription } from '../subscription/Subscripition';
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const NAVIGATION = [
  { segment: 'home-usuario', title: 'Home', icon: <HomeIcon sx={{ color: theme.palette.primary.main }} /> },
  { kind: 'header', title: 'Progresso' },
  { segment: 'meus-cursos', title: 'Meus conteúdos', icon: <StyleIcon sx={{ color: theme.palette.primary.main }} /> },

  { segment: 'catalago', title: 'Catálogo', icon: <ImportContactsIcon sx={{ color: theme.palette.primary.main }} /> },
  { segment: 'eventos', title: 'Eventos', icon: <ConfirmationNumberIcon sx={{ color: theme.palette.primary.main }} /> },
  { segment: 'forum', title: 'Fórum', icon: <ForumIcon sx={{ color: theme.palette.primary.main }} /> },
];

function AppBarUsuario({ miniDrawer, setMiniDrawer }) {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [searchOpen, setSearchOpen] = useState(false);

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // se você estiver armazenando o user
    navigate('/login');
  };

  const handleUserMenuClick = (setting) => {
    if (setting === 'Logout') {
      handleLogout();
    } else {
      // aqui você pode redirecionar ou tratar outros casos se quiser
      console.log(`Usuário clicou em ${setting}`);
    }

    handleCloseUserMenu(); // fecha o menu sempre
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
                  color: theme.palette.text.primary,

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
          <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", mx: { xs: 2, md: 5 } }}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleToggleDrawer}

              >
                {(isMobile ? mobileOpen : !miniDrawer) ? <MenuOpenIcon /> : <MenuIcon />}
              </IconButton>
              <Box onClick={()=>navigate("/painel-usuario/home-usuario")} sx={{ cursor:"pointer",ml: 2, width: "85px", height: "auto" }}>
                <img src='/aseets/logo-digital-educa.png' style={{ width: "100%", height: "100%" }} />
              </Box>
            </Box>
            {isMobile ? (
              !searchOpen && (
                <IconButton onClick={() => setSearchOpen(true)} sx={{ p: '10px' }} aria-label="Abrir busca">
                  <SearchIcon />
                </IconButton>
              )
            ) : (
              <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
              >
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                  <SearchIcon />
                </IconButton>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Busque por assuntos e aulas"
                  inputProps={{ 'aria-label': 'search google maps' }}
                />
              </Paper>
            )}




            <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center", gap: 2 }}>
              <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
                <Subscription/>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar>

                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => handleUserMenuClick(setting)}>
                    <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

          </Box>
        </Toolbar>
      </AppBar>
      {isMobile && searchOpen && (
        <Box
          sx={{
            px: 2,
            py: 1,
            bgcolor: theme.palette.background.paper,
            boxShadow: 1,
            position: 'absolute',
            top: 65,
            width: "100%",
            zIndex: (theme) => theme.zIndex.appBar - 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              bgcolor: theme.palette.background.paper,
              borderRadius: 2,
              px: 2,
              py: 1,
            }}
          >
            <InputBase
              autoFocus
              placeholder="Buscar..."
              sx={{ flex: 1 }}
              inputProps={{ 'aria-label': 'search' }}
            />
            <IconButton onClick={() => setSearchOpen(false)} aria-label="Fechar busca">
              ✖️
            </IconButton>
          </Box>
        </Box>
      )}

      <Drawer
        variant={isMobile ? 'temporary' : 'persistent'}
        open={isMobile ? mobileOpen : true}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            width: drawerWidth,
            bgcolor: theme.palette.background.default,
            top: '64px',
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
