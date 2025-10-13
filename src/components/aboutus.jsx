import React, { useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "./media/fulllogo_transparent.png";
import LoginN from "./loginN";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function AboutUs() {
  const [showLogin, setShowLogin] = useState(false);

  function closeLogin() {
    setShowLogin(false);
  }

  const { user } = useContext(AuthContext);

  //   const [userL, setUserL] = useState()

  //   useEffect(() => {
  //     function getuser() {
  //         const usuario = localStorage.getItem('usuario');
  //         setUserL(usuario);
  //     }
  //      getuser()
  //   },[userL]);

  const showUser = () => {
    console.log(user);
  };

  const navigate = useNavigate();

  const cuentaBtn = () => {
    if (user === null) {
      showUser();
      setShowLogin(!showLogin);
    } else {
      navigate("/micuenta");
    }
  };

  const targetElement1 = useRef();
  const targetElement2 = useRef();

  function scroll1() {
    const elmnt = targetElement1;
    elmnt.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "start",
    });
  }

  function scroll2() {
    const elmnt = targetElement2;
    elmnt.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "start",
    });
  }

  return (
    <div className="hero">
      <div className="hero-container">
        <div className="menu">
          <div class="logo-container">
            <div className="menu-ul">
              <img
                src={logo}
                alt="Logo de la empresa"
                width={220}
                class="logo"
              />
            </div>
          </div>
          <div class="home-container">
            <div className="menu-ul">
              <Link className="link-home" to="/">
                <i class="fas fa-home"></i>
                <p className="menu-cat">Inicio</p>
              </Link>
            </div>
          </div>
          <div class="menu-items-container">
            <div className="menu-ul">
              <Link className="link-menu" to="/verduras">
                <i class="fas fa-carrot"></i>
                <p className="menu-cat">Verduras</p>
              </Link>
              <Link className="link-menu" to="/frutas">
                <i class="fas fa-apple-alt"></i>
                <p className="menu-cat">Frutas</p>
              </Link>
              <Link className="link-menu" to="/chilessecos">
                <i class="fas fa-pepper-hot"></i>
                <p className="menu-cat">Chiles secos</p>
              </Link>
              <Link className="link-menu" to="/frutossecosysemillas">
                <i class="fas fa-seedling"></i>
                <p className="menu-cat">Frutos secos y semillas</p>
              </Link>
              <Link className="link-menu" to="/especias">
                <i class="fa-solid fa-jar"></i>
                <p className="menu-cat">Especias</p>
              </Link>
              <Link className="link-menu" to="/cerealesyleguminosas">
                <i class="fa-solid fa-wheat-awn"></i>
                <p className="menu-cat">Cereales y Leguminosas</p>
              </Link>
              <Link className="link-menu" to="/hierbasaromaticas">
                <i class="fa-brands fa-pagelines"></i>
                <p className="menu-cat">Hierbas aromáticas</p>
              </Link>
              {/* <Link className="link-menu" to="/pulpas"><i class="fa-regular fa-lemon"></i><p className="menu-cat">Pulpas</p></Link> */}
              <Link className="link-menu" to="/brotesygerminados">
                <i class="fa-solid fa-plant-wilt"></i>
                <p className="menu-cat">Brotes y germinados</p>
              </Link>
              <Link className="link-menu" to="/botanas">
                <i class="fa-solid fa-bowl-food"></i>
                <p className="menu-cat">Botanas</p>
              </Link>
              <div class="user-account-container">
                <button
                  class="profile-button"
                  id="miCuentaButton"
                  onClick={cuentaBtn}
                >
                  Mi cuenta<i class="fa-solid fa-circle-user"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="contenido">
          <div className="about-us-mc">
            <div className="about-us-c1" ref={targetElement1}>
              <div className="about-us-l1"></div>
              <div className="about-us-r1">
                <div className="au-d11">
                  <p>
                    Blairfoods nace con la idea de llevar lo mejor de nuestro
                    campo a cada hogar, siempre priorizando a nuestros clientes
                    y valorando a nuestra gente: los productores que, con
                    esfuerzo y dedicación trabajan incansablemente para ofrecer
                    lo mejor de su tierra.
                    <br />
                    <br />
                    Somos una empresa orgullosamente mexicana, motivada por la
                    innovación y un profundo respeto por quienes colaboran por y
                    para nosotros, buscando siempre construir relaciones
                    auténticas y productos que marquen la diferencia.
                  </p>
                </div>
                <div className="au-d12">
                  <button class="about-us-button" onClick={scroll2}>
                    Seguir leyendo<i class="fa-solid fa-book-open"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="about-us-c2" ref={targetElement2}>
              <div className="about-us-l2">
                <div className="au-d21">
                  <p>
                    En Blairfoods creemos en hacer las cosas de manera
                    diferente. La perfección es un viaje, no un destino, y como
                    todo viaje memorable, es algo que disfrutamos ampliamente.
                    Nos enfocamos en la eficiencia y la calidad, viviendo
                    experiencias, conociendo a nuestros clientes, escuchando las
                    historias de nuestros proveedores y tomando de cada uno
                    siempre lo mejor para transformarlo en aprendizaje.
                    <br />
                    <br />
                    Este enfoque nos impulsa a mejorar continuamente, asegurando
                    que el esfuerzo y la dedicación que ponemos se refleje en
                    productos y servicios que superen tus expectativas y se
                    disfruten en cada detalle.
                  </p>
                </div>
                <div className="au-d22">
                  <button class="about-us-button" onClick={scroll1}>
                    Volver arriba<i class="fa-solid fa-arrow-up"></i>
                  </button>
                </div>
              </div>
              <div className="about-us-r2"></div>
            </div>
          </div>
        </div>
      </div>
      {showLogin && <LoginN close={closeLogin} />}
    </div>
  );
}
