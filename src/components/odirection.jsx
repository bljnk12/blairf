import React, { useState, useContext } from "react";
import AuthContext from "./AuthContext";

export default function ODirection({ direction }) {
  const { id, calle, ninterior, nexterior, colonia, ciudad, estado, cp } =
    direction;

  const { user } = useContext(AuthContext);

  const [editar, setEditar] = useState(false);

  const showEdit = () => {
    setEditar(!editar);
  };

  let updateDir = async () => {
    fetch(`http://localhost:8000/blairfoodsb/userdirection/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(UpDir),
    });
  };

  const [newCalle, setCalle] = useState(calle);
  const [newNinterior, setNinterior] = useState(ninterior);
  const [newNexterior, setNexterior] = useState(nexterior);
  const [newColonia, setColonia] = useState(colonia);
  const [newCiudad, setCiudad] = useState(ciudad);
  const [newEstado, setEstado] = useState(estado);
  const [newCp, setCp] = useState(cp);

  const UpDir = {
    calle: newCalle === undefined ? calle : newCalle,
    ninterior: newNinterior === undefined ? ninterior : newNinterior,
    nexterior: newNexterior === undefined ? nexterior : newNexterior,
    colonia: newColonia === undefined ? colonia : newColonia,
    ciudad: newCiudad === undefined ? ciudad : newCiudad,
    estado: newEstado === undefined ? estado : newEstado,
    cp: newCp === undefined ? cp : newCp,
  };

  let handleChangeCalle = (value) => {
    setCalle(value);
  };
  let handleChangeNinterior = (value) => {
    setNinterior(value);
  };
  let handleChangeNexterior = (value) => {
    setNexterior(value);
  };
  let handleChangeColonia = (value) => {
    setColonia(value);
  };
  let handleChangeCiudad = (value) => {
    setCiudad(value);
  };
  let handleChangeEstado = (value) => {
    setEstado(value);
  };
  let handleChangeCp = (value) => {
    setCp(value);
  };

  const handleSubmit = () => {
    updateDir();
    alert("Informacion actualizada!");
    showEdit();
  };

  return (
    <div className="direccion">
      <div className="one-direction">
        <div className="od-dir">
          {calle}, {ninterior}, {nexterior}, {colonia}, {ciudad}, {estado}, {cp}
        </div>
        <div className="update-button-cont">
          <button class="update-button" onClick={showEdit}>
            Editar <i class="fa-solid fa-pen"></i>
          </button>
        </div>
      </div>

      {editar && (
        <div className="datos-usuario-dir-cont">
          <div className="datos-usuario-dir">
            <div className="nueva-dir-title">Editar dirección</div>
            <div className="form-group-6">
              <div className="label">Calle</div>
              <input
                type="text"
                id="calle"
                defaultValue={calle}
                onChange={(e) => {
                  handleChangeCalle(e.target.value);
                }}
              />
            </div>
            <div className="form-group-7">
              <div className="label">N° Interior</div>
              <input
                type="text"
                id="ninterior"
                defaultValue={ninterior}
                onChange={(e) => {
                  handleChangeNinterior(e.target.value);
                }}
              />
            </div>
            <div className="form-group-8">
              <div className="label">N° Exterior</div>
              <input
                type="text"
                id="nexterior"
                defaultValue={nexterior}
                onChange={(e) => {
                  handleChangeNexterior(e.target.value);
                }}
              />
            </div>
            <div className="form-group-9">
              <div className="label">Colonia</div>
              <input
                type="text"
                id="colonia"
                defaultValue={colonia}
                onChange={(e) => {
                  handleChangeColonia(e.target.value);
                }}
              />
            </div>
            <div className="form-group-10">
              <div className="label">Ciudad</div>
              <input
                type="text"
                id="ciudad"
                defaultValue={ciudad}
                onChange={(e) => {
                  handleChangeCiudad(e.target.value);
                }}
              />
            </div>
            <div className="form-group-11">
              <div className="label">Estado</div>
              <input
                type="text"
                id="estado"
                defaultValue={estado}
                onChange={(e) => {
                  handleChangeEstado(e.target.value);
                }}
              />
            </div>
            <div className="form-group-12">
              <div className="label" for="rfc">
                Código postal
              </div>
              <input
                type="text"
                defaultValue={cp}
                onChange={(e) => {
                  handleChangeCp(e.target.value);
                }}
              />
            </div>
            <div className="update-button-cont-2">
              <button class="update-button2" onClick={handleSubmit}>
                Actualizar <i class="fa-solid fa-arrows-rotate"></i>
              </button>
              <button class="update-button2" onClick={showEdit}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
