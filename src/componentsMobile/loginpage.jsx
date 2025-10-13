import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../components/AuthContext";
import logo from "./media/fulllogo_transparent.png";

export default function LoginPage() {
  const { loginUser } = useContext(AuthContext);

  const [nombre, setNombre] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const customUser = {
    username: nombre,
    email: email,
    password: password,
  };

  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  const login = (e) => {
    loginUser(e, nombre, password);
    goHome();
  };

  const [showRegister, setShowRegister] = useState(false);

  const showForm = () => {
    setShowRegister(!showRegister);
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

  return (
    <div className="login-form-mobile ">
      <div className="login-forms">
        {/* <p mt={50} fontSize={18} fontWeight='500'>Bienvenido a Blairfoods!</p> */}
        <img className="login-logo" src={logo} width={200} alt="" />
        <div className="login-form">
          <form id="loginForm" onSubmit={login}>
            <div>
              <p>Usuario</p>
              <input type="text" id="username" name="username" />
            </div>
            <div>
              <p>Contraseña</p>
              <input type="password" id="password" name="password" />
            </div>
            <div className="login-btn">
              <input
                className="login-submit"
                type="submit"
                value="Iniciar sesión"
              />
              {/* <button className='login-submit' onClick={login}>
                        <i class="fa-solid fa-right-to-bracket"></i>
                    </button> */}
            </div>
          </form>
        </div>
        <div>
          <div className="register-btn">
            <button className="show-register" onClick={showForm}>
              No tengo cuenta, quiero registrarme
            </button>
          </div>
        </div>
        {showRegister && (
          <div className="register-form">
            <form onSubmit={submit} id="registerFormM">
              <div>
                <p>Usuario</p>
                <input
                  onChange={(e) => {
                    setNombre(e.target.value);
                  }}
                />
              </div>
              <div>
                <p>Email</p>
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div>
                <p>Contraseña</p>
                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="register-btn">
                <input
                  className="register-submit"
                  type="submit"
                  id="registerButtonM"
                  value="Registrarme"
                />
                {/* <button className='register-submit' onClick={submitCustomUser}>
                            <i class="fa-solid fa-address-card"></i>
                        </button> */}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

// const styles = StyleSheet.create({
//     container: {
//         alignItems: 'center',
//         backgroundColor: '#f7fafc',
//         width: '100%',
//         height: '100%'
//     },
//     input: {
//         width: '50%',
//         height: 40,
//         margin: 12,
//         borderWidth: 1,
//         padding: 10,
//         borderRadius: 10
//     },
//   });
//Movil1133
