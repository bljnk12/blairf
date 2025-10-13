import React, { useContext } from "react";
import AuthContext from "./AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function LoginN({ close }) {
  const { loginUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const login = (e) => {
    loginUser(e).then(close).then(navigate("/"));
  };

  function seePass() {
    const x = document.getElementById("password");
    const e = document.getElementById("eye");
    if (x.type === "password") {
      x.type = "text";
      e.style.color = "skyblue";
    } else {
      x.type = "password";
      e.style.color = "#ccc";
    }
  }

  return (
    <div id="loginRegisterModal" class="modal">
      <div class="modal-content">
        <div className="close-login" onClick={close}>
          <i class="fa-duotone fa-solid fa-circle-xmark"></i>
        </div>
        <form id="loginForm" onSubmit={login}>
          <h2>Identificarme</h2>
          <label for="username">Usuario</label>
          <input type="text" id="username" name="username" />
          <label for="password">Contraseña</label>
          <div class="password-container">
            <input type="password" id="password" name="password" />
            <span class="toggle-password">
              <i class="fas fa-eye" id="eye" onClick={seePass}></i>
            </span>
          </div>
          <input type="submit" id="loginButton" value="Iniciar sesión" />
          <div id="showRegisterForm">
            <p>
              No tengo cuenta, quiero{" "}
              <Link className="registrarme" to="/registrarme">
                {" "}
                registrarme
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
