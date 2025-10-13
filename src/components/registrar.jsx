import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./media/fulllogo_transparent.png";
import LoginN from "./loginN";
import AuthContext from "./AuthContext";

export default function Register() {
  const { user } = useContext(AuthContext);

  const [showLogin, setShowLogin] = useState(false);

  function closeLogin() {
    setShowLogin(false);
  }

  const [nombre, setNombre] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const customUser = {
    username: nombre,
    email: email,
    password: password,
  };

  const submitCustomUser = () => {
    fetch("http://localhost:8000/blairfoodsb/user/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customUser),
    });
    alert("Usuario registrado!");
  };

  const submit = () => {
    submitCustomUser();
  };

  const showUser = () => {
    console.log(user);
  };

  const navigate = useNavigate();

  const cuentaBtn = () => {
    if (user === null) {
      setShowLogin(!showLogin);
    } else {
      navigate("/micuenta");
    }
  };

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
          <div className="contenido-container-register">
            <form onSubmit={submit} id="registerForm">
              <h2 className="rf-1">Registrarme</h2>

              <label>Nombre</label>
              <input
                type="text"
                onChange={(e) => {
                  setNombre(e.target.value);
                }}
              />

              <label>Correo Electrónico</label>
              <input
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />

              <label for="registerPassword">Contraseña</label>
              <input
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <div className="rb-container">
                <input type="submit" id="registerButton" value="Registrarme" />
              </div>
            </form>
          </div>
        </div>
      </div>
      {showLogin && <LoginN close={closeLogin} />}
    </div>
  );
}
