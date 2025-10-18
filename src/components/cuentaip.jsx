import React, { useState, useContext, useEffect } from "react";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";
import ODirection from "./odirection";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";

export default function PersonalInfo() {
  const { user, logoutUser } = useContext(AuthContext);

  const usuarioId = parseInt(user?.user_id);

  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  const GET_USUARIO = gql`
    query GetUsuario($id: ID!) {
      usuario(id: $id) {
        id
        username
        email
      }
    }
  `;

  const {
    loading: loadingU,
    error: errorU,
    data: dataU,
  } = useQuery(GET_USUARIO, {
    variables: {
      id: usuarioId,
    },
  });

  const usuario = dataU?.usuario;

  const GET_INFORMACION = gql`
    query GetInformacion($cliente: ID!) {
      informacion(cliente: $cliente) {
        id
        telefono
        rfc
      }
    }
  `;

  const {
    loading: loadingI,
    error: errorI,
    data: dataI,
  } = useQuery(GET_INFORMACION, {
    variables: {
      cliente: usuarioId,
    },
  });

  const info = dataI?.informacion[0];

  const [telefono, setTelefono] = useState(null);
  const [rfc, setRfc] = useState("");

  useEffect(() => {
    if (info) {
      setTelefono(info.telefono || null);
      setRfc(info.rfc || "");
    }
  }, [info]);

  const CREATE_INFORMACION = gql`
    mutation createInformacion($cliente: ID!, $telefono: Int, $rfc: String) {
      createInformacion(cliente: $cliente, telefono: $telefono, rfc: $rfc) {
        informacion {
          telefono
          rfc
        }
      }
    }
  `;

  const [
    createInformacion,
    { data: dataNewInfo, loading: loadingNewInfo, error: errorNewInfo },
  ] = useMutation(CREATE_INFORMACION, {
    refetchQueries: [
      {
        query: GET_INFORMACION,
        variables: { cliente: usuario },
      },
      "GetInformacion",
    ],
  });

  const handleSubmitCreateInfo = async () => {
    const tel = parseInt(telefono);
    try {
      const result = await createInformacion({
        variables: {
          cliente: usuarioId,
          telefono: tel,
          rfc: rfc,
        },
      });
    } catch (e) {
      //console.error(e);
    }
  };

  const UPDATE_INFORMACION = gql`
    mutation updateInformacion($id: ID!, $telefono: Int, $rfc: String) {
      updateInformacion(id: $id, telefono: $telefono, rfc: $rfc) {
        informacion {
          id
          telefono
          rfc
        }
      }
    }
  `;

  const [
    updateInformacion,
    { data: dataInfo, loading: loadingInfo, error: errorInfo },
  ] = useMutation(UPDATE_INFORMACION, {
    refetchQueries: [
      {
        query: GET_INFORMACION,
        variables: { cliente: usuario },
      },
      "GetInformacion",
    ],
  });

  const handleSubmitUpdateInfo = async () => {
    const id = parseInt(info?.id);
    const tel = parseInt(telefono);
    try {
      const result = await updateInformacion({
        variables: {
          id: id,
          telefono: tel,
          rfc: rfc,
        },
      });
    } catch (e) {
      //console.error(e);
    }
  };

  const handleSubmit = () => {
    if (user) {
      if (info) {
        handleSubmitUpdateInfo();
      } else {
        handleSubmitCreateInfo();
      }
    } else {
      alert("Inicia sesión por favor!");
    }
  };

  const GET_DIRECCION = gql`
    query GetDirecciones($cliente: ID!) {
      direccion(cliente: $cliente) {
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
  } = useQuery(GET_DIRECCION, {
    variables: {
      cliente: usuarioId,
    },
  });

  const direcciones = dataD?.direccion;

  const [newCalle, setCalle] = useState("");
  const [newNinterior, setNinterior] = useState("");
  const [newNexterior, setNexterior] = useState("");
  const [newColonia, setColonia] = useState("");
  const [newCiudad, setCiudad] = useState("");
  const [newEstado, setEstado] = useState("");
  const [newCp, setCp] = useState(null);
  const [factura, setFactura] = useState(false);

  const [showDirF, setShowDirF] = useState(false);

  const showNewDirF = () => {
    setShowDirF(!showDirF);
  };

  const CREATE_DIRECCION = gql`
    mutation createDireccion(
      $cliente: ID!
      $calle: String
      $ninterior: String
      $nexterior: String
      $colonia: String
      $ciudad: String
      $estado: String
      $cp: Int
      $facturacion: Boolean
    ) {
      createDireccion(
        cliente: $cliente
        calle: $calle
        ninterior: $ninterior
        nexterior: $nexterior
        colonia: $colonia
        ciudad: $ciudad
        estado: $estado
        cp: $cp
        facturacion: $facturacion
      ) {
        direccion {
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
    }
  `;

  const [
    createDireccion,
    { data: dataNewDir, loading: loadingNewDir, error: errorNewDir },
  ] = useMutation(
    CREATE_DIRECCION,
    {
      refetchQueries: [
        {
          query: GET_DIRECCION,
          variables: { cliente: usuarioId },
        },
        "GetDirecciones",
      ],
    },
    {
      update(
        cache,
        {
          data: {
            createDireccion: { direccion: nuevaDireccion },
          },
        }
      ) {
        const existingDirecciones = cache.readQuery({
          query: GET_DIRECCION,
          variables: { cliente: usuario },
        });

        if (existingDirecciones && nuevaDireccion) {
          cache.writeQuery({
            query: GET_DIRECCION,
            variables: { cliente: usuario },
            data: {
              direccion: [...existingDirecciones.direccion, nuevaDireccion],
            },
          });
        }
      },
    }
  );

  const handleSubmitCreateDir = async () => {
    if (user) {
      try {
        const result = await createDireccion({
          variables: {
            cliente: usuarioId,
            calle: newCalle,
            ninterior: newNinterior,
            nexterior: newNexterior,
            colonia: newColonia,
            ciudad: newCiudad,
            estado: newEstado,
            cp: parseInt(newCp),
            facturacion: false,
          },
        });
      } catch (e) {
        // The 400 Bad Request error will be caught here!
        //console.error(e);
      }
      showNewDirF();
    } else {
      alert("Inicia sesión por favor!");
    }
  };

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

  const showData = () => {
    console.log(info);
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
                <div id="nombre">{usuario?.username}</div>
              </div>
              <div className="form-group-2">
                <div className="label" for="telefono">
                  Teléfono
                </div>
                <input
                  type="number"
                  value={telefono}
                  onChange={(e) => {
                    setTelefono(e.target.value);
                  }}
                />
              </div>
              <div className="form-group-3">
                <div className="label" for="email">
                  Correo
                </div>
                <div id="email">{usuario?.email}</div>
              </div>
              <div className="form-group-4">
                <div className="label" for="rfc">
                  RFC
                </div>
                <input
                  type="text"
                  value={rfc}
                  onChange={(e) => {
                    setRfc(e.target.value);
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
              <button class="update-button2" onClick={handleSubmitCreateDir}>
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
