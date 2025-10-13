import React, { useState, useContext, useEffect } from "react";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";
import ODirection from "./odirection";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";

export default function PersonalInfo() {
  const { user, logoutUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

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

  const GET_INFORMACION = gql`
    query GetInformacion($cliente: ID!) {
      informacion(cliente: $cliente) {
        rfc
        telefono
      }
    }
  `;

  const {
    loading: loadingI,
    error: errorI,
    data: dataI,
  } = useQuery(GET_INFORMACION, {
    variables: {
      cliente: user?.user_id,
    },
  });

  const info = dataI?.informacion[0];

  //------------------------------------

  //------------------------------------

  let updateInfo = async () => {
    fetch(`http://localhost:8000/blairfoodsb/userinfo/${info?.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(UpInfo),
    });
  };

  let newInfo = async () => {
    fetch("http://localhost:8000/blairfoodsb/userinfo/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(NewInfo),
    });
  };

  const [telefono, setTelefono] = useState(
    info?.telefono ? "" : info?.telefono
  );
  const [rfc, setRfc] = useState(info?.rfc ? "" : info?.rfc);

  const UpInfo = {
    telefono: telefono === undefined ? info?.telefono : telefono,
    rfc: rfc === undefined ? info?.rfc : rfc,
  };

  const NewInfo = {
    cliente: user?.user_id,
    telefono: telefono === undefined ? "" : telefono,
    rfc: rfc === undefined ? "" : rfc,
  };

  let handleChangeTelefono = (value) => {
    setTelefono(value);
  };

  let handleChangeRfc = (value) => {
    setRfc(value);
  };

  const handleSubmit = () => {
    if (info === undefined) {
      newInfo();
      navigate("/");
    }
    if (info !== undefined) {
      updateInfo();
    }
    alert("Informacion actualizada!");
  };

  const [newCalle, setCalle] = useState();
  const [newNinterior, setNinterior] = useState();
  const [newNexterior, setNexterior] = useState();
  const [newColonia, setColonia] = useState();
  const [newCiudad, setCiudad] = useState();
  const [newEstado, setEstado] = useState();
  const [newCp, setCp] = useState();

  const [showDirF, setShowDirF] = useState(false);

  const showNewDirF = () => {
    setShowDirF(!showDirF);
  };

  const NewDirection = {
    cliente: user?.user_id,
    calle: newCalle === undefined ? "" : newCalle,
    ninterior: newNinterior === undefined ? "" : newNinterior,
    nexterior: newNexterior === undefined ? "" : newNexterior,
    colonia: newColonia === undefined ? "" : newColonia,
    ciudad: newCiudad === undefined ? "" : newCiudad,
    estado: newEstado === undefined ? "" : newEstado,
    cp: newCp === undefined ? "" : newCp,
  };

  let newDir = async () => {
    fetch("http://localhost:8000/blairfoodsb/userdirection/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(NewDirection),
    });
    showNewDirF();
  };

  //-----------------------------------------
  const GET_DIRECCIONES = gql`
    query {
      direcciones {
        id
        calle
        ninterior
        nexterior
        colonia
        ciudad
        estado
        cp
        facturacion
      }
    }
  `;

  const {
    loading: loadingD,
    error: errorD,
    data: dataD,
  } = useQuery(GET_DIRECCIONES);

  const direcciones = dataD?.direcciones;

  //-----------------------------------------

  let deleteInfo = async () => {
    fetch(`http://localhost:8000/blairfoodsb/userinfo/${info?.id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  let deleteUser = async () => {
    fetch(`http://localhost:8000/blairfoodsb/useru/${user?.user_id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const deleteCuenta = () => {
    goHome();
    logoutUser();
    deleteInfo();
    deleteUser();
    alert("Su cuenta fue eliminada!");
  };

  const [showDelAd, setShowDelAd] = useState(false);

  const openDeleteAdvice = () => {
    setShowDelAd(true);
  };

  const closeDeleteAdvice = () => {
    setShowDelAd(false);
  };

  return (
    <div>
      <div className="userinfo-data">
        <div className="usuario">
          <div className="datos">
            <div className="datos-usuario">
              <div className="form-group-1">
                <div className="label" for="nombre">
                  Nombre
                </div>
                <div id="nombre">{usuarioG.username}</div>
              </div>
              <div className="form-group-2">
                <div className="label" for="telefono">
                  Teléfono
                </div>
                <input
                  type="text"
                  defaultValue={info?.telefono}
                  onChange={(e) => {
                    handleChangeTelefono(e.target.value);
                  }}
                />
              </div>
              <div className="form-group-3">
                <div className="label" for="email">
                  Correo
                </div>
                <div id="email">{usuarioG?.email}</div>
              </div>
              <div className="form-group-4">
                <div className="label" for="rfc">
                  RFC
                </div>
                <input
                  type="text"
                  defaultValue={info?.rfc}
                  onChange={(e) => {
                    handleChangeRfc(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="update-button-cont-1">
              <button class="update-button" onClick={handleSubmit}>
                Guardar <i class="fa-solid fa-floppy-disk"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mis-direcciones">
        <div className="mis-direcciones-title" onClick={showData}>
          <h5>Mis direcciones</h5>
        </div>
        <div className="direcciones-cont">
          {direcciones?.map((direction) => {
            return <ODirection direction={direction} key={direction.id} />;
          })}
        </div>
      </div>
      <div>
        <div className="adddir-button-cont">
          <button onClick={showNewDirF}>
            <i class="fa-solid fa-plus"></i> Agregar dirección
          </button>
        </div>
      </div>
      <div className="delete-button-cont">
        <button onClick={openDeleteAdvice} className="delete-button">
          Borrar cuenta<i class="fa-solid fa-user-minus"></i>
        </button>
      </div>
      {showDirF && (
        <div className="datos-usuario-dir-cont">
          <div className="datos-usuario-dir">
            <div className="nueva-dir-title">Nueva dirección</div>
            <div className="form-group-6">
              <div className="label">Calle</div>
              <input
                type="text"
                id="calle"
                onChange={(e) => {
                  setCalle(e.target.value);
                }}
              />
            </div>
            <div className="form-group-7">
              <div className="label">N° Interior</div>
              <input
                type="text"
                id="ninterior"
                onChange={(e) => {
                  setNinterior(e.target.value);
                }}
              />
            </div>
            <div className="form-group-8">
              <div className="label">N° Exterior</div>
              <input
                type="text"
                id="nexterior"
                onChange={(e) => {
                  setNexterior(e.target.value);
                }}
              />
            </div>
            <div className="form-group-9">
              <div className="label">Colonia</div>
              <input
                type="text"
                id="colonia"
                onChange={(e) => {
                  setColonia(e.target.value);
                }}
              />
            </div>
            <div className="form-group-10">
              <div className="label">Ciudad</div>
              <input
                type="text"
                id="ciudad"
                onChange={(e) => {
                  setCiudad(e.target.value);
                }}
              />
            </div>
            <div className="form-group-11">
              <div className="label">Estado</div>
              <input
                type="text"
                id="estado"
                onChange={(e) => {
                  setEstado(e.target.value);
                }}
              />
            </div>
            <div className="form-group-12">
              <div className="label" for="rfc">
                Código postal
              </div>
              <input
                type="text"
                onChange={(e) => {
                  setCp(e.target.value);
                }}
              />
            </div>
            <div className="update-button-cont-2">
              <button class="update-button2" onClick={newDir}>
                Guardar
              </button>
              <button class="update-button2" onClick={showNewDirF}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      {showDelAd && (
        <div className="advice-cont">
          <div className="advice-delete-msn">
            <p>Estas seguro que quieres eliminar tu cuenta?</p>
            <button className="delete-confirm" onClick={deleteCuenta}>
              Si
            </button>
            <button className="delete-cancel" onClick={closeDeleteAdvice}>
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
