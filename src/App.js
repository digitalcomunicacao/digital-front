
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import { DetalhesCurso } from "./components/cursos/DetalhesCurso";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import { PainelUsuario } from "./pages/painelUsuario/PainelUsuario";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { MeusConteudos } from "./pages/painelUsuario/MeusConteudos";
import { Catalago } from "./pages/painelUsuario/Catalago";
import { Checkout } from "./pages/checkout/Checkout";
import { SnackbarProvider } from "./context/SnackBarContext";
import HomeUsuario from "./pages/painelUsuario/HomeUsuario";
import { Eventos } from "./pages/painelUsuario/Eventos";
import { PlayerCurso } from "./pages/painelUsuario/playerCurso/PlayerCurso";
import { VideoPlayer } from "./pages/painelUsuario/playerCurso/VideoPlayer";







function App() {
  return (
    <SnackbarProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/painel-usuario"
            element={
              <PrivateRoute>
                <PainelUsuario />
              </PrivateRoute>
            }
          >
            <Route path="catalago" element={<Catalago />} />
            <Route path="meus-cursos" element={<MeusConteudos />} />
            <Route path="home-usuario" element={<HomeUsuario />} />
            <Route path="eventos" element={<Eventos />} />
            <Route path="curso" element={<PlayerCurso />} />
            <Route path="/painel-usuario/curso/player" element={<VideoPlayer />} />
          </Route>

          <Route path="/curso/detalhe" element={<DetalhesCurso />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;






