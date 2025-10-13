import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "./media/fulllogo_transparent.png";
import LoginN from "./loginN";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";
import PersonalInfo from "./cuentaip";
import MisOrdenes from "./cuentao";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";

export default function Account() {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const cuentaBtn = () => {
    if (user === null) {
      setShowLogin(!showLogin);
    } else {
      navigate("/micuenta");
    }
  };

  const [showLogin, setShowLogin] = useState(false);

  function closeLogin() {
    setShowLogin(false);
  }

  const GET_USUARIO = gql`
    query GetUsuario($id: ID!) {
      usuario(id: $id) {
        id
        username
      }
    }
  `;

  const {
    loading: loadingU,
    error: errorU,
    data: dataU,
  } = useQuery(GET_USUARIO, {
    variables: {
      id: user?.user_id,
    },
  });

  const usuarioG = dataU?.usuario;

  // const showInfo = () => {
  //     console.log(clientes)
  // }

  const [tab, setTab] = useState("personal-info");

  const TabButton = ({ id, label }) => (
    <button
      onClick={() => setTab(id)}
      type="button"
      aria-selected={tab === id}
      role="tab"
      className="tabbutton"
    >
      {label}
    </button>
  );

  return (
    <div className="hero">
      <div className="hero-container">
        <div className="menu">
          <div className="logo-container">
            <div className="menu-ul">
              <img
                src={logo}
                alt="Logo de la empresa"
                width={220}
                class="logo"
              />
            </div>
          </div>
          <div className="home-container">
            <div className="menu-ul">
              <Link className="link-home" to="/">
                <i class="fas fa-home"></i>
                <p className="menu-cat">Inicio</p>
              </Link>
            </div>
          </div>
          <div className="menu-items-container">
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
              <div className="user-account-container">
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

        <div className="contenido-mc">
          <h2 className="cuenta-username">{usuarioG?.username}</h2>
          <div className="cuenta-options">
            <div className="aviso-priv-cont">
              <Link className="avisopriv-link" to="/avisoprivacidad">
                <p className="menu-cat">Aviso de privacidad</p>
                <i class="fa-solid fa-shield-halved"></i>
              </Link>
            </div>
            <div className="cuenta-options-div">
              <div
                style={{
                  borderBottom:
                    tab === "personal-info" ? "2px solid #FFA500" : "none",
                }}
              >
                <TabButton id="personal-info" label="Informacion personal" />
              </div>
              <div
                style={{
                  borderBottom:
                    tab === "mis-ordenes" ? "2px solid #FFA500" : "none",
                }}
              >
                <TabButton id="mis-ordenes" label="Mis órdenes" />
              </div>
            </div>
          </div>
          <div>
            {tab === "personal-info" && <PersonalInfo />}
            {tab === "mis-ordenes" && <MisOrdenes />}
          </div>
        </div>
      </div>
      {showLogin && <LoginN close={closeLogin} />}
    </div>
  );
}
