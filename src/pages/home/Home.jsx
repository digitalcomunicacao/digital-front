import { useRef } from "react";
import { Cursos } from "../../components/cursos/Cursos";
import ResponsiveAppBar from "../../components/customAppBar/ResponsiveAppBar";
import Header from "../../components/header/Header";

export const Home = () => {
  const sectionsRef = {
    Início: useRef(null),
    Cursos: useRef(null),
    Sobre: useRef(null), // adicione mais conforme precisar
  };

  const scrollToSection = (sectionName) => {
    const section = sectionsRef[sectionName];
    if (section && section.current) {
      section.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <ResponsiveAppBar onMenuClick={scrollToSection} />
      <div ref={sectionsRef["Início"]}>
        <Header />
      </div>
      <div ref={sectionsRef["Cursos"]}>
        <Cursos />
      </div>
      <div ref={sectionsRef["Sobre"]}>
        <div style={{ height: 400, background: "#eee" }}>
          <h2>Sobre nós</h2>
        </div>
      </div>
    </>
  );
};
