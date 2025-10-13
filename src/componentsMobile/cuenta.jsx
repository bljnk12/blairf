import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../components/AuthContext";
import PersonalInfo from "../components/cuentaip";
import MisOrdenes from "./cuentao";

export default function Account() {
  const { user } = useContext(AuthContext);

  const [clientes, setClientes] = useState([]);
  const [usuario, setUsuario] = useState();

  useEffect(() => {
    getClientes();
  }, []);

  let getClientes = async () => {
    let response = await fetch(
      "http://localhost:8000/blairfoodsb/user/create/"
    );
    let data = await response.json();
    setClientes(data);
    // console.log(data)
  };

  useEffect(() => {
    const usuario = clientes.find((usr) => usr.id === user?.user_id);
    setUsuario(usuario);
  }, [clientes]);

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
    <div>
      <div className="contenido-mc">
        <h2 className="cuenta-username">{usuario?.username}</h2>
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
  );
}
