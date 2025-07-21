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
  Button,
  Switch,
  useTheme,
} from '@mui/material';
import {
  Facebook,
  Menu as MenuIcon,
  MenuOpen as MenuOpenIcon,
  ImportContacts as ImportContactsIcon,
  ConfirmationNumberOutlined as ConfirmationNumberOutlinedIcon,
  HomeOutlined as HomeOutlinedIcon,
  VideoLibraryOutlined as VideoLibraryOutlinedIcon,
  ForumOutlined as ForumOutlinedIcon,
  AccountCircleTwoTone,
  ExitToApp,
  DarkMode,
  LightMode,
  Person,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { useNavigate, useLocation } from 'react-router-dom';
import { useThemeMode } from '../../context/ThemeContext';
import { useMiniDrawer } from '../../context/DrawerContext';

function AppBarUsuario() {
    const { miniDrawer, toggleMiniDrawer } = useMiniDrawer();
  const theme = useTheme(); // 🛠️ Corrigido: definir antes do uso
  const { darkMode, toggleTheme } = useThemeMode();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
const [scrolled, setScrolled] = useState(false);
useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 10); // Você pode ajustar esse valor
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const drawerWidth = miniDrawer ? 72 : 250;

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleNavigate = (segment) => {
    navigate(`/painel-usuario/${segment}`);
    if (isMobile) setMobileOpen(false);
    handleCloseUserMenu();
  };

const handleToggleDrawer = () => {
  if (isMobile) {
    setMobileOpen(!mobileOpen);
  } else {
    toggleMiniDrawer();
  }
};

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const settings = [
    {
      segment: "configuracoes",
      icon: <AccountCircleTwoTone fontSize="large" />,
      title: 'Minha Conta',
      subTitle: "Gerencie seus dados pessoais"
    },
    {
      segment: "configuracoes",
      icon: <WorkspacePremiumIcon fontSize="large" />,
      title: 'Meus Certificados',
      subTitle: "Gerencie seus certificados"
    }
  ];

  const NAVIGATION = [
    { segment: 'home-usuario', title: 'Home', icon: <HomeOutlinedIcon sx={{ color: theme.palette.background.paperAzul }} /> },
    { kind: 'header', title: 'Progresso' },
    { segment: 'meus-cursos', title: 'Meus conteúdos', icon: <VideoLibraryOutlinedIcon sx={{ color: theme.palette.background.paperAzul }} /> },
    { segment: 'catalago', title: 'Catálogo', icon: <ImportContactsIcon sx={{ color: theme.palette.background.paperAzul }} /> },
    { segment: 'eventos', title: 'Eventos', icon: <ConfirmationNumberOutlinedIcon sx={{ color: theme.palette.background.paperAzul }} /> },
    { segment: 'forum', title: 'Fórum', icon: <ForumOutlinedIcon sx={{ color: theme.palette.background.paperAzul }} /> },
  ];

  const drawerContent = (
    <>
      <Box>
        <List>
          {NAVIGATION.map((item, index) => {
            if (item.kind === 'header') {
              return !miniDrawer ? (
                <Box key={`header-${index}`} sx={{ px: 2, mt: 1, mb: 0.5 }}>
                  <Divider sx={{ mt: 0.5 }}>
                    <Typography color='textTertiary' sx={{ pl: 1 }}>
                      {item.title}
                    </Typography>
                  </Divider>
                </Box>
              ) : null;
            }

            const selected = location.pathname.includes(item.segment);
            const button = (
              <ListItemButton
                onClick={() => handleNavigate(item.segment)}
                sx={{
                  minHeight: 48,
                  justifyContent: miniDrawer ? 'center' : 'flex-start',
                  px: 2.5,
                  bgcolor: selected ? theme.palette.background.paper : 'transparent',
                  '&:hover': { bgcolor: theme.palette.background.paper },
                }}
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
                ) : button}
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Box sx={{ p: 2 }}>
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
  elevation={0}
  position="fixed"
  sx={{
    borderBottom: 1,
    borderColor: "divider",
    zIndex: theme.zIndex.drawer + 1,
    bgcolor:theme.palette.background.default
  }}
>

        <Toolbar disableGutters  >
          <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", mx: { xs: 2, md: 5 } }}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <IconButton size="large" edge="start"  onClick={handleToggleDrawer}>
                {(isMobile ? mobileOpen : !miniDrawer) ? <MenuOpenIcon /> : <MenuIcon />}
              </IconButton>
              <Box onClick={() => navigate("/painel-usuario/home-usuario")} sx={{ cursor: "pointer", ml: 2, width: "94px", height: "52px" }}>
                <img src={!darkMode ? "/aseets/logo-color.svg":"/aseets/logo-digital-educa.png"} style={{ width: "100%", height: "100%" }} />
              </Box>
            </Box>

            {isMobile ? (
              !searchOpen && (
                <IconButton onClick={() => setSearchOpen(true)} sx={{ p: '10px' }}>
                  <SearchIcon />
                </IconButton>
              )
            ) : (
              <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
                <IconButton type="button" sx={{ p: '10px' }}>
                  <SearchIcon />
                </IconButton>
                <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Busque por assuntos e aulas" />
              </Paper>
            )}

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <IconButton size="large" color="inherit">
                <Badge badgeContent={4} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              <Tooltip title="Meu perfil">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar />
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: '50px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    width: {xs:"100%",md:"400px"},
                    p:{md:3},
                    backgroundColor: theme.palette.background.paper,
                    backdropFilter: "blur(15px)",
                    color: theme.palette.text.primary,
                  },
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Box sx={{ ml: 2 }}>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <Avatar sx={{ bgcolor: theme.palette.background.paperAzul, color: theme.palette.text.tertiary }}>
                      {user.nome?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography sx={{ fontSize: 16, fontWeight: "bolder" }}>{user.nome}</Typography>
                      <Typography color="textTertiary" sx={{ fontSize: 14 }}>{user.email}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", border: 1, borderRadius: 2,px:2}}>
                      <Person />
                      <Typography sx={{fontWeight:"bolder"}}>Perfil</Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ mt: 2 }} />
                </Box>

                {settings.map((setting) => (
                  <MenuItem key={setting.title} onClick={() => handleNavigate(setting.segment)}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
                      <Box sx={{ color: theme.palette.background.paperAzul }}>
                        {setting.icon}
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: 14, fontWeight: "bolder" }}>{setting.title}</Typography>
                        <Typography color='textTertiary' sx={{ fontSize: 12 }}>{setting.subTitle}</Typography>
                      </Box>
                    </Box>
                  </MenuItem>
                ))}

                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                  <Button variant="outlined" onClick={handleLogout} sx={{ fontSize: 14, borderColor: "divider", color: theme.palette.text.tertiary }} endIcon={<ExitToApp />}>
                    Sair da conta
                  </Button>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, border: 1, borderColor: "divider", borderRadius: 2, px: 1 }}>
                    {darkMode ? <DarkMode /> : <LightMode />}
                    <Switch checked={darkMode} onChange={toggleTheme} />
                    <Typography sx={{ color: theme.palette.text.tertiary }}>{darkMode ? 'Dark' : 'Light'} Mode</Typography>
                  </Box>
                </Box>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {isMobile && searchOpen && (
        <Box sx={{
          px: 2, py: 1, bgcolor: theme.palette.background.paper,
          boxShadow: 1, position: 'absolute', top: 65, width: "100%",
          zIndex: theme.zIndex.appBar - 1,
        }}>
          <Box sx={{
            display: 'flex', alignItems: 'center', bgcolor: theme.palette.background.paper,
            borderRadius: 2, px: 2, py: 1,
          }}>
            <InputBase autoFocus placeholder="Buscar..." sx={{ flex: 1 }} />
            <IconButton onClick={() => setSearchOpen(false)}>✖️</IconButton>
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
              bgcolor:theme.palette.background.default,
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
