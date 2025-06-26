import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Drawer } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { useNavigate } from 'react-router-dom';
import { HeaderLogo } from '../headerLogo/HeaderLogo';
import theme from '../../theme/theme';
const pages = ['Início', 'Cursos', 'Sobre'];


function ResponsiveAppBar({ onMenuClick }) {

  const [openDrawer, setOpenDrawer] = React.useState(false);
  const navigate = useNavigate()
  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
  };
  return (
    <AppBar position="fixed" sx={{ borderBottomLeftRadius: 5, borderBottomRightRadius: 5, py: 0.5 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'space-between', alignItems: "center" }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={toggleDrawer(true)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Drawer PaperProps={{ sx: { width: "100%" } }} open={openDrawer} onClose={toggleDrawer(false)}>
              <HeaderLogo handleClose={toggleDrawer(false)} />
              <Box sx={{ mt: 3 }}>
                {pages.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={() => {
                      onMenuClick?.(page); // rola para a seção
                      setOpenDrawer(false); // fecha o drawer
                    }}
                  >
                    <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                  </MenuItem>
                ))}

              </Box>
              {!localStorage.getItem('token') && (


                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2, pl: 1 }}>
                  <Button color='primary' startIcon={<PermIdentityIcon />} variant='outlined' onClick={() => navigate("/login")} sx={{ width: "105px", height: "44px", fontWeight: 'bolder' }}>Entrar</Button>
                  <Button variant='contained' endIcon={<ArrowRightIcon />} sx={{ width: "140px", height: "44px", fontWeight: 'bolder' }}>Assinatura</Button>
                </Box>
              )}
            </Drawer>
            <Box sx={{ width: "100px", height: "auto" }}>
              <img src='/aseets/logo-digital-educa.png' style={{ width: "100%", height: "100%" }} />
            </Box>
             {localStorage.getItem('token') ? (
    <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
            </Box>
             ):(
              <Button color='primary' startIcon={<PermIdentityIcon />} variant='contained' onClick={() => navigate("/login")} sx={{ width: "105px", height: "44px", fontWeight: 'bolder' }}>Entrar</Button>
             )}
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ display: { xs: "none", md: "flex" }, width: "80px", height: "auto" }}>
              <img src='/aseets/logo-digital-educa.png' style={{ width: "100%", height: "100%" }} />
            </Box>
            <Box sx={{ display: "flex", gap: 10 }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => onMenuClick?.(page)}
                  sx={{ my: 2, display: 'block', color: theme.palette.text.secondary }}
                >
                  {page}
                </Button>
              ))}

            </Box>
            {!localStorage.getItem('token') && (
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button color='primary' startIcon={<PermIdentityIcon />} variant='outlined' onClick={() => navigate("/login")} sx={{ width: "105px", height: "44px", fontWeight: 'bolder' }}>Entrar</Button>
                <Button variant='contained' endIcon={<ArrowRightIcon />} sx={{ width: "140px", height: "44px", fontWeight: 'bolder' }}>Assinatura</Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
