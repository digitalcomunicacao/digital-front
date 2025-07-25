import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Login } from "./pages/login/Login";
import { DetalhesCurso } from "./components/cursos/DetalhesCurso";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import { PainelUsuario } from "./pages/painelUsuario/PainelUsuario";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { MeusConteudos } from "./pages/painelUsuario/MeusConteudos";
import { Catalago } from "./pages/painelUsuario/Catalago";
import { SnackbarProvider } from "./context/SnackBarContext";
import { Eventos } from "./pages/painelUsuario/Eventos";
import { Checkout } from "./pages/checkout/Checkout";
import {NovaSenha} from "./pages/login/NovaSenha"
import { Configuracoes } from "./pages/painelUsuario/configuracoes/Configuracoes";
import { HomeUsuario } from "./pages/painelUsuario/HomeUsuario";
import { VideoPlayer } from "./pages/player/VideoPlayer";



function App() {
  return (
    <SnackbarProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="resetar-senha" element={<NovaSenha/>}/>
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
            <Route path="configuracoes" element={<Configuracoes />} />
           <Route path="curso/detalhe" element={<DetalhesCurso />} />
         <Route path="player" element={<VideoPlayer />} />

          </Route>
  
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;






