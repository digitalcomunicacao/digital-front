
import { BrowserRouter, Route,Routes } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import { DetalhesCurso } from "./components/cursos/DetalhesCurso";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import { PainelUsuario } from "./pages/painelUsuario/PainelUsuario";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { CursosUsuario } from "./pages/painelUsuario/CursosUsuario";



function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
    <Routes>
      <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route
          path="/painel-usuario"
          element={
            <PrivateRoute>
              <PainelUsuario />
            </PrivateRoute>
          }
        >
              <Route path="meus-cursos" element={<CursosUsuario />} />
        </Route>

   <Route path="/curso/detalhe" element={<DetalhesCurso />} />

    </Routes>
    </BrowserRouter>
  );
}

export default App;
