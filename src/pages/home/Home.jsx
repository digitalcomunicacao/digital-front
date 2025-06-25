import { Cursos } from "../../components/cursos/Cursos"
import ResponsiveAppBar from "../../components/customAppBar/ResponsiveAppBar"
import Header from "../../components/header/Header"

export const Home=()=>{
    return(
     <>
    <ResponsiveAppBar/>
    <Header/>
    <Cursos/>
     </>
    )
}