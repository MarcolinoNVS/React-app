import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/home";
import Contact from "./pages/contact";
import Projects from "./pages/Projects";
import React, { useState, useEffect } from "react"; // Importe useState para manipulação de estado
import "./App.css";
import "./index.css";
import backgroundImage from "./assets/fundoback.jpg"; // Importe a imagem
import backgroundImageMobile from "./assets/fundoback.jpg"; // Imagem para mobile

const App = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Detecta se o dispositivo é mobile
  useEffect(() => {
    const checkIfMobile = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Função para manipular o movimento do mouse
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    setCursorPosition({ x: clientX, y: clientY });
  };

  // Função para manipular o movimento do toque
  const handleTouchMove = (e) => {
    const { clientX, clientY } = e.touches[0]; // Captura o primeiro toque
    setTouchPosition({ x: clientX, y: clientY });
  };

  // Calcular a porcentagem da posição do mouse ou toque em relação à tela
  const { x, y } = isMobile ? touchPosition : cursorPosition;
  const xPos = (x / window.innerWidth) * 100;
  const yPos = (y / window.innerHeight) * 100;

  return (
    <Router>
      <div
        className="app"
        style={{
          backgroundImage: `url(${
            isMobile ? backgroundImageMobile : backgroundImage
          })`,
          backgroundSize: "cover",
          backgroundPosition: `${xPos}% ${yPos}%`, // Movimenta o fundo com base no mouse ou toque
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          color: "#fff",
          transition: "background-position 0.1s ease-out",
        }}
        onMouseMove={isMobile ? null : handleMouseMove} // Evento de mouse para desktop
        onTouchMove={isMobile ? handleTouchMove : null} // Evento de toque para mobile
      >
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
